"use server"

import { db } from "@/db/db"
import { chatsTable, messagesTable, InsertChat, InsertMessage } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export const createChat = async (data: InsertChat) => {
  try {
    const [newChat] = await db.insert(chatsTable).values(data).returning()
    return newChat
  } catch (error) {
    console.error("Error creating chat:", error)
    throw new Error("Failed to create chat")
  }
}

export const getChats = async (userId: string) => {
  try {
    return await db.query.chats.findMany({
      where: eq(chatsTable.userId, userId),
      orderBy: [desc(chatsTable.createdAt)],
      with: {
        messages: true
      }
    })
  } catch (error) {
    console.error("Error getting chats:", error)
    throw new Error("Failed to get chats")
  }
}

export const getChatById = async (id: string) => {
  try {
    return await db.query.chats.findFirst({
      where: eq(chatsTable.id, id),
      with: {
        messages: true
      }
    })
  } catch (error) {
    console.error("Error getting chat:", error)
    throw new Error("Failed to get chat")
  }
}

export const deleteChat = async (id: string) => {
  try {
    const [deletedChat] = await db
      .delete(chatsTable)
      .where(eq(chatsTable.id, id))
      .returning()
    return deletedChat
  } catch (error) {
    console.error("Error deleting chat:", error)
    throw new Error("Failed to delete chat")
  }
} 