"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatMessageProps {
  role: "assistant" | "user"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "group relative mb-4 flex items-start md:gap-6 gap-4",
        role === "assistant" && "bg-muted/50 p-4 -mx-4"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={role === "assistant" ? "bg-primary/10" : "bg-secondary/50"}>
          {role === "assistant" ? "AI" : "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
          {content}
        </div>
      </div>
    </div>
  )
} 