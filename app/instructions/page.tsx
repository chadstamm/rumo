import { InstructionsProvider } from '@/context/instructions-context'
import { InstructionsWizard } from '@/components/instructions/InstructionsWizard'

export const metadata = {
  title: 'Custom AI Instructions — RUMO',
  description: 'Generate personalized custom instructions for ChatGPT, Claude, Gemini, and Perplexity. Free.',
}

export default function InstructionsPage() {
  return (
    <InstructionsProvider>
      <InstructionsWizard />
    </InstructionsProvider>
  )
}
