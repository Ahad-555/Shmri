import { z } from "zod";
import { pgTable, text, boolean, integer } from "drizzle-orm/pg-core";

export const authSchema = z.object({
  password: z.string().min(1, "الرجاء إدخال كلمة المرور"),
});

export const announcements = pgTable("announcements", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  date: text("date").notNull(),
  pinned: boolean("pinned").notNull().default(false),
  image: text("image"),
});

export const suggestions = pgTable("suggestions", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  date: text("date").notNull(),
});

export const ratings = pgTable("ratings", {
  id: text("id").primaryKey(),
  value: integer("value").notNull(),
  date: text("date").notNull(),
});

export const support_tickets = pgTable("support_tickets", {
  id: text("id").primaryKey(),
  problemType: text("problem_type").notNull(),
  message: text("message").notNull(),
  date: text("date").notNull(),
});
