import { NextRequest, NextResponse } from 'next/server'
import { getRelatedDresses } from '@/lib/queries'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const categoryIds = searchParams.get('categoryIds')?.split(',') ?? []
  const excludeId = searchParams.get('excludeId') ?? ''
  const start = Number(searchParams.get('start') ?? 0)
  const limit = Number(searchParams.get('limit') ?? 5)

  const dresses = await getRelatedDresses(categoryIds, excludeId, start, limit)
  return NextResponse.json(dresses)
}
