import { and, eq } from "drizzle-orm";

import { db, makeDbResponse } from "../db.js";
import {
  DbResponse,
  DbResult,
  JobPost,
  None,
  Transaction,
} from "../../helpers/types.js";
import { jobPostsTable, jobPostTagsTable } from "../schema/job_posts.js";
import { isNone } from "../../helpers/utils.js";
import { tagsQuery } from "../queries.js";

export async function insertJobPost(
  jobPost: JobPost
): Promise<DbResponse<DbResult>> {
  try {
    const { tags } = jobPost;

    delete jobPost.tags;

    const result = await db.transaction(async (tx: Transaction) => {
      const newInfo = await tx.insert(jobPostsTable).values(jobPost).returning({
        id: jobPostsTable.id,
        createdAt: jobPostsTable.createdAt,
        updatedAt: jobPostsTable.updatedAt,
      });

      if (newInfo[0] === undefined)
        throw "Something went wrong while inserting a new job post";

      await insertTags(tx, newInfo[0].id, tags);

      return newInfo[0];
    });

    return makeDbResponse(result, null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function getJobPost(
  filters: Partial<JobPost>
): Promise<DbResponse<JobPost | None>> {
  const equalities = [];
  let conditions;

  // Handling all of the filters
  if (!isNone(filters.slug)) {
    equalities.push(eq(jobPostsTable.slug, filters.slug));
  }

  if (!isNone(filters.clientId)) {
    equalities.push(eq(jobPostsTable.clientId, filters.clientId));
  }

  // Applying filters on conditions
  for (const equality of equalities) {
    conditions = isNone(conditions) ? equality : and(conditions, equality);
  }

  try {
    const result = await db
      .select({
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
        tags: tagsQuery,

        createdAt: jobPostsTable.createdAt,
        updatedAt: jobPostsTable.updatedAt,
      })
      .from(jobPostsTable)
      .where(conditions);
    return makeDbResponse<JobPost | None>(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

async function insertTags(
  tx: Transaction,
  id: number,
  tags: string[] | None
): Promise<void> {
  if (isNone(tags)) {
    return;
  }

  const jobPostTags = [];
  for (const tag of tags) {
    jobPostTags.push({ jobPostId: id, tag: tag });
  }

  await tx.delete(jobPostTagsTable).where(eq(jobPostTagsTable.jobPostId, id));

  if (jobPostTags.length === 0) {
    return;
  }

  await tx.insert(jobPostTagsTable).values(jobPostTags);
}
