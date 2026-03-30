import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Overview } from '@/components/overview'
import { Pillars } from '@/components/pillars'
import { Transformation } from '@/components/transformation'
import { CTASection } from '@/components/cta-section'
import { ScrollToTop } from '@/components/scroll-to-top'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      <Hero />
      <Problem />
      <Overview />
      <Pillars />
      <Transformation />
      <CTASection />
    </div>
  )
}
