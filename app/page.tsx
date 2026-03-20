import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Pillars } from '@/components/pillars'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Problem />
      <Pillars />
    </div>
  )
}
