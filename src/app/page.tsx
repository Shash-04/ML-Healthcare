import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, Brain, Heart, Shield } from "lucide-react"
import Footer from "@/components/ui/Footer"
import Navbar from "@/components/ui/navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Predictive Health Monitoring
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Advanced ML-powered health monitoring system for early risk detection and personalized care
                  recommendations.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary rounded-full">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Health Monitoring</h3>
                <p className="text-center text-gray-500">Real-time tracking of vital signs and health metrics</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary rounded-full">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">ML Predictions</h3>
                <p className="text-center text-gray-500">Advanced algorithms for early risk detection</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary rounded-full">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Health Insights</h3>
                <p className="text-center text-gray-500">Detailed analysis and personalized recommendations</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary rounded-full">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Secure Platform</h3>
                <p className="text-center text-gray-500">Enterprise-grade security for your health data</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

