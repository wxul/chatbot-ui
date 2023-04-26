import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const auth = process.env.BASIC_AUTH

  if (!auth) {
    return NextResponse.next()
  }
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    if(atob(authValue) === auth) {
      return NextResponse.next()
    }
  }
  return new NextResponse(
    JSON.stringify({
      success:false,
      message: 'auth failed'
    }),
    {status: 401, headers: { 'WWW-authenticate':'Basic realm="Secure Area"'}}
  )
}

export const config = {
  matcher: '/:path*',
}