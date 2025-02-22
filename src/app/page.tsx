'use client';
import {
  Shield,
  Brain,
  Activity,
  TrendingUp,
  Users,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AnimatedGradientBorder } from '@/components/ui/animated-gradient-border';
import { useState } from 'react';

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className='min-h-screen bg-gray-950 relative'>
      <FloatingParticles />

      <main className='relative z-10'>
        {/* Hero Section */}
        <section className='relative py-32 overflow-hidden'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          >
            <div className='text-center'>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className='text-5xl md:text-7xl font-bold mb-6'
              >
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400'>
                  Predictive Healthcare
                </span>
                <br />
                <span className='text-white'>Powered by AI</span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12'
              >
                Transform healthcare with real-time ML-driven monitoring and
                early risk detection
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className='flex flex-col sm:flex-row justify-center gap-4'
              >
                <AnimatedGradientBorder>
                  <Button
                    asChild
                    className='w-full sm:w-auto from-neutral-300 text-lg py-6 px-8 bg-transparent hover:bg-gray-800/50'
                  >
                    <Link href='/sign-up'>
                      Get Started
                      <ChevronRight className='ml-2 h-5 w-5' />
                    </Link>
                  </Button>
                </AnimatedGradientBorder>

                <Button
                  asChild
                  variant='outline'
                  className='w-full sm:w-auto text-lg py-6 px-8'
                >
                  <Link href='/dashboards/health-data'>View Demo</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className='py-20 bg-gray-900/50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-3xl font-bold text-center text-white mb-12'
            >
              ML-Powered Features
            </motion.h2>

            <motion.div
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  index={index}
                  {...feature}
                  isHovered={hoveredFeature === index}
                  onHover={() => setHoveredFeature(index)}
                  onLeave={() => setHoveredFeature(null)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </motion.div>
        </section>
        {/* CTA Section */}
        <section className='py-20 relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10' />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative'
          >
            <h2 className='text-3xl font-bold text-white mb-6'>
              Ready to Transform Healthcare?
            </h2>
            <p className='text-gray-400 mb-8'>
              Join healthcare providers worldwide in revolutionizing patient
              care with ML-driven predictive analytics.
            </p>
            <AnimatedGradientBorder>
              <Button
                asChild
                className='text-lg py-6 px-8 bg-transparent hover:bg-gray-800/50'
              >
                <Link href='/sign-up'>
                  Start Free Trial
                  <ChevronRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
            </AnimatedGradientBorder>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  icon: any;
  title: string;
  description: string;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
    >
      <Card
        className='group relative overflow-hidden bg-gray-800/50 hover:bg-gray-800 transition-all duration-300'
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <CardContent className='p-6'>
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              transition: { duration: 0.2 },
            }}
            className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4'
          >
            <Icon className='w-6 h-6 text-white' />
          </motion.div>
          <h3 className='text-xl font-semibold text-white mb-2'>{title}</h3>
          <p className='text-gray-400'>{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className='bg-gray-800/50 hover:bg-gray-800 transition-all duration-300'>
        <CardContent className='p-6 text-center'>
          <div className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2'>
            {number}
          </div>
          <div className='text-gray-400'>{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const features = [
  {
    icon: Brain,
    title: 'ML-Driven Analysis',
    description:
      'Continuous monitoring and analysis of patient data using advanced machine learning algorithms',
  },
  {
    icon: AlertCircle,
    title: 'Early Risk Detection',
    description:
      'Identify potential health risks before they become critical using predictive analytics',
  },
  {
    icon: TrendingUp,
    title: 'Trend Forecasting',
    description:
      'Advanced pattern recognition for accurate health trend predictions',
  },
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description:
      'Continuous tracking of vital signs and health metrics with instant updates',
  },
  {
    icon: Users,
    title: 'Personalized Care',
    description:
      'Tailored health insights and recommendations based on individual patient data',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description:
      'Enterprise-grade security ensuring complete protection of sensitive health data',
  },
];

const stats = [
  {
    number: '94%',
    label: 'Early Detection Rate',
  },
  {
    number: '15min',
    label: 'Average Response Time',
  },
  {
    number: '24/7',
    label: 'Real-time Monitoring',
  },
];
