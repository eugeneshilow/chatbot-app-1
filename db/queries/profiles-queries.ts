"use server"

import { db } from "@/db/db"
import { profilesTable, InsertProfile } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createProfile = async (data: InsertProfile) => {
  try {
    const [newProfile] = await db.insert(profilesTable).values(data).returning()
    return newProfile
  } catch (error) {
    console.error("Error creating profile:", error)
    throw new Error("Failed to create profile")
  }
}

export const getProfile = async (userId: string) => {
  try {
    return await db.query.profiles.findFirst({
      where: eq(profilesTable.userId, userId)
    })
  } catch (error) {
    console.error("Error getting profile:", error)
    throw new Error("Failed to get profile")
  }
}

export const updateProfile = async (userId: string, data: Partial<InsertProfile>) => {
  try {
    const [updatedProfile] = await db
      .update(profilesTable)
      .set(data)
      .where(eq(profilesTable.userId, userId))
      .returning()
    return updatedProfile
  } catch (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }
}