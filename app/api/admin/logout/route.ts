import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.set("session", "", { expires: new Date(0), httpOnly: true })
  return NextResponse.json({ success: true })
}
