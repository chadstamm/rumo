import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Pillars } from '@/components/pillars'
import { WizardEmbedded } from '@/components/wizard/wizard-embedded'
import { Horizon } from '@/components/horizon'
import { Guide } from '@/components/guide'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Problem />
      <Pillars />
      <WizardEmbedded />
      <Horizon />
      <Guide />
      <Footer />
    </div>
  )
}
