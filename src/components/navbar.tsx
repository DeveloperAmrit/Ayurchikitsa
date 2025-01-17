import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          ViralReel AI
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <Link
            href={"/#hero"}
            className="text-sm font-medium text-white bg-black rounded-lg px-4 py-2 transition-colors hover:bg-gray-800 "
          >
            Get Access
          </Link>
        </nav>
      </div>
    </header>
  )
}

