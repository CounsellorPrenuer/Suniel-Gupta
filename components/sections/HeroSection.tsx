'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

function renderSubheadingContent(subheading: any) {
  if (!subheading) return null

  if (typeof subheading === 'string') {
    return <p style={{ fontSize: '1.25rem', marginBottom: '30px', whiteSpace: 'pre-line' }}>{subheading}</p>
  }

  if (!Array.isArray(subheading)) return null

  const renderInline = (children: any[]) =>
    children.map((child: any, childIdx: number) => {
      if (child?._type !== 'span') return null
      const isBold = Array.isArray(child.marks) && child.marks.includes('strong')
      return (
        <span key={child._key || childIdx} style={{ fontWeight: isBold ? 700 : 400 }}>
          {child.text}
        </span>
      )
    })

  const nodes: any[] = []
  let idx = 0

  while (idx < subheading.length) {
    const block = subheading[idx]

    if (block?._type !== 'block' || !Array.isArray(block.children)) {
      idx += 1
      continue
    }

    if (block.listItem === 'bullet') {
      const listItems: any[] = []
      while (idx < subheading.length) {
        const listBlock = subheading[idx]
        if (listBlock?._type !== 'block' || listBlock.listItem !== 'bullet' || !Array.isArray(listBlock.children)) {
          break
        }
        listItems.push(listBlock)
        idx += 1
      }

      nodes.push(
        <ul key={block._key || `list-${idx}`} style={{ margin: '0 0 0.8em', paddingLeft: '1.2em', textAlign: 'left' }}>
          {listItems.map((item, itemIdx) => (
            <li key={item._key || itemIdx} style={{ marginBottom: '0.35em', lineHeight: 1.5 }}>
              {renderInline(item.children)}
            </li>
          ))}
        </ul>
      )

      continue
    }

    nodes.push(
      <p key={block._key || idx} style={{ margin: '0 0 0.8em', lineHeight: 1.5 }}>
        {renderInline(block.children)}
      </p>
    )
    idx += 1
  }

  return (
    <div style={{ fontSize: '1.8rem', marginBottom: '50px', maxWidth: '1200px', margin: '0 auto 40px', lineHeight: 1.6 }}>
      {nodes}
    </div>
  )
}

export function HeroSection({ heading, subheading, backgroundImage, cta }: SectionProps) {
  const bgImageUrl = backgroundImage ? urlForImage(backgroundImage).width(1920).height(800).url() : undefined

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-background)',
        textAlign: 'center',
        padding: '80px 20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '80px 60px',
          borderRadius: '30px',
          maxWidth: '1600px',
          width: '95%',
          margin: '0 auto',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {heading && <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', marginBottom: '24px', lineHeight: 1.0, fontWeight: 900, textShadow: '0 4px 40px rgba(0,0,0,0.6)', letterSpacing: '-0.04em' }}>{heading}</h1>}
        {renderSubheadingContent(subheading)}
        {cta?.text && (
          <a
            href={cta.link || '#'}
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-background)',
              padding: '12px 30px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '1.1rem',
            }}
          >
            {cta.text}
          </a>
        )}
      </div>
    </section>
  )
}

