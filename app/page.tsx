import Link from 'next/link'
import Image from 'next/image'
import { getCategories, getFeaturedDresses, getSiteSettings } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import DressCard from '@/components/DressCard'
import HeroCarousel from '@/components/HeroCarousel'

export const revalidate = 60

export default async function HomePage() {
  const [categories, featured, settings] = await Promise.all([
    getCategories(),
    getFeaturedDresses(),
    getSiteSettings(),
  ])

  return (
    <main>
      <HeroCarousel />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Shop by Category</h2>
        <p className="text-gray-500 text-sm mb-6">Find your perfect style</p>
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map((cat) => {
            const imgUrl = cat.picture
              ? urlFor(cat.picture).width(400).height(500).fit('crop').url()
              : null
            return (
              <Link
                key={cat._id}
                href={`/catalog?categories=${cat.slug.current}`}
                className="flex-shrink-0 w-52 group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-semibold text-sm">{cat.name}</p>
                    {cat.startingPrice && (
                      <p className="text-xs opacity-80">From ₹{cat.startingPrice.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Dresses */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Featured Dresses</h2>
            <p className="text-gray-500 text-sm">Handpicked for you</p>
          </div>
          <Link href="/catalog" className="text-pink-600 text-sm font-medium hover:underline">View All</Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No dresses added yet.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {featured.map((dress) => (
              <div key={dress._id} className="flex-shrink-0 w-52">
                <DressCard dress={dress} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          {settings?.aboutImage && (
            <div className="relative flex-1 rounded-2xl overflow-hidden aspect-[4/3] max-w-sm w-full">
              <Image
                src={urlFor(settings.aboutImage).width(600).height(450).fit('crop').url()}
                alt="About Muskaan"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Muskaan</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              {settings?.aboutText || 'Muskaan is a premium boutique dedicated to bringing you the finest curated ethnic wear. From beautifully vibrant Anarkalis to timelessly elegant Lehengas, every single piece is handpicked with the utmost love and care.'}
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold text-pink-600">20+</p>
                <p className="text-sm text-gray-500">Years</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-600">500+</p>
                <p className="text-sm text-gray-500">Designs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-600">10k+</p>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
