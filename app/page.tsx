import { getPageBySlug } from '@/lib/sanity'
import { redirect } from 'next/navigation'

/**
 * Root page / home
 * Redirects to the "home" page slug or shows welcome
 */
export default async function Home() {
  // Try to fetch the "home" page
  const homePage = await getPageBySlug('home')

  if (homePage) {
    redirect('/DC-John/home')
  }

  // Fallback welcome message
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
