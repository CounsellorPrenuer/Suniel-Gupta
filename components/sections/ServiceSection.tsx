'use client'

import React from 'react'
import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { renderRichText } from '@/lib/richText'

const DARK_BLUE = 'var(--color-primary)'
const PEARL_WHITE = 'var(--color-secondary)'
const SUNNY_YELLOW = 'var(--color-accent)'

function ServiceCard({ service }: { service: any }) {
  const hasImageIcon = !!service.icon && typeof service.icon === 'object' && !!service.icon.asset
  const iconUrl = hasImageIcon
    ? urlForImage(service.icon).width(900).height(600).fit('max').ignoreImageParams().url()
    : null
  const emojiIcon = typeof service.icon === 'string' ? service.icon : null
  const iconAlt = service.icon?.alt || service.serviceName || 'Service icon'

  return (
    <div
      style={{
        backgroundColor: PEARL_WHITE,
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(13, 42, 99, 0.08)',
        border: `1px solid ${SUNNY_YELLOW}`,
        width: '100%',
        maxWidth: '400px',
        textAlign: 'left',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Constant size
      }}
    >
      {iconUrl && (
        <div
          style={{
            marginBottom: '20px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            border: '1px solid #d9d9d9',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={iconUrl}
            alt={iconAlt}
            width={900}
            height={600}
            style={{
              maxWidth: '100%',
              width: '100%',
              maxHeight: '240px',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      )}
      {!iconUrl && emojiIcon && (
        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{emojiIcon}</div>
      )}
      {service.serviceName && (
        <h3
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.2rem',
            marginBottom: '1rem',
            color: 'var(--color-primary)',
            lineHeight: 1.3,
            fontWeight: 800,
            paddingBottom: '0.5rem',
            borderBottom: `2px solid var(--color-accent)`,
          }}
        >
          {service.serviceName}
        </h3>
      )}
      
      {service.serviceDescription && (
        <div style={{ 
          marginBottom: '1.5rem', 
          color: 'var(--color-text-secondary)', 
          fontSize: '0.95rem',
          flex: 1, // Allow this area to grow but stay constrained
          lineHeight: 1.6
        }}>
          {renderRichText(service.serviceDescription)}
        </div>
      )}


      {(service.targetAudience || service.duration) && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem', 
          fontSize: '0.8rem', 
          color: 'var(--color-text-primary)',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-border)',
          opacity: 0.8
        }}>
          {service.targetAudience && (
            <div>
              <strong>Audience:</strong> <div>{service.targetAudience}</div>
            </div>
          )}
          {service.duration && (
            <div>
              <strong>Duration:</strong> <div>{service.duration}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ServiceSection({ title, description, services, id }: SectionProps) {
  return (
    <section
      id={id}
      className="service-section"
      style={{
        padding: '80px 20px',
        backgroundColor: '#f5f8ff',
        color: DARK_BLUE,
      }}
    >
      <div style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', padding: '60px 0' }}>
        {title && (
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1.6rem',
              marginBottom: '20px',
              textAlign: 'center',
              color: DARK_BLUE,
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h2>
        )}
        {description && (
          <div style={{ 
            fontFamily: "'Source Serif 4', serif", 
            fontSize: '0.95rem',
            marginBottom: '50px', 
            maxWidth: '800px', 
            marginLeft: 'auto', 
            marginRight: 'auto', 
            color: '#4a4a4a',
            lineHeight: 1.6
          }}>
            {renderRichText(description, 'center')}
          </div>
        )}

        {services && services.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              justifyContent: 'center',
              alignItems: 'stretch', // Ensure children stretch to fill height
            }}
          >
            {services.map((service: any, idx: number) => {
              return <ServiceCard key={service._id || idx} service={service} />
            })}
          </div>
        )}
      </div>
    </section>
  )
}
