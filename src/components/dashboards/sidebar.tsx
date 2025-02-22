"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, FileText, Heart, History, MessageSquare, Settings, User, CircleGauge } from "lucide-react"

const routes = [
  {
    label: "Overview",
    icon: Activity,
    href: "/dashboards/overview",
    color: "text-sky-500",
  },
  {
    label: "Health Data",
    icon: Heart,
    href: "/dashboards/health-data",
    color: "text-pink-700",
  },
  {
    label: "Predictions",
    icon: FileText,
    href: "/dashboards/predictions",
    color: "text-violet-500",
  },
  {
    label: "Consultation",
    icon: MessageSquare,
    href: "/dashboards/consultation",
    color: "text-green-700",
  },
  {
    label: "History",
    icon: History,
    href: "/dashboards/history",
    color: "text-orange-700",
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboards/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboards/settings",
  },
  {
    label: "Dashboard",
    icon: CircleGauge,
    href: "/dashboards",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-50 text-gray-800">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-gray-100/50 rounded-lg transition",
                pathname === route.href ? "text-primary bg-gray-100" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

