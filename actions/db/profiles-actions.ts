"use server"

import { createProfile, getProfile, updateProfile } from "@/db/queries/profiles-queries"
import { InsertProfile, SelectProfile } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createProfileAction(
  profile: InsertProfile
): Promise<ActionState<SelectProfile>> {
  try {
    const newProfile = await createProfile(profile)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Profile created successfully",
      data: newProfile
    }
  } catch (error) {
    console.error("Error creating profile:", error)
    return { isSuccess: false, message: "Failed to create profile" }
  }
}

export async function getProfileAction(
  userId: string
): Promise<ActionState<SelectProfile>> {
  try {
    const profile = await getProfile(userId)
    return {
      isSuccess: true,
      message: "Profile retrieved successfully",
      data: profile
    }
  } catch (error) {
    console.error("Error getting profile:", error)
    return { isSuccess: false, message: "Failed to get profile" }
  }
}

export async function updateProfileAction(
  userId: string,
  data: Partial<InsertProfile>
): Promise<ActionState<SelectProfile>> {
  try {
    const profile = await updateProfile(userId, data)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Profile updated successfully",
      data: profile
    }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { isSuccess: false, message: "Failed to update profile" }
  }
} 