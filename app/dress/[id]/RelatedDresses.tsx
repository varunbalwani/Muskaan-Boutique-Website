'use client'
import { useState, useRef, useEffect } from 'react'
import DressCard from '@/components/DressCard'
import { Dress } from '@/lib/types'

const PAGE_SIZE = 5

interface Props {
  initial: Dress[]
  categoryIds: string[]
  excludeId: string
}

export default function RelatedDresses({ initial, categoryIds, excludeId }: Props) {
  const [dresses, setDresses] = useState<Dress[]>(initial)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initial.length === PAGE_SIZE)
  const scrollRef = useRef<HTMLDivElement>(null)

  const loadMore = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    const res = await fetch(
      `/api/related?categoryIds=${categoryIds.join(',')}&excludeId=${excludeId}&start=${dresses.length}&limit=${PAGE_SIZE}`
    )
    const data: Dress[] = await res.json()
    setDresses((prev) => [...prev, ...data])
    setHasMore(data.length === PAGE_SIZE)
    setLoading(false)
  }

  // detect when user scrolls near the end of the container
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 100) {
        loadMore()
      }
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [dresses, loading, hasMore])

  if (dresses.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {dresses.map((d) => (
          <div key={d._id} className="flex-shrink-0 w-52">
            <DressCard dress={d} />
          </div>
        ))}
        {loading && (
          <div className="flex-shrink-0 w-52 flex items-center justify-center text-gray-400 text-sm">
            Loading...
          </div>
        )}
      </div>
    </div>
  )
}
