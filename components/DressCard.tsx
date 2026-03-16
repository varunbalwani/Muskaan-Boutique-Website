import Link from 'next/link'
import Image from 'next/image'
import { Dress } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

export default function DressCard({ dress }: { dress: Dress }) {
  const imageUrl = dress.images?.[0]
    ? urlFor(dress.images[0]).width(400).height(500).fit('crop').url()
    : '/placeholder.jpg'

  return (
    <Link href={`/dress/${dress._id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={imageUrl}
          alt={dress.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-1">#{dress.code}</p>
        <h3 className="font-medium text-gray-800 text-sm truncate">{dress.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-pink-600 font-semibold">₹{dress.price.toLocaleString()}</span>
            {dress.displayPrice && (
              <span className="text-gray-400 text-xs line-through">₹{dress.displayPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex gap-1">
            {dress.colors?.slice(0, 4).map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
