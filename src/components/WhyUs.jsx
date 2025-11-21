import { ShieldCheck, Truck, Sparkles, Package } from 'lucide-react'

const features = [
  { icon: ShieldCheck, title: 'Premium Quality', desc: 'Handcrafted with crystal-clear acrylic, solid wood & grade-A LEDs.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Ships in 48 hours. Pan-India delivery with live tracking.' },
  { icon: Sparkles, title: 'Free Personalization', desc: 'Add names, messages & light colors at no extra cost.' },
  { icon: Package, title: 'Safe Packaging', desc: 'Shock-proof, water-resistant packaging for safe arrival.' },
]

export default function WhyUs() {
  return (
    <section className="bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Icon className="text-amber-400 mb-4" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-white/70 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
