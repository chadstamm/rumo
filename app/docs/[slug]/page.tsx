import { notFound } from 'next/navigation'
import { DOCUMENTS, getDocumentBySlug } from '@/data/documents'
import { DocumentWizard } from '@/components/wizard/document-wizard'

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

  return <DocumentWizard config={doc} />
}
