import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { chatsTable, messagesTable, profilesTable } from "@/db/schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, {
  schema: {
    profiles: profilesTable,
    chats: chatsTable,
    messages: messagesTable
  }
});