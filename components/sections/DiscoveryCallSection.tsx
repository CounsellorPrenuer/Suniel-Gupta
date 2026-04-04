'use client'

import { SectionProps } from '@/lib/sections/registry'
import { renderRichText } from '@/lib/richText'
import { urlForImage } from '@/lib/sanity'

export function DiscoveryCallSection({ title, description, ctaText, ctaLink, id, backgroundImage }: SectionProps) {
  const defaultDescription = 'A complimentary 15 minute discovery session where individuals can discuss their challenges and explore how coaching can help them move forward.'
  
  const bgUrl = backgroundImage ? urlForImage(backgroundImage).width(1920).height(1080).url() : null

  return (
    <section 
      id={id || 'discovery-call'} 
      style={{ 
        backgroundColor: 'var(--color-primary)', 
        color: 'var(--color-secondary)',
        backgroundImage: bgUrl ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        padding: '100px 0'
      }}
    >
      <div className="section-container text-center" style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', fontSize: '3rem' }}>{title || 'Start With a Discovery Call'}</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto 2.5rem', fontSize: '1.3rem', opacity: 0.95 }}>
          {renderRichText(description || defaultDescription, 'center', 'var(--color-secondary)')}
        </div>
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '1rem' 
          }}
        >
          <a 
            href={ctaLink || '#contact'} 
            style={{ 
              padding: '18px 45px', 
              fontSize: '1.2rem',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-primary)',
              borderRadius: '99px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(247, 201, 72, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(247, 201, 72, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 201, 72, 0.4)'
            }}
          >
            {ctaText || 'Book a Discovery Call'}
          </a>
        </div>
      </div>
    </section>
  )
}
