import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="font-mono">Built with React · Three.js · Framer Motion</p>
      </div>
    </footer>
  )
}
