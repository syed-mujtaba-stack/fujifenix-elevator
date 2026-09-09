import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Socket.io server setup for Vercel Edge Functions
// This is a simple wrapper - in production, use a dedicated Node.js server

let ioInstance: any = null

export function getIO() {
  if (ioInstance) return ioInstance

  // Try to initialize Socket.io
  try {
    const { Server } = require("socket.io")
    const http = require("http")

    // Create a simple HTTP server for Socket.io
    // In production, this should be a separate Node.js server
    ioInstance = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })

    return ioInstance
  } catch (error) {
    console.error("Socket.io initialization error:", error)
    return null
  }
}

// Webhook handler for Sanity events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle Sanity webhooks
    const { dataset, documentId, eventType } = body

    if (!ioInstance) {
      return NextResponse.json(
        { error: "Socket.io not initialized" },
        { status: 503 }
      )
    }

    // Emit events based on Sanity webhook type
    switch (eventType) {
      case "create":
      case "update":
        ioInstance.emit(`inquiry:${dataset}`, {
          type: "update",
          dataset,
          documentId,
        })
        break
      case "delete":
        ioInstance.emit(`inquiry:${dataset}:deleted`, {
          type: "delete",
          dataset,
          documentId,
        })
        break
      default:
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Socket.io webhook error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Health check endpoint
export const GET = async () => {
  return NextResponse.json({
    status: "ok",
    socket: ioInstance ? "initialized" : "not initialized",
  })
}