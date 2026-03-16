import { getDressBySlug, getRelatedDresses } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import WhatsAppButton from './WhatsAppButton'
import DressGallery from './DressGallery'
import RelatedDresses from './RelatedDresses'

export const revalidate = 60

export default async function DressPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dress = await getDressBySlug(id)
  if (!dress) notFound()

  const categoryIds = dress.categories?.map((c) => c._id) ?? []
  const related = await getRelatedDresses(categoryIds, id, 0, 5)

  const images = dress.images
    ?.filter(Boolean)
    .map((img: any) => img.url ?? urlFor(img).width(800).height(1000).fit('crop').url())
    ?? []

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <DressGallery images={images} name={dress.name} />

        {/* Info */}
        <div>
          <p className="text-xs text-gray-400 mb-1">Product Code: #{dress.code}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{dress.name}</h1>
          <div className="flex items-baseline gap-3 mb-4">
            <p className="text-3xl font-bold text-pink-600">₹{dress.price.toLocaleString()}</p>
            {dress.displayPrice && (
              <p className="text-xl text-gray-400 line-through">₹{dress.displayPrice.toLocaleString()}</p>
            )}
          </div>

          {dress.colors && dress.colors.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Colors</p>
              <div className="flex gap-2">
                {dress.colors.map((color) => (
                  <span key={color} className="w-7 h-7 rounded-full border-2 border-gray-200" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          )}

          {dress.sizes && dress.sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Available Sizes</p>
              <div className="flex gap-2 flex-wrap">
                {dress.sizes.map((size) => (
                  <span key={size} className="border border-gray-300 px-3 py-1 rounded-full text-sm">{size}</span>
                ))}
              </div>
            </div>
          )}

          {dress.description && (
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{dress.description}</p>
          )}

          <WhatsAppButton dressName={dress.name} dressCode={dress.code} />
        </div>
      </div>

      {/* Related */}
      <RelatedDresses initial={related} categoryIds={categoryIds} excludeId={id} />
    </main>
  )
}
