"use server"

import { db } from "@/db/db"
import { messagesTable, InsertMessage } from "@/db/schema"
import { eq, and } from "drizzle-orm"

export const createMessage = async (data: InsertMessage) => {
  try {
    const [newMessage] = await db.insert(messagesTable).values(data).returning()
    return newMessage
  } catch (error) {
    console.error("Error creating message:", error)
    throw new Error("Failed to create message")
  }
}

export const getMessages = async (chatId: string) => {
  try {
    return await db.query.messages.findMany({
      where: eq(messagesTable.chatId, chatId),
      orderBy: messagesTable.createdAt
    })
  } catch (error) {
    console.error("Error getting messages:", error)
    throw new Error("Failed to get messages")
  }
} 