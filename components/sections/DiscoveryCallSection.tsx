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
        <a href={ctaLink || '#contact'} className="btn btn-accent" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
          {ctaText || 'Book a Discovery Call'}
        </a>
      </div>
    </section>
  )
}
