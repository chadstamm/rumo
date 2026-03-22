import { WizardProvider } from '@/context/wizard-context'
import { WizardShell } from '@/components/wizard/wizard-shell'

export const metadata = {
  title: 'The Path — RUMO',
  description: 'Build your personal AI foundation. Identity, voice, and stories — all in one journey.',
}

export default function StartPage() {
  return (
    <WizardProvider>
      <WizardShell />
    </WizardProvider>
  )
}
