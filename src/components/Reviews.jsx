export default function Reviews() {
  const reviews = [
    { name: 'Aisha K.', text: 'The glow is so soft and elegant. My husband loved it!', photo: 'https://images.unsplash.com/photo-1592621385612-4d7129426396?q=80&w=600&auto=format&fit=crop' },
    { name: 'Rahul M.', text: 'Incredible detail in the 3D print. Quick delivery too!', photo: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=600&auto=format&fit=crop' },
    { name: 'Neha S.', text: 'Perfect anniversary gift. The personalized message made it special.', photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=600&auto=format&fit=crop' },
    { name: 'Vikram P.', text: 'Looks premium on my desk. Packaging was very safe.', photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop' },
    { name: 'Simran G.', text: 'Customer support helped me choose the right size. Loved it!', photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop' },
  ]

  return (
    <section className="bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-10">Loved by Thousands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reviews.map(r => (
            <div key={r.name} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img src={r.photo} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm text-white/80">“{r.text}”</p>
                <p className="mt-2 text-white/60 text-xs">{r.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
