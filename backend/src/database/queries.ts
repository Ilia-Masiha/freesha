import { sql } from "drizzle-orm";

import {
  userEducationDegreesTable,
  userLanguagesTable,
  userPortfoliosTable,
  usersTable,
  userWorkExperiencesTable,
} from "./schema/users.js";
import {
  EducationDegree,
  Portfolio,
  WorkExperience,
} from "../helpers/types.js";
import { jobPostsTable, jobPostTagsTable } from "./schema/job_posts.js";

export const languageNamesQuery = sql<string[]>`(
      SELECT COALESCE(ARRAY_AGG(DISTINCT ${userLanguagesTable.languageName}), '{}')
      FROM ${userLanguagesTable}
      WHERE ${userLanguagesTable.userId} = ${usersTable.id}
    )`;

export const educationDegreesQuery = sql<Omit<EducationDegree, "userId">[]>`(
      SELECT COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'title', "title", 
            'startDate', "start_date",
            'endDate', "end_date"
          )
        ),
        '[]'::json
      )
      FROM ${userEducationDegreesTable}
      WHERE ${userEducationDegreesTable.userId} = ${usersTable.id}
    )`;

export const workExperiencesQuery = sql<Omit<WorkExperience, "userId">[]>`(
      SELECT COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'jobTitle', "job_title",
            'company', "company",
            'description', "description",
            'startDate', "start_date",
            'endDate', "end_date"
          )
        ),
        '[]'::json
      )
      FROM ${userWorkExperiencesTable}
      WHERE ${userWorkExperiencesTable.userId} = ${usersTable.id}
    )`;

export const portfoliosQuery = sql<Omit<Portfolio, "userId">[]>`(
      SELECT COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'title', "title",
            'projectUrl', "project_url",
            'skills', "skills",
            'description', "description"
          )
        ),
        '[]'::json
      )
      FROM ${userPortfoliosTable}
      WHERE ${userPortfoliosTable.userId} = ${usersTable.id}
    )`;

export const tagsQuery = sql<string[]>`(
      SELECT COALESCE(ARRAY_AGG(DISTINCT ${jobPostTagsTable.tag}), '{}')
      FROM ${jobPostTagsTable}
      WHERE ${jobPostTagsTable.jobPostId} = ${jobPostsTable.id}
    )`;
