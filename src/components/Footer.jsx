export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="font-serif text-xl mb-3">About</h4>
          <p className="text-white/70 text-sm">We craft personalized LED frames, 3D printed keepsakes and heartfelt gifts that turn your memories into glowing art.</p>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-3">Policies</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-xl mb-3">Support</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>WhatsApp: +91 92721 71545</li>
            <li>Email: contactsurprisesoul@gmail.com</li>
            <li>Phone: +91 92721 71545</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-white/50 text-xs">© {new Date().getFullYear()} SurpriseSoul</div>
    </footer>
  )
}
