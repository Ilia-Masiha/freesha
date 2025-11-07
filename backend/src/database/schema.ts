import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 40 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 60 }).notNull(),
  roleId: integer("role_id")
    .notNull()
    .references(() => rolesTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at").notNull().defaultNow(),
});

export const rolesTable = pgTable("roles", {
  id: integer("id").notNull().unique(),
  roleName: varchar("role_name", { length: 10 }).notNull(),
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
  statusName: varchar("status_name", { length: 20 }).notNull(),
});
