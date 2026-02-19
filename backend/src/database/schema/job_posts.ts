import {
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { JobPostStatus } from "../../helpers/types.js";
import { JobPostStatusIds } from "../../helpers/consts.js";
import { usersTable } from "./users.js";

export const jobPostsTable = pgTable("job_posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 60 }).notNull(),
  description: varchar("description", { length: 5000 }).notNull(),
  budgetLow: integer("budget_low").notNull(),
  budgetHigh: integer("budget_high").notNull(),
  clientId: integer("client_id")
    .notNull()
    .references(() => usersTable.id),
  statusId: integer("status_id")
    .notNull()
    .references(() => jobPostStatusesTable.id),
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
