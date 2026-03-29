import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Overview } from '@/components/overview'
import { Pillars } from '@/components/pillars'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      <Hero />
      <Problem />
      <Overview />
      <Pillars />
      <Footer />
    </div>
  )
}
