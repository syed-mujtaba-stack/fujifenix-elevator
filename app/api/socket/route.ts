import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIO } from "./io"

let ioInstance: any = null

function ensureIO() {
  if (!ioInstance) ioInstance = getIO()
  return ioInstance
}

// Webhook handler for Sanity events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { dataset, documentId, eventType } = body

    const io = ensureIO()
    if (!io) {
      return NextResponse.json(
        { error: "Socket.io not initialized" },
        { status: 503 }
      )
    }

    switch (eventType) {
      case "create":
      case "update":
        io.emit(`inquiry:${dataset}`, {
          type: "update",
          dataset,
          documentId,
        })
        break
      case "delete":
        io.emit(`inquiry:${dataset}:deleted`, {
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
  const io = ensureIO()
  return NextResponse.json({
    status: "ok",
    socket: io ? "initialized" : "not initialized",
  })
}
