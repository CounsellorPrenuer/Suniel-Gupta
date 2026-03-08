'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

export function ContactSection({ title, description, email, phone, address, formTitle, id, backgroundImage }: SectionProps) {
  const bgImageUrl = backgroundImage ? urlForImage(backgroundImage).width(1600).height(900).url() : null
  const hasContactInfo = email || phone || address

  return (
    <section
      id={id}
      className="contact-section"
      style={{
        padding: '80px 20px',
        backgroundColor: 'var(--color-surface)',
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Optional overlay if background image is present */}
      {bgImageUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 0,
          }}
        />
      )}
      <div style={{ maxWidth: '2200px', width: '95%', margin: '0 auto', padding: '150px 0', position: 'relative', zIndex: 1 }}>
        {title && (
          <h2 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{ fontSize: '1.2rem', margin: '0 auto 42px', textAlign: 'center', color: 'var(--color-text-secondary)', maxWidth: '900px' }}>
            {description}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: hasContactInfo ? 'repeat(auto-fit, minmax(360px, 1fr))' : '1fr',
            gap: '30px',
            maxWidth: hasContactInfo ? '1400px' : '800px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}
        >
          {/* Contact Information - Only show if we have contact details */}
          {hasContactInfo && (
            <div style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 4px 14px rgba(13, 42, 99, 0.08)',
              minHeight: '100%',
            }}>
              <h3 style={{ fontSize: '1.9rem', marginBottom: '28px', color: 'var(--color-primary)' }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {email && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</strong>
                    <a
                      href={`mailto:${email}`}
                      style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        fontSize: '1.05rem',
                        lineHeight: '1.2',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {email}
                    </a>
                  </div>
                )}
                {phone && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Phone</strong>
                    <a
                      href={`tel:${phone}`}
                      style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        fontSize: '1.05rem',
                        lineHeight: '1.2',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {address && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Address</strong>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6', fontSize: '1.08rem' }}>
                      {address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 4px 14px rgba(13, 42, 99, 0.08)',
            minHeight: '100%',
          }}>
            {formTitle && <h3 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--color-primary)' }}>{formTitle}</h3>}
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                style={{
                  padding: '14px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '1.02rem',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                style={{
                  padding: '14px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '1.02rem',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                style={{
                  padding: '14px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '1.02rem',
                  resize: 'vertical',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: '6px',
                  padding: '14px 26px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.08rem',
                  cursor: 'pointer',
                  fontWeight: '700',
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


