import { NextResponse } from "next/server"

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

export async function POST(req: Request) {
  if (!N8N_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "N8N webhook URL not configured" },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    
    // Format specifically for n8n AI Agent node which expects 'chatInput'
    const payload = {
      chatInput: body.message,
      messageHistory: body.messages || []
    }

    console.log("Sending to n8n:", {
      url: N8N_WEBHOOK_URL,
      payload
    })

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text()
    let data
    
    try {
      data = JSON.parse(responseText)
    } catch {
      data = responseText
    }

    if (!response.ok) {
      console.error("N8n error response:", data)
      return NextResponse.json(
        { error: "N8n workflow error", details: data?.message || "Unknown error" },
        { status: response.status }
      )
    }

    const aiResponse = typeof data === 'object' 
      ? data.text || data.output || data.response || data.chatOutput
      : data

    if (!aiResponse) {
      console.error("Invalid n8n response format:", data)
      return NextResponse.json(
        { error: "Invalid response format from n8n" },
        { status: 500 }
      )
    }

    return NextResponse.json({ response: aiResponse })

  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      { 
        error: "Failed to process chat message",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 