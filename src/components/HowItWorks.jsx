export default function HowItWorks() {
  const steps = [
    { title: 'Upload Photo', desc: 'Share your favorite memory in high resolution.' },
    { title: 'Choose Frame', desc: 'Pick design, size and glow color.' },
    { title: 'Add Text/Message', desc: 'Names, dates or heartfelt notes.' },
    { title: 'Get Delivered', desc: 'We craft and ship within 48 hours.' },
  ]

  return (
    <section className="bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-10">How Personalization Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center mb-4">{i+1}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-white/70 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
