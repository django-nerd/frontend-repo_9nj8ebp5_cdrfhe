import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function ProductGrid({ onCustomize }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${BACKEND}/products`).then(r => r.json()).then(d => setProducts(d))
      .catch(() => setProducts([]))
  }, [])

  return (
    <section className="bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl">Featured Frames</h2>
          <p className="text-white/60">Premium picks, handcrafted and ready to personalize</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p._id} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {p.badges?.map(b => (
                    <span key={b} className="px-2 py-1 text-xs rounded-full bg-amber-400 text-black font-medium shadow">{b}</span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                <div className="flex items-center gap-2 text-amber-400">
                  <Star size={16} fill="#fbbf24" className="text-amber-400" />
                  <span className="text-sm text-white/80">{p.rating?.toFixed?.(1) || '4.9'}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl font-bold">₹{Math.round(p.price * (1 - (p.discount_percent||0)/100))}</span>
                  {p.discount_percent ? <span className="text-white/50 line-through text-sm">₹{p.price}</span> : null}
                </div>
                <button onClick={() => onCustomize(p)} className="mt-4 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:shadow-[0_10px_30px_rgba(251,191,36,0.35)] transition">
                  Customize Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
