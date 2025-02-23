import type React from "react"
import Sidebar from "@/components/dashboards/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <div>
      <main className="md:pl-72">{children}</main>
    </div>
  )
}
