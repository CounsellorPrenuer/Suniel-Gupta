'use client'

import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { renderRichText } from '@/lib/richText'

interface HeroProps {
  brandName?: string
  tagline?: string
  subTagline?: string
  description?: string
  stats?: Array<{ value: string; label: string }>
  heading?: string // fallback
  subheading?: any // fallback
  backgroundImage?: any
  cta?: { text: string; link: string }
}

export function HeroSection({ 
  brandName, 
  tagline, 
  subTagline, 
  description, 
  stats, 
  heading, 
  subheading, 
  backgroundImage, 
  cta 
}: HeroProps) {
  const bgImageUrl = backgroundImage ? urlForImage(backgroundImage).width(1920).height(800).url() : undefined

  return (
    <section
      className="hero-section"
      style={{
        backgroundColor: '#ffffff', // Minimal clean layout: White background
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0d2a63', // Dark Blue as primary
        textAlign: 'center',
        padding: '80px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '900px', // Slightly narrower for better readability
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Brand Name - Top */}
        <div 
          style={{ 
            fontFamily: "'Outfit', sans-serif", // Headings -> Sans Serif
            fontSize: '1.2rem', // Reduced size
            fontWeight: 700,
            color: '#0d2a63',
            marginBottom: '2rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          {brandName || 'Coach Suniel'}
        </div>

        {/* Primary Button - CTA (Visible above the fold) */}
        {cta?.text && (
          <div style={{ marginBottom: '3rem' }}>
            <a
              href={cta.link || '#discovery-call'}
              className="btn"
              style={{
                backgroundColor: '#f7c948', // Yellow as accent
                color: '#0d2a63', // Dark Blue text
                fontSize: '1rem', // Reduced size (was 1.3rem)
                padding: '0.8rem 2.2rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 4px 14px rgba(247, 201, 72, 0.4)',
                display: 'inline-block'
              }}
            >
              {cta.text}
            </a>
          </div>
        )}

        {/* Tagline */}
        {(tagline || heading) && (
          <h1 
            style={{ 
              fontFamily: "'Outfit', sans-serif", // Headings -> Sans Serif
              fontSize: 'clamp(2rem, 5vw, 3rem)', // Reduced size (was 4.5rem max)
              marginBottom: '1rem', 
              lineHeight: 1.2, 
              fontWeight: 800, 
              color: '#0d2a63'
            }}
          >
            {tagline || heading}
          </h1>
        )}

        {/* Sub Tagline */}
        {(subTagline || subheading) && (
          <div 
            style={{ 
              fontFamily: "'Outfit', sans-serif", 
              fontSize: '1.1rem', // Reduced size (was 1.8rem approx)
              fontWeight: 600,
              color: '#1f355f',
              marginBottom: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto 1.5rem'
            }}
          >
            {subTagline || (typeof subheading === 'string' ? subheading : '')}
          </div>
        )}

        {/* Description */}
        {description && (
          <div 
            style={{ 
              fontFamily: "'Source Serif 4', serif", // Text -> Serif
              fontSize: '1.05rem', // Reduced size
              lineHeight: 1.6,
              color: '#4a4a4a', 
              marginBottom: '2.5rem',
              maxWidth: '700px',
              margin: '0 auto 2.5rem'
            }}
          >
            {renderRichText(description, 'center')}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '3rem',
              flexWrap: 'wrap',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #eef2f6'
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontFamily: "'Outfit', sans-serif", 
                    fontSize: '1.5rem', 
                    fontWeight: 800, 
                    color: '#0d2a63' 
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  style={{ 
                    fontFamily: "'Source Serif 4', serif", 
                    fontSize: '0.9rem', 
                    color: '#4a4a4a',
                    marginTop: '0.2rem'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
