'use client'

import { useMemo, useState } from 'react'
import { urlForImage } from '@/lib/sanity'

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  logo?: string
  logoImage?: any
  links?: NavLink[]
}

const defaultLinks: NavLink[] = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar({ logo, logoImage, links }: NavbarProps) {
  const logoImageUrl = logoImage ? urlForImage(logoImage).width(520).fit('max').auto('format').url() : null
  const logoAlt = logoImage?.alt || logo || 'Logo'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = useMemo(() => {
    const provided = Array.isArray(links) ? links.filter((item) => item?.label && item?.href) : []
    const byHref = new Map<string, NavLink>()

    // Default links guarantee section navigation works even if CMS navbar is incomplete.
    defaultLinks.forEach((item) => byHref.set(item.href, item))
    provided.forEach((item) => byHref.set(item.href, item))

    return Array.from(byHref.values())
  }, [links])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              alt={logoAlt}
              style={{
                height: 'auto',
                width: 'min(340px, 68vw)',
                maxHeight: '72px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          ) : (
            logo || 'Logo'
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'var(--color-text-primary)',
            fontSize: '1.1rem',
            padding: '6px 10px',
            cursor: 'pointer',
          }}
          className="navbar-menu-toggle"
        >
          {isMenuOpen ? 'X' : 'Menu'}
        </button>

        {/* Navigation Links */}
        {navLinks.length > 0 && (
          <ul
            className={`navbar-links ${isMenuOpen ? 'open' : ''}`}
            style={{
              display: 'flex',
              gap: '30px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  style={{
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 980px) {
          .navbar-menu-toggle {
            display: inline-block !important;
          }

          .navbar-links {
            position: absolute;
            left: 0;
            right: 0;
            top: calc(100% + 1px);
            background: var(--color-background);
            border-top: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
            box-shadow: 0 8px 18px rgba(13, 42, 99, 0.12);
            flex-direction: column;
            gap: 0;
            padding: 10px 20px;
            display: none !important;
          }

          .navbar-links.open {
            display: flex !important;
          }

          .navbar-links li a {
            display: block;
            padding: 12px 0;
            border-bottom: 1px solid rgba(13, 42, 99, 0.08);
          }

          .navbar-links li:last-child a {
            border-bottom: none;
          }
        }
      `}</style>
    </nav>
  )
}
