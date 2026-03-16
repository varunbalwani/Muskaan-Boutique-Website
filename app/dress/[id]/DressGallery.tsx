'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function DressGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${active === i ? 'border-pink-500' : 'border-transparent'}`}
          >
            <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 rounded-2xl overflow-hidden aspect-[4/5]">
        <Image src={images[active]} alt={name} fill className="object-cover" priority />
      </div>
    </div>
  )
}
