import { sql } from "drizzle-orm";

import {
  userEducationDegreesTable,
  userLanguagesTable,
  userPortfoliosTable,
  userSkillsTable,
  userSocialLinksTable,
  usersTable,
  userWorkExperiencesTable,
} from "./schema.js";
import {
  EducationDegree,
  Portfolio,
  WorkExperience,
} from "../helpers/types.js";

export const skillsQuery = sql<string[]>`(
      SELECT COALESCE(ARRAY_AGG(DISTINCT ${userSkillsTable.skill}), '{}')
      FROM ${userSkillsTable}
      WHERE ${userSkillsTable.userId} = ${usersTable.id}
    )`;

export const languageNamesQuery = sql<string[]>`(
      SELECT COALESCE(ARRAY_AGG(DISTINCT ${userLanguagesTable.languageName}), '{}')
      FROM ${userLanguagesTable}
      WHERE ${userLanguagesTable.userId} = ${usersTable.id}
    )`;

export const socialLinksQuery = sql<string[]>`(
      SELECT COALESCE(ARRAY_AGG(DISTINCT ${userSocialLinksTable.link}), '{}')
      FROM ${userSocialLinksTable}
      WHERE ${userSocialLinksTable.userId} = ${usersTable.id}
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
            'description', "description",
            'createdAt', "created_at",
          )
        ),
        '[]'::json
      )
      FROM ${userPortfoliosTable}
      WHERE ${userPortfoliosTable.userId} = ${usersTable.id}
    )`;
