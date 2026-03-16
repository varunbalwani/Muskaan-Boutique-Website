'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SLIDES = [
  {
    image: '/hero.jpg',
    tag: 'New Collection',
    title: 'Elegance in\nEvery Stitch',
    subtext: 'Discover our handpicked collection of ethnic wear — crafted for the modern Indian woman.',
  },
  {
    image: '/hero.jpg',
    tag: 'Trending Now',
    title: 'Designed for\nthe Details',
    subtext: 'Classic ethnic styles reimagined for the modern woman. Step into timeless elegance designed to fit you flawlessly.',
  },
  {
    image: '/hero.jpg',
    tag: 'Premium Feel',
    title: 'Tradition,\nTailored for You',
    subtext: 'Elevate your wardrobe with our latest collection. Experience stunning patterns and perfect finishes made to turn heads.',
  },
]

export default function HeroCarousel() {
  const [active, setActive] = useState(0)

  const next = useCallback(() => setActive((p) => (p + 1) % SLIDES.length), [])
  const prev = useCallback(() => setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  const leftIdx = (active - 1 + SLIDES.length) % SLIDES.length
  const rightIdx = (active + 1) % SLIDES.length

  return (
    <section className="relative bg-gray-950 min-h-[88vh] flex items-center justify-center overflow-hidden">

      {/* Blurred bg from active image for ambient effect */}
      <div className="absolute inset-0 scale-110">
        <Image src={SLIDES[active].image} alt="" fill className="object-cover object-top opacity-30 blur-2xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-center gap-5">

        {/* Left card */}
        <div
          onClick={prev}
          className="hidden md:block relative flex-shrink-0 w-56 h-[440px] rounded-2xl overflow-hidden cursor-pointer opacity-50 hover:opacity-65 transition-all duration-500"
          style={{ transform: 'scale(0.88) translateX(20px)' }}
        >
          <Image src={SLIDES[leftIdx].image} alt="" fill className="object-cover object-top" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>

        {/* Center card */}
        <div className="relative flex-shrink-0 w-full md:w-[500px] h-[520px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={SLIDES[active].image}
            alt={SLIDES[active].title}
            fill
            className="object-cover object-top transition-all duration-700"
            priority
          />
          {/* Gradient only at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Text content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-pink-400 text-xs font-semibold uppercase tracking-widest mb-2">
              {SLIDES[active].tag}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3 whitespace-pre-line">
              {SLIDES[active].title}
            </h1>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-xs">
              {SLIDES[active].subtext}
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-pink-600 text-white px-7 py-2.5 rounded-full font-medium hover:bg-pink-500 transition-colors text-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right card */}
        <div
          onClick={next}
          className="hidden md:block relative flex-shrink-0 w-56 h-[440px] rounded-2xl overflow-hidden cursor-pointer opacity-50 hover:opacity-65 transition-all duration-500"
          style={{ transform: 'scale(0.88) translateX(-20px)' }}
        >
          <Image src={SLIDES[rightIdx].image} alt="" fill className="object-cover object-top" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'bg-pink-500 w-8' : 'bg-white/40 w-4'}`}
          />
        ))}
      </div>
    </section>
  )
}
