import Link from 'next/link'
import { Home, MessageSquare, BarChart2 } from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/dashboard/analysis', icon: BarChart2, label: 'Analysis' },
]

export default function Navbar() {
  return (
    <nav className="w-16 bg-secondary flex flex-col items-center py-4 space-y-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <item.icon className="h-6 w-6" />
          <span className="sr-only">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

