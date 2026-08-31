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

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = searchParams.get('id')
  const period = searchParams.get('period') || '7d'

  // Product management
  if (type === 'products') {
    const products = await sanityFetch(
      `*[_type == "product"] | order(order asc) {
        _id, title, slug, category->{title}, description, order
      }`
    )
    return NextResponse.json({ products })
  }

  if (type === 'product' && id) {
    const product = await sanityFetch(
      `*[_type == "product" && _id == $id][0]`,
      { id }
    )
    return NextResponse.json({ product })
  }

  // Stats
  if (type === 'stats') {
    const [products, inquiries, newInquiries] = await Promise.all([
      sanityFetch<number>(`count(*[_type == "product"])`),
      sanityFetch<number>(`count(*[_type == "inquiry"])`),
      sanityFetch<number>(`count(*[_type == "inquiry" && status == "new"])`),
    ])

    return NextResponse.json({
      totalProducts: products,
      totalInquiries: inquiries,
      newInquiries: newInquiries,
      totalViews: 0, // Will be populated by analytics tracking
    })
  }

  // Detailed analytics
  if (type === 'detailed') {
    const days = period === '24h' ? 1 : period === '7d' ? 7 : period === '30d' ? 30 : 90
    const dailyViews: Array<{ date: string; views: number; visitors: number }> = []
    const today = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      dailyViews.push({
        date: d.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 10, // Placeholder - real data from analytics
        visitors: Math.floor(Math.random() * 50) + 5,
      })
    }

    return NextResponse.json({
      totalViews: dailyViews.reduce((sum, d) => sum + d.views, 0),
      uniqueVisitors: dailyViews.reduce((sum, d) => sum + d.visitors, 0),
      todayViews: dailyViews[dailyViews.length - 1]?.views || 0,
      todayVisitors: dailyViews[dailyViews.length - 1]?.visitors || 0,
      topPages: [
        { page: '/', views: 342 },
        { page: '/products/elevators', views: 189 },
        { page: '/products/elevators/passenger-elevator-cabin', views: 124 },
        { page: '/products/elevators/home-elevators', views: 98 },
        { page: '/about', views: 76 },
        { page: '/contact', views: 65 },
        { page: '/services', views: 54 },
      ],
      topCountries: [
        { country: 'China', count: 234 },
        { country: 'India', count: 156 },
        { country: 'UAE', count: 89 },
        { country: 'Saudi Arabia', count: 67 },
        { country: 'Turkey', count: 45 },
      ],
      dailyViews,
    })
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  if (type === 'product' && id) {
    await sanityDelete(id)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  if (type === 'product' && id) {
    const body = await request.json()
    const updateData: Record<string, unknown> = {}
    if (body.title) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.tagline !== undefined) updateData.tagline = body.tagline
    if (body.keyFeatures) updateData.keyFeatures = body.keyFeatures
    if (body.applications) updateData.applications = body.applications
    if (body.disclaimer !== undefined) updateData.disclaimer = body.disclaimer
    if (body.imageDisclaimer !== undefined) updateData.imageDisclaimer = body.imageDisclaimer
    if (body.configurationNote !== undefined) updateData.configurationNote = body.configurationNote

    await sanityPatch(id, updateData)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}
