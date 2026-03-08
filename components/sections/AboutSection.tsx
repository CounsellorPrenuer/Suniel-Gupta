'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'

const fallbackIcons = ['heart', 'bar', 'spark', 'user']

function iconFromValue(value: string | undefined, index: number) {
  const safe = (value || '').trim().toLowerCase()
  if (safe) return safe
  return fallbackIcons[index % fallbackIcons.length]
}

function iconGlyph(icon: string) {
  if (icon === 'heart') return 'o'
  if (icon === 'bar') return '[]'
  if (icon === 'spark') return '*'
  if (icon === 'user') return 'u'
  return icon
}

export function AboutSection({ title, description, image, id, sectionHeading, sectionSubheading, quote, highlights }: SectionProps) {
  const imageUrl = image ? urlForImage(image).width(800).height(600).url() : null
  const altText = image?.alt || title || 'About section image'
  const safeHighlights = Array.isArray(highlights) ? highlights : []

  return (
    <section id={id} className="about-founder-wrap">
      <div className="about-founder-shell">
        <header className="about-founder-head">
          <h2>{sectionHeading || 'Meet the Founder'}</h2>
          {sectionSubheading && <p>{sectionSubheading}</p>}
        </header>

        <div className="about-founder-grid">
          <article className="about-founder-card">
            {title && <h3>{title}</h3>}
            {description && <p className="about-founder-body">{description}</p>}

            {quote && (
              <blockquote className="about-founder-quote">
                {quote}
              </blockquote>
            )}

            {safeHighlights.length > 0 && (
              <div className="about-founder-cred">
                <h4>Credentials &amp; Expertise</h4>
                <ul>
                  {safeHighlights.map((item: any, idx: number) => {
                    const icon = iconFromValue(item?.icon, idx)
                    return (
                      <li key={item?._key || idx}>
                        <span className={`about-icon about-icon-${icon}`}>{iconGlyph(icon)}</span>
                        <span>{item?.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </article>

          {imageUrl && (
            <div className="about-founder-image">
              <Image
                src={imageUrl}
                alt={altText}
                width={760}
                height={900}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .about-founder-wrap {
          padding: 88px 20px;
          background: radial-gradient(1000px 380px at 50% 0%, rgba(13, 42, 99, 0.12), transparent 70%),
            linear-gradient(180deg, var(--color-background) 0%, var(--color-surface) 100%);
        }

        .about-founder-shell {
          max-width: 1400px;
          width: 95%;
          margin: 0 auto;
          padding: 60px 0;
        }

        .about-founder-head {
          text-align: center;
          margin-bottom: 34px;
        }

        .about-founder-head h2 {
          margin: 0;
          color: var(--color-primary);
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -0.02em;
        }

        .about-founder-head p {
          margin: 12px auto 0;
          max-width: 780px;
          color: var(--color-text-secondary);
          font-size: 1.08rem;
        }

        .about-founder-grid {
          display: grid;
          grid-template-columns: minmax(450px, 1.4fr) minmax(400px, 1fr);
          gap: 60px;
          align-items: center;
        }

        .about-founder-card {
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          box-shadow: 0 18px 44px rgba(13, 42, 99, 0.12);
          padding: 28px;
        }

        .about-founder-card h3 {
          margin: 0 0 12px;
          color: var(--color-primary);
          font-size: 2rem;
          line-height: 1.15;
        }

        .about-founder-body {
          margin: 0;
          white-space: pre-line;
          color: var(--color-text-secondary);
          line-height: 1.75;
        }

        .about-founder-quote {
          margin: 24px 0 0;
          padding: 10px 0 10px 14px;
          border-left: 3px solid var(--color-border);
          color: var(--color-primary);
          font-style: italic;
          font-weight: 600;
        }

        .about-founder-cred {
          margin-top: 24px;
        }

        .about-founder-cred h4 {
          margin: 0 0 12px;
          color: var(--color-primary);
          font-size: 1.15rem;
        }

        .about-founder-cred ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 9px;
        }

        .about-founder-cred li {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 10px;
          align-items: center;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .about-icon {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          display: inline-grid;
          place-items: center;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .about-icon-heart {
          background: #ffe9ad;
          color: var(--color-primary);
        }

        .about-icon-bar {
          background: #fff2c7;
          color: var(--color-primary);
        }

        .about-icon-spark {
          background: #ffe08a;
          color: var(--color-primary);
        }

        .about-icon-user {
          background: #ffe9ad;
          color: var(--color-primary);
        }

        .about-founder-image {
          border-radius: 20px;
          overflow: hidden;
          min-height: 520px;
          box-shadow: 0 20px 44px rgba(13, 42, 99, 0.2);
          border: 1px solid var(--color-border);
        }

        @media (max-width: 940px) {
          .about-founder-grid {
            grid-template-columns: 1fr;
          }

          .about-founder-image {
            min-height: 420px;
            order: -1;
          }
        }

        @media (max-width: 640px) {
          .about-founder-wrap {
            padding: 68px 16px;
          }

          .about-founder-card {
            padding: 22px;
          }

          .about-founder-card h3 {
            font-size: 1.6rem;
          }

          .about-founder-image {
            min-height: 340px;
          }
        }
      `}</style>
    </section>
  )
}

