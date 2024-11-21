import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const memberships = pgEnum("membership", ["free", "pro"]);

export const profilesTable = pgTable("profiles", {
  userId: text("user_id").notNull().primaryKey(),
  membership: memberships("membership").notNull().default("free"),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
});

export type InsertProfile = typeof profilesTable.$inferSelect;
export type SelectProfile = typeof profilesTable.$inferInsert;