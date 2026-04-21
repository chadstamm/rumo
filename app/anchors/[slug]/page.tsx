import { notFound } from 'next/navigation'
import { DOCUMENTS, getDocumentBySlug } from '@/data/documents'
import { DocumentWizard } from '@/components/wizard/document-wizard'
import { AnchorPaywall } from '@/components/anchor-paywall'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const FREE_ANCHORS = new Set(['constitution'])

export function generateStaticParams() {
  return DOCUMENTS.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDocumentBySlug(slug)
  if (!doc) return { title: 'Not Found' }

  return {
    title: `${doc.title} — RUMO`,
    description: doc.description,
  }
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDocumentBySlug(slug)
  if (!doc) notFound()

  if (FREE_ANCHORS.has(slug)) {
    return <DocumentWizard config={doc} />
  }

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

  if (!isSubscribed) {
    return <AnchorPaywall doc={doc} authed={Boolean(user)} />
  }

  return <DocumentWizard config={doc} />
}
