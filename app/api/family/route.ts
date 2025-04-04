import { NextResponse } from 'next/server'

import familyGroups from '@/lib/mock-data/familyGroups.json'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const familyId = searchParams.get('familyId')

  if (familyId) {
    const family = familyGroups[familyId as keyof typeof familyGroups]

    if (!family) {
      return NextResponse.json({ error: 'Family not found' }, { status: 404 })
    }

    return NextResponse.json(family)
  }

  return NextResponse.json(familyGroups)
}
