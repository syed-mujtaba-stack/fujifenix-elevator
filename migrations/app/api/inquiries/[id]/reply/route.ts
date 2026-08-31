import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch, sanityPatch } from '@/lib/sanity'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'fujifenix-admin-secret')

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  if (!token) return false
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await request.nextUrl.pathname.split('/').reduceRight((acc, seg, i, arr) => {
    return i === arr.length - 2 ? { id: seg } : acc
  }, {} as { id: string })

  const body = await request.json()
  const { message } = body

  if (!message) {
    return NextResponse.json({ error: 'Message required' }, { status: 400 })
  }

  // Get current inquiry
  const inquiry = await sanityFetch<{ _id: string; replies: Array<unknown>; email: string; name: string } | null>(
    `*[_type == "inquiry" && _id == $id][0]`,
    { id }
  )

  if (!inquiry) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
  }

  const newReply = {
    message,
    sentBy: 'admin',
    timestamp: new Date().toISOString(),
    emailSent: false,
  }

  const updatedReplies = [...(inquiry.replies || []), newReply]

  await sanityPatch(id, {
    replies: updatedReplies,
    status: 'replied',
    updatedAt: new Date().toISOString(),
  })

  // TODO: Send email to user here via Resend/SendGrid

  const updated = await sanityFetch(
    `*[_type == "inquiry" && _id == $id][0]`,
    { id }
  )

  return NextResponse.json({ success: true, inquiry: updated })
}
