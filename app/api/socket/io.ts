let ioInstance: any = null

export function getIO() {
  if (ioInstance) return ioInstance

  try {
    const { Server } = require("socket.io")

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
