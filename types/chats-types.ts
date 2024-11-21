import { SelectChat, SelectMessage } from "@/db/schema"

export interface ChatWithMessages extends SelectChat {
  messages: SelectMessage[]
}

export interface CreateChatRequest {
  name: string
  userId: string
}

export interface DeleteChatRequest {
  id: string
  userId: string
} 