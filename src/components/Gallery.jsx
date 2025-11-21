export default function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505691723518-36a5ac3b2c79?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1530023367847-a683933f417d?q=80&w=1200&auto=format&fit=crop',
  ]

  return (
    <section className="bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-10">Lifestyle Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden">
              <img src={src} alt="Lifestyle" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-amber-300/0 hover:bg-amber-300/10 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
