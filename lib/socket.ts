"use client";

import { io, Socket } from "socket.io-client";

// Socket.io server URL - configure based on environment
// For development: use localhost, for production: use your domain
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "wss://socket.fujifenix.com";

let socket: Socket | null = null;
let isConnected = false;

// Initialize socket connection
export function initSocket(jwtToken?: string) {
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const options: any = {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    auth: jwtToken ? { token: jwtToken } : undefined,
  };

  socket = io(SOCKET_URL, options) as unknown as Socket;

  socket!.on("connect", () => {
    isConnected = true;
    console.log("Socket.io connected:", socket!.id);
  });

  socket!.on("disconnect", (reason) => {
    isConnected = false;
    console.log("Socket.io disconnected:", reason);
  });

  socket!.on("connect_error", (error) => {
    isConnected = false;
    console.error("Socket.io connection error:", error);
  });

  return socket;
}

// Connect with authentication
export function connectSocket(jwtToken: string) {
  return initSocket(jwtToken);
}

// Disconnect socket
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
    isConnected = false;
  }
}

// Check if currently connected
export function isSocketConnected(): boolean {
  return isConnected && socket?.connected !== false;
}

// Emit event to server
export function emit(event: string, data: any) {
  if (socket && socket.connected) {
    socket.emit(event, data);
    return true;
  }
  console.warn(`Socket not connected, cannot emit ${event}`);
  return false;
}

// Listen for server events
export function on(event: string, callback: (data: any) => void) {
  if (socket) {
    socket.on(event, callback);
    return () => {
      socket?.off(event, callback);
    };
  }
  return () => {};
}

// Emit inquiry created event
export function emitInquiryCreated(inquiryId: string, inquiryData: any) {
  emit("inquiry:created", { inquiryId, ...inquiryData });
}

// Emit product updated event
export function emitProductUpdated(productId: string, productData: any) {
  emit("product:updated", { productId, ...productData });
}

// Emit popup updated event
export function emitPopupUpdated(popupId: string, popupData: any) {
  emit("popup:updated", { popupId, ...popupData });
}

// Emit notification push event
export function emitNotificationPush(title: string, body: string, data?: any) {
  emit("notification:push", { title, body, ...data });
}

export type { Socket };