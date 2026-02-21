import {
  date,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { JobPostStatus } from "../../helpers/types.js";
import { JobPostStatusIds } from "../../helpers/consts.js";
import { usersTable } from "./users.js";
import { sql } from "drizzle-orm";

export const jobPostsTable = pgTable("job_posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 60 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: varchar("description", { length: 5000 }).notNull(),
  budgetLow: integer("budget_low").notNull(),
  budgetHigh: integer("budget_high").notNull(),
  deadline: date("deadline").notNull(),

  clientId: integer("client_id")
    .notNull()
    .references(() => usersTable.id),
  statusId: integer("status_id")
    .notNull()
    .references(() => jobPostStatusesTable.id),
  categoryId: integer("category_id")
    .notNull()
    .default(0)
    .references(() => categoriesTable.id),

  requiredSkills: varchar("required_skills", { length: 30 })
    .array()
    .notNull()
    .default(sql`'{}'::varchar[]`),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const jobPostStatusesTable = pgTable("job_post_statuses", {
  id: integer("id").$type<JobPostStatusIds>().notNull().unique(),
  statusName: varchar("status_name", { length: 20 })
    .$type<JobPostStatus>()
    .notNull(),
});

export const offersTable = pgTable(
  "offers",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    freelancerId: integer("freelancer_id")
      .notNull()
      .references(() => usersTable.id),
    jobPostId: integer("job_post_id")
      .notNull()
      .references(() => jobPostsTable.id),
    offeringBudget: integer("offering_budget").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("freelancer_id_job_post_id_unique_idx").on(
      table.freelancerId,
      table.jobPostId
    ),
  ]
);

export const acceptedOffersTable = pgTable("accepted_offers", {
  jobPostId: integer("job_post_id")
    .notNull()
    .unique()
    .references(() => jobPostsTable.id),
  offerId: integer("offer_id")
    .notNull()
    .unique()
    .references(() => offersTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const jobPostTagsTable = pgTable(
  "job_post_tags",
  {
    jobPostId: integer("job_post_id")
      .notNull()
      .references(() => jobPostsTable.id),
    tag: varchar("tag", { length: 30 }).notNull(),
  },
  (table) => [
    uniqueIndex("job_post_id_tag_unique_idx").on(table.jobPostId, table.tag),
  ]
);

export const categoriesTable = pgTable("categories", {
  id: integer("id").notNull().unique(),
  category: varchar("category", { length: 50 }).notNull().unique(),
});
