import { getPageBySlug } from '@/lib/sanity'

/**
 * Root page / home
 * Shows welcome page or home content
 */
export default async function Home() {
  let homePage = null

  try {
    homePage = await getPageBySlug('home')
  } catch (error) {
    console.log('[Home] Failed to fetch home page, using fallback')
  }

  // If home page exists in Sanity, render it directly
  if (homePage) {
    const { getSectionComponent } = await import('@/lib/sections/registry')
    const allSections = homePage.sections || []
    const footerSection = allSections.find((s: any) => s._type === 'footerSection')
    const regularSections = allSections.filter((s: any) => s._type !== 'footerSection')

    return (
      <main>
        {regularSections.length > 0 ? (
          regularSections.map((section: any, idx: number) => {
            const Component = getSectionComponent(section._type)
            if (!Component) return null
            return <Component key={section._key || idx} {...section} />
          })
        ) : null}
        {footerSection && (() => {
          const { getSectionComponent } = require('@/lib/sections/registry')
          const FooterComponent = getSectionComponent(footerSection._type)
          if (FooterComponent) return <FooterComponent key={footerSection._key || 'footer'} {...footerSection} />
          return null
        })()}
      </main>
    )
  }

  // Fallback welcome message if no home page found
  return (
    <main style={{ padding: '40px', textAlign: 'center', minHeight: '100vh' }}>
      <h1>Welcome to Your Remixable Template</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '20px auto' }}>
        This is a section-based website template powered by Sanity CMS.
      </p>
      <p>
        <a
          href="/admin"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-background)',
            padding: '12px 30px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Manage Content in Sanity
        </a>
      </p>
      <p style={{ marginTop: '40px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        Create a page with slug "home" in Sanity to get started.
      </p>
    </main>
  )
}
