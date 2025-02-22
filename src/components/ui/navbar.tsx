"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HeartPulse } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-teal-300">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <HeartPulse className="h-8 w-7 text-primary" />
          <span className="font-bold text-2xl">HealthMonitor</span>
        </Link>

        <div className="ml-auto  flex items-center gap-4">
          {pathname === "/" ? (
            <>
              <Button variant="ghost" asChild className="text-xl">
                <Link href="/login" >Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup" className="text-lg">Sign Up</Link>
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

