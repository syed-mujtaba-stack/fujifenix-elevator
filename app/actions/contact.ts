"use server";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  subject?: string;
  message: string;
  // CTA-specific
  company?: string;
  projectType?: string;
  floors?: string;
  units?: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Handles both the /contact form and the /cta quote form.
 * Submits via mailto-compatible approach using fetch to a simple
 * email relay (Formspree). Replace FORMSPREE_ENDPOINT with your
 * actual endpoint, or swap the fetch block for any email service
 * (SendGrid, Resend, Nodemailer, etc.).
 *
 * If no FORMSPREE_ENDPOINT env var is set, the action still
 * returns success so the UI works during development.
 */
export async function submitContact(payload: ContactPayload): Promise<ActionResult> {
  const endpoint = process.env.FORMSPREE_ENDPOINT;

  if (!endpoint) {
    // No endpoint configured — succeed silently in dev / preview
    console.log("[contact] No FORMSPREE_ENDPOINT set. Payload:", payload);
    return { success: true };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = (data as { error?: string }).error ?? `HTTP ${res.status}`;
      return { success: false, error: msg };
    }

    return { success: true };
  } catch (err) {
    console.error("[contact] Submission error:", err);
    return { success: false, error: "Network error. Please try again or contact us directly." };
  }
}
