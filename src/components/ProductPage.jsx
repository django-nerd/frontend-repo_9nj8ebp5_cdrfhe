import { useEffect, useMemo, useState } from 'react'
import { Star, ShoppingCart, Phone } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function ProductPage({ slug, onAddToCart }) {
  const [product, setProduct] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [size, setSize] = useState('')
  const [lightColor, setLightColor] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    fetch(`${BACKEND}/products/${slug}`).then(r => r.json()).then(setProduct)
  }, [slug])

  const price = useMemo(() => {
    if (!product) return 0
    const base = product.price || 0
    const disc = product.discount_percent || 0
    return Math.round(base * (1 - disc/100))
  }, [product])

  if (!product) return null

  const sizes = product.variants?.find(v => v.name.toLowerCase() === 'size')?.options || []
  const colors = product.variants?.find(v => v.name.toLowerCase().includes('light'))?.options || []

  const add = () => {
    onAddToCart({
      product_slug: product.slug,
      title: product.title,
      image: product.images?.[0],
      unit_price: price,
      quantity: qty,
      personalization: { photo_url: photo?.name || null, name, message, size, light_color: lightColor },
    })
  }

  return (
    <div className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
          <img src={product.images?.[0]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-amber-400">
            <Star size={18} fill="#fbbf24" className="text-amber-400" />
            <span className="text-white/80">{product.rating?.toFixed?.(1)}</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold">₹{price}</span>
            {product.discount_percent ? <span className="text-white/60 line-through">₹{product.price}</span> : null}
            <span className="text-emerald-400 text-sm">Inclusive of taxes</span>
          </div>

          <div className="mt-6 space-y-5">
            {sizes.length > 0 && (
              <div>
                <label className="block text-sm text-white/70 mb-2">Choose size</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} className={`px-3 py-2 rounded-xl border ${size===s? 'bg-white text-black border-white':'border-white/20 text-white/90'}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {colors.length > 0 && (
              <div>
                <label className="block text-sm text-white/70 mb-2">Choose light color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map(c => (
                    <button key={c} onClick={() => setLightColor(c)} className={`px-3 py-2 rounded-xl border ${lightColor===c? 'bg-white text-black border-white':'border-white/20 text-white/90'}`}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-white/70 mb-2">Upload Photo</label>
              <input type="file" accept="image/*" onChange={(e)=> setPhoto(e.target.files?.[0] || null)} className="block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-300" />
              {photo && (
                <p className="mt-2 text-xs text-white/60">Selected: {photo.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Add name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" placeholder="e.g. Aisha & Rohan" />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Add message</label>
                <input value={message} onChange={e=>setMessage(e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" placeholder="Forever & Always" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-white/70">Quantity</label>
              <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="w-20 rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={add} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <a href={`https://wa.me/919272171545?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(product.title)}`} target="_blank" className="px-4 py-3 rounded-xl border border-white/20 text-white flex items-center gap-2">
                <Phone size={18} /> WhatsApp Order
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <p>Shipping: Free • COD Available</p>
              <p>Delivery Estimate: 3-6 days</p>
              <p className="mt-2">Features: Soft LED glow, premium materials, handcrafted finish</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
