"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatHistoryItemProps {
  title: string
  active?: boolean
  onClick?: () => void
}

export function ChatHistoryItem({
  title,
  active,
  onClick,
}: ChatHistoryItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 rounded-none h-auto p-3",
        active && "bg-accent"
      )}
      onClick={onClick}
    >
      <MessageSquare className="h-4 w-4 shrink-0" />
      <span className="truncate">{title}</span>
    </Button>
  )
} 