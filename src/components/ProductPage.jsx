import { useEffect, useMemo, useState } from 'react'
import { Star, ShoppingCart, Phone, Check, Package, Info, Truck, HelpCircle, ListChecks } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

const TABS = [
  { key: 'description', label: 'Description', icon: Info },
  { key: 'features', label: 'Features', icon: Check },
  { key: 'specs', label: 'Specifications', icon: ListChecks },
  { key: 'whats_in_box', label: "What's in the box", icon: Package },
  { key: 'care', label: 'Care', icon: HelpCircle },
  { key: 'shipping', label: 'Shipping', icon: Truck },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle },
  { key: 'how_to_order', label: 'How to order', icon: ListChecks },
]

export default function ProductPage({ slug, onAddToCart }) {
  const [product, setProduct] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [size, setSize] = useState('')
  const [lightColor, setLightColor] = useState('')
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setProduct(null)
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

  const handleFile = async (file) => {
    setPhoto(file)
    setPhotoUrl(null)
    if (!file) return
    try {
      setUploading(true)
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${BACKEND}/upload`, { method: 'POST', body: form })
      const data = await res.json()
      setPhotoUrl(data.url)
    } catch (e) {
      // fallback to local filename if upload fails
      setPhotoUrl(file.name)
    } finally {
      setUploading(false)
    }
  }

  const add = () => {
    onAddToCart({
      product_slug: product.slug,
      title: product.title,
      image: product.images?.[0],
      unit_price: price,
      quantity: qty,
      personalization: { photo_url: photoUrl || photo?.name || null, name, message, size, light_color: lightColor },
    })
  }

  const renderTabContent = () => {
    const sectionStyle = 'space-y-3 text-white/80'
    switch (activeTab) {
      case 'description':
        return (
          <div className={sectionStyle}>
            <p>{product.description || product?.description_long || 'Premium handcrafted personalized gift.'}</p>
            {Array.isArray(product.features) && product.features.length > 0 && (
              <ul className="list-disc pl-5">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        )
      case 'features':
        return (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
            {(product.features || []).map((f, i) => (
              <li key={i} className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-1" /> <span>{f}</span></li>
            ))}
          </ul>
        )
      case 'specs':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(product.specs || []).map((s, i) => (
              <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between">
                <span className="text-white/60">{s.label}</span>
                <span className="text-white">{s.value}</span>
              </div>
            ))}
          </div>
        )
      case 'whats_in_box':
        return (
          <ul className="list-disc pl-5 text-white/80">
            {(product.whats_in_box || []).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        )
      case 'care':
        return (
          <ul className="list-disc pl-5 text-white/80">
            {(product.care || []).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        )
      case 'faqs':
        return (
          <div className="space-y-3">
            {(product.faqs || []).map((f, i) => (
              <details key={i} className="rounded-xl bg-white/5 border border-white/10 p-3">
                <summary className="cursor-pointer text-white">Q. {f.q}</summary>
                <p className="mt-2 text-white/80">{f.a}</p>
              </details>
            ))}
            {(!product.faqs || product.faqs.length === 0) && <p className="text-white/60">No FAQs available.</p>}
          </div>
        )
      case 'shipping':
        return <p className="text-white/80">{product.shipping || 'Free shipping across India. COD available.'}</p>
      case 'how_to_order':
        return (
          <ol className="list-decimal pl-5 text-white/80 space-y-1">
            {(product.how_to_order || ['Choose options', 'Upload photo / add text', 'Add to cart and checkout']).map((x, i) => <li key={i}>{x}</li>)}
          </ol>
        )
      default:
        return null
    }
  }

  const availableTabs = TABS.filter(t => {
    if (t.key === 'description') return true
    return product[t.key] && ((Array.isArray(product[t.key]) && product[t.key].length) || typeof product[t.key] === 'string')
  })

  return (
    <div className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <img src={product.images?.[0]} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {product.images?.[1] && (
            <div className="grid grid-cols-2 gap-3">
              <img src={product.images?.[1]} alt={product.title + ' alt image'} className="rounded-2xl border border-white/10 object-cover" />
              {product.images?.[2] ? (
                <img src={product.images?.[2]} alt={product.title + ' image 3'} className="rounded-2xl border border-white/10 object-cover" />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white/60">Premium Quality</div>
              )}
            </div>
          )}
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
              <input type="file" accept="image/*" onChange={(e)=> handleFile(e.target.files?.[0] || null)} className="block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-300" />
              {photo && (
                <p className="mt-2 text-xs text-white/60">Selected: {photo.name} {uploading ? '(uploading...)' : photoUrl ? '✓ uploaded' : ''}</p>
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

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {availableTabs.map(t => {
                  const Icon = t.icon
                  const active = activeTab === t.key
                  return (
                    <button key={t.key} onClick={()=>setActiveTab(t.key)} className={`whitespace-nowrap px-3 py-2 rounded-xl border text-sm flex items-center gap-2 ${active ? 'bg-white text-black border-white' : 'border-white/15 text-white/80 bg-white/5'}`}>
                      <Icon size={16} /> {t.label}
                    </button>
                  )
                })}
              </div>
              <div className="mt-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
