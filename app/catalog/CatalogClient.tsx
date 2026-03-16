'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DressCard from '@/components/DressCard'
import { Dress, Category } from '@/lib/types'
import { SlidersHorizontal, X } from 'lucide-react'

const COLORS = [
  { label: 'Red', value: '#E63946' }, { label: 'Pink', value: '#FF6B9D' },
  { label: 'Magenta', value: '#C2185B' }, { label: 'Orange', value: '#FF6D00' },
  { label: 'Yellow', value: '#FFD600' }, { label: 'Gold', value: '#FFC107' },
  { label: 'Green', value: '#2E7D32' }, { label: 'Teal', value: '#00897B' },
  { label: 'Cyan', value: '#00BCD4' }, { label: 'Blue', value: '#1565C0' },
  { label: 'Navy', value: '#0D1B4B' }, { label: 'Purple', value: '#6A1B9A' },
  { label: 'Lavender', value: '#9C7BB5' }, { label: 'White', value: '#FFFFFF' },
  { label: 'Black', value: '#212121' },
]
const SIZES = ['M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL']

interface Props {
  dresses: Dress[]
  categories: Category[]
  initialFilters: {
    search?: string
    categories?: string[]
    colors?: string[]
    sizes?: string[]
    minPrice?: number
    maxPrice?: number
  }
}

export default function CatalogClient({ dresses, categories, initialFilters }: Props) {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [selCats, setSelCats] = useState<string[]>(initialFilters.categories || [])
  const [selColors, setSelColors] = useState<string[]>(initialFilters.colors || [])
  const [selSizes, setSelSizes] = useState<string[]>(initialFilters.sizes || [])
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || '')
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || '')

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (selCats.length) params.set('categories', selCats.join(','))
    if (selColors.length) params.set('colors', selColors.join(','))
    if (selSizes.length) params.set('sizes', selSizes.join(','))
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    router.push(`/catalog?${params.toString()}`)
    setShowFilters(false)
  }

  const clearFilters = () => {
    setSelCats([]); setSelColors([]); setSelSizes([]); setMinPrice(''); setMaxPrice('')
    router.push('/catalog')
  }

  const hasFilters = selCats.length || selColors.length || selSizes.length || minPrice || maxPrice

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ethnic Wear</h1>
          <p className="text-sm text-gray-500">{dresses.length} products</p>
        </div>
        <div className="flex gap-3">
          {hasFilters ? (
            <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-red-500 hover:underline">
              <X size={14} /> Clear filters
            </button>
          ) : null}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border px-4 py-2 rounded-full text-sm hover:bg-gray-50"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Categories */}
          <div>
            <p className="font-semibold text-sm mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c._id}
                  onClick={() => toggle(selCats, c.slug.current, setSelCats)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${selCats.includes(c.slug.current) ? 'bg-pink-600 text-white border-pink-600' : 'border-gray-300 hover:border-pink-400'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="font-semibold text-sm mb-3">Color</p>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  title={c.label}
                  onClick={() => toggle(selColors, c.value, setSelColors)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${selColors.includes(c.value) ? 'border-pink-600 scale-110' : 'border-gray-200'}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="font-semibold text-sm mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(selSizes, s, setSelSizes)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${selSizes.includes(s) ? 'bg-pink-600 text-white border-pink-600' : 'border-gray-300 hover:border-pink-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="font-semibold text-sm mb-3">Price Range (₹)</p>
            <div className="flex gap-2 items-center">
              <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" className="border rounded-lg px-3 py-1.5 text-sm w-full outline-none focus:border-pink-400" />
              <span className="text-gray-400">–</span>
              <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" className="border rounded-lg px-3 py-1.5 text-sm w-full outline-none focus:border-pink-400" />
            </div>
            <button onClick={applyFilters} className="mt-4 w-full bg-pink-600 text-white py-2 rounded-full text-sm hover:bg-pink-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {dresses.length === 0 ? (
        <div className="text-center py-24 text-gray-400">No dresses found. Try different filters.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dresses.map((dress) => <DressCard key={dress._id} dress={dress} />)}
        </div>
      )}
    </div>
  )
}
