"use client";

import webpush from "web-push";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// VAPID keys - generate once and store in environment variables
// These should be set in Vercel dashboard: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || "",
  privateKey: process.env.VAPID_PRIVATE_KEY || "",
  subject: process.env.VAPID_SUBJECT || "mailto:admin@fujifenix.com",
}

// Configure webpush with VAPID details
if (vapidKeys.privateKey && vapidKeys.publicKey) {
  webpush.setVapidDetails(
    vapidKeys.subject,
    vapidKeys.publicKey,
    vapidKeys.privateKey
  )
}

// Save push subscription to Sanity
export async function savePushSubscription(
  subscription: {
    endpoint: string
    keys: { p256dh: string, auth: string }
  },
  adminUserId: string
) {
  try {
    await sanityClient
      .patch(adminUserId)
      .set({ pushSubscription: subscription })
      .commit()
    return { success: true, error: null }
  } catch (error) {
    console.error("Failed to save push subscription:", error)
    return { success: false, error: "Failed to save subscription" }
  }
}

// Get all push subscriptions from admin users
export async function getPushSubscriptions() {
  try {
    const users = await sanityClient.fetch(
      `*[_type == "adminUser" && defined(pushSubscription)] {
        _id,
        name,
        email,
        pushSubscription
      }`
    )

    const subscriptions = users.flatMap((user: any) => user.pushSubscription || [])
    return subscriptions
  } catch (error) {
    console.error("Failed to fetch push subscriptions:", error)
    return []
  }
}

// Send push notification to a single subscription
export async function sendPushToSubscription(
  subscription: {
    endpoint: string
    keys: { p256dh: string, auth: string }
  },
  payload: { title: string; body: string; data?: any }
) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload))
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Failed to send push notification:", error)
    return {
      success: false,
      error: error.message || "Failed to send notification",
    }
  }
}

// Send push notification to all admin users
export async function sendPushToAdmins(
  payload: { title: string; body: string; data?: any }
) {
  try {
    const subscriptions = await getPushSubscriptions()

    if (subscriptions.length === 0) {
      return { success: true, sent: 0 }
    }

    const results = await Promise.allSettled(
      subscriptions.map((sub) => sendPushToSubscription(sub, payload))
    )

    const sent = results.filter(
      (r): r is PromiseFulfilledResult<any> => r.status === "fulfilled"
    ).length

    return { success: true, sent }
  } catch (error) {
    console.error("Failed to send push to admins:", error)
    return { success: false, error: "Failed to send notification", sent: 0 }
  }
}

// Initialize service worker registration
export async function initializePushNotification(
  onSuccess: () => void,
  onError: (error: string) => void
) {
  // Check if Push API is supported
  if (!("PushManager" in window)) {
    onError("Push API not supported")
    return
  }

  // Check for permission
  const permission = await Notification.requestPermission()
  if (permission !== "granted") {
    onError("Permission not granted")
    return
  }

  // Register service worker
  try {
    const registration = await navigator.serviceWorker.register(
      "/sw.js",
      { scope: "/" }
    ) as ServiceWorkerRegistration

    // Get subscription
    const subscription = await registration.pushManager.getSubscription()

    if (!subscription) {
      // Create new subscription
      const result = await registration.pushManager.subscribe({
        userVisibleOnly: true,
      })

      // Save to Sanity
      await savePushSubscription(
        {
          endpoint: result.endpoint!,
          keys: {
            p256dh: result.keys?.p256dh || "",
            auth: result.keys?.auth || "",
          },
        },
        "current-admin-user-id" // This should be the actual admin user ID
      )

      onSuccess()
    } else {
      onSuccess()
    }
  } catch (error: any) {
    onError(error.message || "Failed to initialize push notifications")
  }
}