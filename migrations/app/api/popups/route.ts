import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch, sanityCreate, sanityPatch, sanityDelete } from '@/lib/sanity'
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

  const popups = await sanityFetch(
    `*[_type == "popup"] | order(order asc) {
      _id, title, type, content, ctaText, ctaLink,
      active, frequency, delay, scrollPercent, order
    }`
  )

  return NextResponse.json({ popups })
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const popup = await sanityCreate({
    _type: 'popup',
    title: body.title,
    type: body.type,
    content: body.content || '',
    ctaText: body.ctaText || '',
    ctaLink: body.ctaLink || '',
    active: body.active ?? true,
    frequency: body.frequency || 'every-visit',
    delay: body.delay || 0,
    scrollPercent: body.scrollPercent || 0,
    order: 0,
  })

  return NextResponse.json({ popup })
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  if (!body._id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const updateData: Record<string, unknown> = {}
  if (body.active !== undefined) updateData.active = body.active
  if (body.title) updateData.title = body.title
  if (body.content !== undefined) updateData.content = body.content

  await sanityPatch(body._id, updateData)
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await sanityDelete(id)
  return NextResponse.json({ success: true })
}
