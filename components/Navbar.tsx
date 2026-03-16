'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) router.push(`/catalog?search=${search.trim()}`)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/">
          <Image src="/logo.jpg" alt="Muskaan" width={114} height={50} className="object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <Link href="/catalog" className="hover:text-pink-600">Shop</Link>
          <Link href="/#about" className="hover:text-pink-600">About</Link>
          <Link href="/#contact" className="hover:text-pink-600">Contact</Link>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex items-center border rounded-full px-3 py-1 gap-2 text-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or code..."
            className="outline-none w-48"
          />
          <button type="submit"><Search size={16} className="text-gray-500" /></button>
        </form>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium text-gray-700 bg-white">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/catalog" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/#about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>Contact</Link>
          <form onSubmit={handleSearch} className="flex items-center border rounded-full px-3 py-1 gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="outline-none flex-1"
            />
            <button type="submit"><Search size={16} /></button>
          </form>
        </div>
      )}
    </nav>
  )
}
