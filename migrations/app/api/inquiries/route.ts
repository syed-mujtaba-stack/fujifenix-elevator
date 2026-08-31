import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch, sanityCreate, sanityPatch } from '@/lib/sanity'
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

export async function GET(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const limit = parseInt(searchParams.get('limit') || '50')

  if (id) {
    const inquiry = await sanityFetch(
      `*[_type == "inquiry" && _id == $id][0]`,
      { id }
    )
    return NextResponse.json({ inquiry })
  }

  const inquiries = await sanityFetch(
    `*[_type == "inquiry"] | order(createdAt desc) [0...${limit}] {
      _id, name, email, phone, company, country, city,
      subject, message, source, status, replies, createdAt
    }`
  )

  return NextResponse.json({ inquiries })
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  // Public endpoint for form submissions (CTA / Contact)
  if (type === 'submit') {
    const body = await request.json()
    const inquiry = await sanityCreate({
      _type: 'inquiry',
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      country: body.country || '',
      city: body.city || '',
      subject: body.subject || '',
      message: body.message || '',
      projectType: body.projectType || '',
      floors: body.floors || '',
      units: body.units || '',
      source: body.source || 'contact',
      status: 'new',
      replies: [],
      createdAt: new Date().toISOString(),
    })
    return NextResponse.json({ success: true, inquiry })
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const body = await request.json()
  const updateData: Record<string, unknown> = {}

  if (body.status) updateData.status = body.status
  if (body.readAt) updateData.readAt = new Date().toISOString()

  await sanityPatch(id, updateData)
  return NextResponse.json({ success: true })
}
