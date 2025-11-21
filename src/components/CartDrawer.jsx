import { X } from 'lucide-react'

export default function CartDrawer({ open, onClose, items, onCheckout }) {
  const subtotal = items.reduce((s, it) => s + it.unit_price * it.quantity, 0)
  const discount = items.length >= 2 ? Math.round(subtotal * 0.2) : 0
  const total = subtotal - discount

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/60 transition ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-neutral-950 border-l border-white/10 text-white transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h3 className="font-semibold">Your Cart</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X /></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 && <p className="text-white/60 text-sm">Your cart is empty.</p>}
          {items.map((it, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <img src={it.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{it.title}</p>
                <p className="text-xs text-white/60">Qty {it.quantity}</p>
                {it.personalization?.name && <p className="text-xs text-white/60">Name: {it.personalization.name}</p>}
              </div>
              <div className="font-semibold">₹{it.unit_price * it.quantity}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex justify-between text-sm text-white/70"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between text-sm text-emerald-400"><span>Discount</span><span>-₹{discount}</span></div>
          <div className="flex justify-between text-lg font-semibold mt-2"><span>Total</span><span>₹{total}</span></div>
          <button onClick={() => onCheckout(total, discount)} className="mt-4 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold">Checkout</button>
        </div>
      </div>
    </div>
  )
}
