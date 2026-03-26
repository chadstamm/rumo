import { WizardProvider } from '@/context/wizard-context'
import { WizardShell } from '@/components/wizard/wizard-shell'

export const metadata = {
  title: 'Full Build — RUMO',
  description: 'Build your complete context anchor library. Identity, voice, stories, timeline, and roster — everything your AI agent needs to know you.',
}

export default function StartPage() {
  return (
    <WizardProvider>
      <WizardShell />
    </WizardProvider>
  )
}
