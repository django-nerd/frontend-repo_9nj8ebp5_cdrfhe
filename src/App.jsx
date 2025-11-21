import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import WhyUs from './components/WhyUs'
import HowItWorks from './components/HowItWorks'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import OfferBanner from './components/OfferBanner'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import CartDrawer from './components/CartDrawer'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [view, setView] = useState('home')
  const [selected, setSelected] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    // Seed products on first load
    fetch(`${BACKEND}/seed`, { method: 'POST' }).catch(()=>{})
  }, [])

  const onCustomize = (p) => {
    setSelected(p)
    setView('product')
  }

  const addToCart = (item) => {
    setCart(c => [...c, item])
    setCartOpen(true)
  }

  const checkout = async (total, discount) => {
    const order = {
      items: cart.map(it => ({
        product_slug: it.product_slug,
        quantity: it.quantity,
        unit_price: it.unit_price,
        personalization: it.personalization || null
      })),
      subtotal: cart.reduce((s, it) => s + it.unit_price * it.quantity, 0),
      discount,
      shipping: 0,
      total,
      payment_method: 'COD'
    }
    try {
      const res = await fetch(`${BACKEND}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
      const data = await res.json()
      alert(`Order placed! ID: ${data.order_id}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert('Failed to place order')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-300 to-yellow-400" />
            <span className="font-serif text-lg">SurpriseSoul</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>setCartOpen(true)} className="px-4 py-2 rounded-xl bg-white/10 border border-white/15">Cart ({cart.length})</button>
          </div>
        </div>
      </header>

      {view === 'home' && (
        <>
          <Hero onPrimaryCTAClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} onSecondaryCTAClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} />
          <div id="products"><ProductGrid onCustomize={onCustomize} /></div>
          <WhyUs />
          <HowItWorks />
          <Reviews />
          <Gallery />
          <OfferBanner />
          <Footer />
        </>
      )}

      {view === 'product' && selected && (
        <>
          <ProductPage slug={selected.slug} onAddToCart={addToCart} />
          <Footer />
        </>
      )}

      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={cart} onCheckout={checkout} />
    </div>
  )
}

export default App
