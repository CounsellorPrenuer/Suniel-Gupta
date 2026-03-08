import { getPageBySlug, getAllPageSlugs } from '@/lib/sanity'
import { getSectionComponent, SectionProps } from '@/lib/sections/registry'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageParams {
  slug: string
}

/**
 * Dynamic page renderer
 * Fetches page data from Sanity and renders sections using the registry
 */
export default async function Page({ params }: { params: PageParams }) {
  let page = null

  try {
    // Add 5-second timeout for Sanity fetch
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    page = await Promise.race([getPageBySlug(params.slug), timeoutPromise])
  } catch (error) {
    console.log(`[Page ${params.slug}] Fetch failed:`, error)
  }

  if (!page) {
    notFound()
  }

  // Log fetched sections for debugging
  console.log(`[Page: ${params.slug}] Fetched ${page.sections?.length || 0} sections:`,
    page.sections?.map((s: any) => s._type) || [])

  // Separate footer from other sections to ensure it renders last
  const allSections = page.sections || []
  const footerSection = allSections.find((s: SectionProps) => s._type === 'footerSection')
  const regularSections = allSections.filter((s: SectionProps) => s._type !== 'footerSection')

  return (
    <main>
      {/* Render regular sections first */}
      {regularSections.length > 0 ? (
        regularSections.map((section: SectionProps, idx: number) => {
          const Component = getSectionComponent(section._type)

          if (!Component) {
            console.error(`[RENDERING ERROR] No component found for section type: ${section._type}`)
            // Render error placeholder in development
            return (
              <div key={section._key || idx} style={{
                padding: '20px',
                margin: '20px',
                backgroundColor: 'var(--color-surface)',
                border: '2px solid var(--color-primary)',
                borderRadius: '4px'
              }}>
                <p style={{ margin: 0, color: 'var(--color-text-primary)' }}>
                  ⚠️ Missing component for section type: <strong>{section._type}</strong>
                </p>
              </div>
            )
          }

          console.log(`[Rendering] ${section._type}`)
          return <Component key={section._key || idx} {...section} />
        })
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          <p>No sections added to this page yet.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '10px' }}>
            Add sections to this page in Sanity Studio.
          </p>
        </div>
      )}

      {/* Render footer last, if it exists */}
      {footerSection && (() => {
        const FooterComponent = getSectionComponent(footerSection._type)
        if (FooterComponent) {
          console.log(`[Rendering Footer Last] ${footerSection._type}`)
          return <FooterComponent key={footerSection._key || 'footer'} {...footerSection} />
        }
        return null
      })()}
    </main>
  )
}

/**
 * Generate static params for all pages at build time
 * For static export without Sanity, return empty array
 */
export async function generateStaticParams() {
  try {
    const pages = await getAllPageSlugs()
    if (!pages || pages.length === 0) {
      return [{ slug: '_empty' }]
    }
    return pages.map((page: any) => ({
      slug: page.slug,
    }))
  } catch (error) {
    console.log('[generateStaticParams] Sanity unreachable, returning fallback params')
    // Next.js export requires at least one param, or dynamicParams = false
    return [{ slug: '_empty' }]
  }
}

export const dynamicParams = false;

