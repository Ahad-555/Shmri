import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, desc } from "drizzle-orm";
import {
  announcements as announcementsTable,
  suggestions as suggestionsTable,
  ratings as ratingsTable,
  support_tickets as supportTicketsTable,
} from "@shared/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export class DatabaseStorage {
  async getAnnouncements() {
    const rows = await db.select().from(announcementsTable).orderBy(desc(announcementsTable.date));
    return [...rows.filter(a => a.pinned), ...rows.filter(a => !a.pinned)];
  }
  async addAnnouncement(ann) {
    await db.insert(announcementsTable).values(ann);
  }
  async deleteAnnouncement(id) {
    const result = await db.delete(announcementsTable).where(eq(announcementsTable.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async togglePin(id) {
    const rows = await db.select().from(announcementsTable).where(eq(announcementsTable.id, id));
    if (!rows.length) return null;
    const updated = await db.update(announcementsTable)
      .set({ pinned: !rows[0].pinned })
      .where(eq(announcementsTable.id, id)).returning();
    return updated[0];
  }
  async getSuggestions() {
    return db.select().from(suggestionsTable).orderBy(desc(suggestionsTable.date));
  }
  async addSuggestion(s) { await db.insert(suggestionsTable).values(s); }
  async getRatings() {
    return db.select().from(ratingsTable).orderBy(desc(ratingsTable.date));
  }
  async addRating(r) { await db.insert(ratingsTable).values(r); }
  async getSupportTickets() {
    return db.select().from(supportTicketsTable).orderBy(desc(supportTicketsTable.date));
  }
  async addSupportTicket(t) { await db.insert(supportTicketsTable).values(t); }
}

export const storage = new DatabaseStorage();
