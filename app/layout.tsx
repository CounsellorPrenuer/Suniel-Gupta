import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { getNavbar, getSiteConfig } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Remixable Template',
  description: 'A reusable section-based website template powered by Sanity CMS',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navbar = null
  let siteConfig = null

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 3000)
    )
    navbar = await Promise.race([getNavbar(), timeoutPromise])
  } catch (error) {
    console.log('[Layout] Navbar fetch failed, using defaults')
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 3000)
    )
    siteConfig = await Promise.race([getSiteConfig(), timeoutPromise])
  } catch (error) {
    console.log('[Layout] SiteConfig fetch failed, using defaults')
  }

  // Define CSS variables from Sanity with sensible defaults
  const cssVars = {
    '--color-primary': siteConfig?.primaryColor || '#667eea',
    '--color-primary-hover': siteConfig?.primaryHoverColor || '#5568d3',
    '--color-background': siteConfig?.backgroundColor || '#ffffff',
    '--color-surface': siteConfig?.surfaceColor || '#f8f9fa',
    '--color-text-primary': siteConfig?.textPrimary || '#333333',
    '--color-text-secondary': siteConfig?.textSecondary || '#666666',
    '--color-border': siteConfig?.borderColor || '#e0e0e0',
    '--color-footer-background': siteConfig?.footerBackground || '#1a1a1a',
    '--color-footer-text': siteConfig?.footerText || '#ffffff',
  } as React.CSSProperties

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          ...cssVars
        }}
      >
        <Navbar logo={siteConfig?.logo} logoImage={siteConfig?.logoImage} links={navbar?.links} />
        {children}
      </body>
    </html>
  )
}
