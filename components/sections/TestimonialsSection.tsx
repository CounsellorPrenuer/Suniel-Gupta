'use client'

import { SectionProps } from '@/lib/sections/registry'

export function TestimonialsSection({ heading, testimonials }: SectionProps) {
  return (
    <section id="testimonials" style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {heading && <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center' }}>{heading}</h2>}

        {testimonials && testimonials.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {testimonials.map((testimonial: any, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: '30px',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--color-primary)',
                }}
              >
                {testimonial.rating && (
                  <div style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                    {'\u2605'.repeat(testimonial.rating)}
                  </div>
                )}
                {testimonial.quote && (
                  <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '20px', color: 'var(--color-text-primary)' }}>
                    "{testimonial.quote}"
                  </p>
                )}
                <div>
                  {testimonial.author && (
                    <strong style={{ display: 'block', marginBottom: '5px' }}>{testimonial.author}</strong>
                  )}
                  {testimonial.role && <small style={{ color: 'var(--color-text-secondary)' }}>{testimonial.role}</small>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


