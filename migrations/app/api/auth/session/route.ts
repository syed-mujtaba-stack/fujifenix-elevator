import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'fujifenix-admin-secret')

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value
    if (!token) {
      return NextResponse.json({ user: null })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return NextResponse.json({
      user: {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
      },
    })
  } catch {
    return NextResponse.json({ user: null })
  }
}
