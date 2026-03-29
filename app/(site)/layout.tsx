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

  // Define CSS variables from Sanity with sensible brand defaults
  const cssVars = {
    '--color-primary': siteConfig?.primaryColor || '#0d2a63',
    '--color-primary-hover': siteConfig?.primaryHoverColor || '#081a3d',
    '--color-background': siteConfig?.backgroundColor || '#fffdf5',
    '--color-surface': siteConfig?.surfaceColor || '#ffffff',
    '--color-text-primary': siteConfig?.textPrimary || '#0d2a63',
    '--color-text-secondary': siteConfig?.textSecondary || '#4a4a4a',
    '--color-accent': siteConfig?.accentColor || '#f7c948',
    '--color-border': siteConfig?.borderColor || '#e2e8f0',
    '--color-footer-background': siteConfig?.footerBackground || '#0d2a63',
    '--color-footer-text': siteConfig?.footerText || '#ffffff',
  } as React.CSSProperties

  return (
    <html lang="en">
      <body style={cssVars}>
        <Navbar logo={siteConfig?.logo} logoImage={siteConfig?.logoImage} links={navbar?.links} />
        {children}
      </body>
    </html>
  )
}
