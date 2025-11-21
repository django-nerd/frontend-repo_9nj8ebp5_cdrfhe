import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero({ onPrimaryCTAClick, onSecondaryCTAClick }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/80 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-28 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-sm/0"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 mb-6">
            Handmade • Free Personalization • Ships in 48h
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
            Your Memories, Made Into Art.
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-white/80 text-lg">
            Handmade personalized LED frames crafted for your special moments.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onPrimaryCTAClick} className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:shadow-[0_10px_40px_rgba(251,191,36,0.45)] transition-shadow">
              Shop Frames
            </button>
            <button onClick={onSecondaryCTAClick} className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition">
              Create Your Custom Gift
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
