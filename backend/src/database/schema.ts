import {
  date,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import {
  GenderName,
  JobPostStatus,
  LanguageCode,
  RoleName,
} from "../helpers/types.js";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 40 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 60 }).notNull(),
  roleId: integer("role_id")
    .notNull()
    .references(() => rolesTable.id),

  postalCode: varchar("postal_code", { length: 10 }),
  homeAddress: varchar("home_address", { length: 500 }),
  genderId: integer("gender_id")
    .notNull()
    .references(() => gendersTable.id)
    .default(1),
  jobTitle: varchar("job_title", { length: 50 }),
  bio: varchar("bio", { length: 400 }),
  birthDate: date("birth_date"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at").notNull().defaultNow(),
});

export const rolesTable = pgTable("roles", {
  id: integer("id").notNull().unique(),
  roleName: varchar("role_name", { length: 10 }).$type<RoleName>().notNull(),
});

export const gendersTable = pgTable("genders", {
  id: integer("id").notNull().unique(),
  genderName: varchar("gender_name", { length: 1 })
    .$type<GenderName>()
    .notNull(),
});

export const jobPostsTable = pgTable("job_posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 60 }).notNull(),
  description: varchar("description", { length: 5000 }).notNull(),
  budget_low: integer("budget_low").notNull(),
  budget_high: integer("budget_high").notNull(),
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
  id: integer("id").notNull().unique(),
  statusName: varchar("status_name", { length: 20 })
    .$type<JobPostStatus>()
    .notNull(),
});

export const offersTable = pgTable(
  "offers",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    freelancer_id: integer("freelancer_id")
      .notNull()
      .references(() => usersTable.id),
    job_post_id: integer("job_post_id")
      .notNull()
      .references(() => jobPostsTable.id),
    offering_budget: integer("offering_budget").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("freelancer_id_job_post_id_unique_idx").on(
      table.freelancer_id,
      table.job_post_id
    ),
  ]
);

export const acceptedOffersTable = pgTable("accepted_offers", {
  job_post_id: integer("job_post_id")
    .notNull()
    .unique()
    .references(() => jobPostsTable.id),
  offer_id: integer("offer_id")
    .notNull()
    .unique()
    .references(() => offersTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userSkillsTable = pgTable(
  "user_skills",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    skill: varchar("skill", { length: 25 }).notNull(),
  },
  (table) => [
    uniqueIndex("user_id_skill_unique_idx").on(table.userId, table.skill),
  ]
);

export const userLanguagesTable = pgTable(
  "user_languages",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    languageCode: varchar("language_code", { length: 2 })
      .notNull()
      .references(() => languagesTable.code),
  },
  (table) => [
    uniqueIndex("user_id_language_id_unique_idx").on(
      table.userId,
      table.languageCode
    ),
  ]
);

export const languagesTable = pgTable("languages", {
  code: varchar("code", { length: 2 }).$type<LanguageCode>().notNull().unique(),
  languageName: varchar("language_name", { length: 20 }).notNull().unique(),
  languageNameFa: varchar("language_name_fa", { length: 20 })
    .notNull()
    .unique(),
});
