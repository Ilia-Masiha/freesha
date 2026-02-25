import {
  and,
  arrayContains,
  asc,
  desc,
  eq,
  gte,
  ilike,
  lte,
  or,
  SQL,
} from "drizzle-orm";

import { db, makeDbResponse } from "../db.js";
import { DbResponse, DbResult, JobPost, None } from "../../helpers/types.js";
import { jobPostsTable } from "../schema/job_posts.js";
import { isNone } from "../../helpers/utils.js";

const jobPostSelectFields = {
  title: jobPostsTable.title,
  slug: jobPostsTable.slug,
  description: jobPostsTable.description,
  budgetLow: jobPostsTable.budgetLow,
  budgetHigh: jobPostsTable.budgetHigh,
  deadline: jobPostsTable.deadline,

  clientId: jobPostsTable.clientId,
  statusId: jobPostsTable.statusId,
  categoryId: jobPostsTable.categoryId,

  requiredSkills: jobPostsTable.requiredSkills,
  tags: jobPostsTable.tags,

  createdAt: jobPostsTable.createdAt,
  updatedAt: jobPostsTable.updatedAt,
};

export async function insertJobPost(
  jobPost: JobPost
): Promise<DbResponse<DbResult>> {
  try {
    const result = await db.insert(jobPostsTable).values(jobPost).returning({
      createdAt: jobPostsTable.createdAt,
      updatedAt: jobPostsTable.updatedAt,
    });

    return makeDbResponse(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function getJobPosts(
  filters: Record<string, any>,
  limit: number,
  page: number
): Promise<DbResponse<JobPost[] | None>> {
  const equalities = [];
  const offset = (page - 1) * limit;
  let orderBy: SQL = asc(jobPostsTable.createdAt);
  let conditions;

  // Handling all of the filters
  if (!isNone(filters.clientId)) {
    equalities.push(eq(jobPostsTable.clientId, filters.clientId));
  }

  if (!isNone(filters.categoryId)) {
    equalities.push(eq(jobPostsTable.categoryId, filters.categoryId));
  }

  if (!isNone(filters.budgetLow)) {
    equalities.push(gte(jobPostsTable.budgetLow, filters.budgetLow));
  }

  if (!isNone(filters.budgetHigh)) {
    equalities.push(lte(jobPostsTable.budgetHigh, filters.budgetHigh));
  }

  if (!isNone(filters.search) && typeof filters.search === "string") {
    equalities.push(
      or(
        ilike(jobPostsTable.title, `%${filters.search}%`),
        ilike(jobPostsTable.description, `%${filters.search}%`),
        arrayContains(jobPostsTable.tags, [filters.search.toLowerCase()])
      )
    );
  }

  if (filters.orderBy === "earliest") {
    orderBy = desc(jobPostsTable.createdAt);
  }

  // Applying filters on conditions
  for (const equality of equalities) {
    conditions = isNone(conditions) ? equality : and(conditions, equality);
  }

  try {
    const result = await db
      .select(jobPostSelectFields)
      .from(jobPostsTable)
      .where(conditions)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);
    return makeDbResponse<JobPost[] | None>(result, null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function getJobPost(
  slug: string
): Promise<DbResponse<JobPost | None>> {
  try {
    const result = await db
      .select(jobPostSelectFields)
      .from(jobPostsTable)
      .where(eq(jobPostsTable.slug, slug));

    return makeDbResponse<JobPost | None>(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}
