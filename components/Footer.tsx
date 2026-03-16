import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-2">Muskaan</h3>
          <p className="text-sm">Elegance in every stitch. Your destination for beautiful ethnic wear.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-pink-400">Home</Link></li>
            <li><Link href="/catalog" className="hover:text-pink-400">Shop</Link></li>
            <li><Link href="/#about" className="hover:text-pink-400">About Us</Link></li>
            <li><Link href="/#contact" className="hover:text-pink-400">Contact</Link></li>
          </ul>
        </div>
        <div id="contact">
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>📞 +91 98982 22475</li>
            <li>📧 nareshbalwani87@gmail.in</li>
            <li>
              <a href="https://maps.app.goo.gl/kxqmnXKBxj43Yh2V9" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                📍 Shop No C, 53, Main Market Rd E, Ward 12A, Gandhidham, Gujarat 370201
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-gray-700 text-xs text-center text-gray-500">
        © {new Date().getFullYear()} Muskaan. All rights reserved.
      </div>
    </footer>
  )
}
