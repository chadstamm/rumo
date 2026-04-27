import { ChartYourCourseClient } from './chart-your-course-client'
import { DocumentWizard } from '@/components/wizard/document-wizard'
import { FULL_BUILD_CONFIG } from './full-build-config'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Chart Your Course — RUMO',
  description: 'Build all six context anchors in one session. Identity, voice, stories, situation, timeline, and roster — everything your AI needs to know you.',
}

export default async function ChartYourCoursePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isSubscribed = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_expires_at')
      .eq('id', user.id)
      .maybeSingle()

    isSubscribed =
      profile?.subscription_status === 'active' &&
      (!profile?.subscription_expires_at ||
        new Date(profile.subscription_expires_at) > new Date())
  }

  if (isSubscribed) {
    return (
      <main className="min-h-screen">
        <DocumentWizard config={FULL_BUILD_CONFIG} />
      </main>
    )
  }

  return <ChartYourCourseClient />
}
