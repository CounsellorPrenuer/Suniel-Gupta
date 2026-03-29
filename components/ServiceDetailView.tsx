'use client'

import React from 'react'
import { renderRichText } from '@/lib/richText'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'

interface ServiceDetailProps {
  title: string
  description: any
  keyBenefits?: string[]
  targetAudience?: string
  duration?: string
  format?: string
  image?: any
}

export function ServiceDetailView({
  title,
  description,
  keyBenefits,
  targetAudience,
  duration,
  format,
  image
}: ServiceDetailProps) {
  const imageUrl = image ? urlForImage(image).width(1200).height(600).url() : null

  return (
    <article style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header / Hero */}
      <header style={{ backgroundColor: '#f5f8ff', padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            color: '#0d2a63', 
            fontWeight: 800,
            marginBottom: '2rem'
          }}>
            {title}
          </h1>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', color: '#4a4a4a' }}>
            {duration && (
              <div><strong>Duration:</strong> {duration}</div>
            )}
            {format && (
              <div><strong>Format:</strong> {format}</div>
            )}
            {targetAudience && (
              <div><strong>Audience:</strong> {targetAudience}</div>
            )}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        {/* Main Image */}
        {imageUrl && (
          <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '60px', boxShadow: '0 30px 60px rgba(13, 42, 99, 0.1)' }}>
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={600}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: keyBenefits?.length ? '2fr 1fr' : '1fr', gap: '60px' }}>
          {/* Detailed Description */}
          <div style={{ 
            fontFamily: "'Source Serif 4', serif", 
            fontSize: '1.2rem', 
            lineHeight: 1.8, 
            color: '#2a2a2a'
          }}>
            {renderRichText(description)}
          </div>

          {/* Sidebar / Benefits */}
          {keyBenefits && keyBenefits.length > 0 && (
            <aside>
              <div style={{ 
                backgroundColor: '#f5f8ff', 
                padding: '30px', 
                borderRadius: '16px', 
                position: 'sticky', 
                top: '40px' 
              }}>
                <h2 style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: '1.4rem', 
                  color: '#0d2a63', 
                  marginBottom: '1.5rem',
                  fontWeight: 800
                }}>
                  Key Benefits
                </h2>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#4a4a4a' }}>
                  {keyBenefits.map((benefit, idx) => (
                    <li key={idx} style={{ marginBottom: '0.8rem' }}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  )
}
