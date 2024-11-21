import { SelectProfile } from "@/db/schema"

export interface UpdateProfileRequest {
  userId: string
  name?: string
  imageUrl?: string
}

export interface GetProfileRequest {
  userId: string
} 