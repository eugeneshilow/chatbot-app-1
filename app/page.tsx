"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatHistoryItem } from "@/components/chat/chat-history-item"

interface Message {
  role: "assistant" | "user"
  content: string
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const newMessages = [
      ...messages,
      { role: "user", content: message } as Message,
    ]
    setMessages(newMessages)
    setMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          messages: newMessages
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to get response")
      }

      if (!data.response) {
        throw new Error("Invalid response format")
      }

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response },
      ])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `Error: ${error instanceof Error ? error.message : "Something went wrong. Please try again."}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[260px] bg-background border-r">
        <div className="flex h-full flex-col">
          <div className="p-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setMessages([])}
            >
              + New chat
            </Button>
          </div>

          <div className="flex-1 overflow-auto">
            {messages.length > 0 && (
              <ChatHistoryItem 
                title={messages[0].content.substring(0, 30) + "..."} 
                active={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4">
          <div className="mx-auto max-w-3xl">
            {messages.length === 0 ? (
              <div className="text-center mt-16">
                <h1 className="text-3xl font-semibold mb-8">
                  What can I help with?
                </h1>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  role={msg.role}
                  content={msg.content}
                />
              ))
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl relative">
            <Input
              placeholder="Message ChatGPT"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 top-1.5"
              disabled={!message.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
