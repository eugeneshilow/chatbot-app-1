import { roleEnum } from "@/db/schema"

export interface CreateMessageRequest {
  chatId: string
  content: string
  role: typeof roleEnum.enumValues[number]
}

export interface GetMessagesRequest {
  chatId: string
} 