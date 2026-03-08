'use client'

import { useState } from 'react'
import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'

const DARK_BLUE = '#0d2a63'
const PEARL_WHITE = '#fffdf5'
const SUNNY_YELLOW = '#f7c948'
const BODY_DARK = '#1f355f'

function renderRichText(content: any, textAlign: 'left' | 'center' = 'left') {
  if (!content) return null

  if (typeof content === 'string') {
    return <p style={{ color: BODY_DARK, lineHeight: '1.6', textAlign, whiteSpace: 'pre-line' }}>{content}</p>
  }

  if (!Array.isArray(content)) return null

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

  while (idx < content.length) {
    const block = content[idx]

    if (block?._type === 'image') {
      const imageUrl = block?.asset
        ? urlForImage(block).width(1000).height(700).fit('max').ignoreImageParams().url()
        : null
      if (imageUrl) {
        nodes.push(
          <div
            key={block._key || `img-${idx}`}
            style={{
              margin: '0 0 1em',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              border: '1px solid #d9d9d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '180px',
            }}
          >
            <Image
              src={imageUrl}
              alt={block?.alt || 'Description image'}
              width={1000}
              height={700}
              style={{
                maxWidth: '100%',
                width: '100%',
                maxHeight: '320px',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>
        )
      }
      idx += 1
      continue
    }

    if (block?._type !== 'block' || !Array.isArray(block.children)) {
      idx += 1
      continue
    }

    if (block.listItem === 'bullet') {
      const listItems: any[] = []
      while (idx < content.length) {
        const listBlock = content[idx]
        if (listBlock?._type !== 'block' || listBlock.listItem !== 'bullet' || !Array.isArray(listBlock.children)) {
          break
        }
        listItems.push(listBlock)
        idx += 1
      }

      nodes.push(
        <ul key={block._key || `list-${idx}`} style={{ margin: '0 0 0.8em', paddingLeft: '1.2em', textAlign: 'left' }}>
          {listItems.map((item, itemIdx) => (
            <li key={item._key || itemIdx} style={{ marginBottom: '0.35em', lineHeight: 1.5, color: BODY_DARK }}>
              {renderInline(item.children)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    nodes.push(
      <p key={block._key || idx} style={{ margin: '0 0 0.8em', lineHeight: 1.6, color: BODY_DARK, textAlign }}>
        {renderInline(block.children)}
      </p>
    )
    idx += 1
  }

  return <div>{nodes}</div>
}

function getContentLength(content: any) {
  if (!content) return 0
  if (typeof content === 'string') return content.length
  if (!Array.isArray(content)) return 0

  return content.reduce((total: number, block: any) => {
    if (block?._type === 'block' && Array.isArray(block.children)) {
      const blockText = block.children
        .filter((child: any) => child?._type === 'span')
        .map((child: any) => child.text || '')
        .join('')
      return total + blockText.length
    }
    return total
  }, 0)
}

function ServiceCard({ service }: { service: any }) {
  const [expanded, setExpanded] = useState(false)
  const hasImageIcon = !!service.icon && typeof service.icon === 'object' && !!service.icon.asset
  const iconUrl = hasImageIcon
    ? urlForImage(service.icon).width(900).height(600).fit('max').ignoreImageParams().url()
    : null
  const emojiIcon = typeof service.icon === 'string' ? service.icon : null
  const iconAlt = service.icon?.alt || service.serviceName || 'Service icon'
  const isLongDescription = getContentLength(service.serviceDescription) > 320

  return (
    <div
      style={{
        backgroundColor: PEARL_WHITE,
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(13, 42, 99, 0.12)',
        border: `1px solid ${SUNNY_YELLOW}`,
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto',
        textAlign: 'left',
        padding: '30px',
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
            fontSize: '1.3rem',
            marginBottom: '14px',
            color: DARK_BLUE,
            lineHeight: 1.3,
            paddingBottom: '10px',
            borderBottom: `2px solid ${SUNNY_YELLOW}`,
          }}
        >
          {service.serviceName}
        </h3>
      )}
      {service.serviceDescription && (
        <div style={{ overflowX: 'auto' }}>
          <div
            style={
              !expanded && isLongDescription
                ? {
                  maxHeight: '280px',
                  overflow: 'hidden',
                  position: 'relative',
                }
                : undefined
            }
          >
            {renderRichText(service.serviceDescription)}
          </div>
          {!expanded && isLongDescription && (
            <div
              style={{
                marginTop: '-54px',
                height: '54px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
                pointerEvents: 'none',
              }}
            />
          )}
          {isLongDescription && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              style={{
                marginTop: '12px',
                border: `1px solid ${SUNNY_YELLOW}`,
                background: SUNNY_YELLOW,
                color: DARK_BLUE,
                fontWeight: 700,
                cursor: 'pointer',
                padding: '8px 14px',
                borderRadius: '8px',
                display: 'inline-block',
              }}
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
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
      <div style={{ maxWidth: '2200px', width: '95%', margin: '0 auto', padding: '40px 0' }}>
        {title && (
          <h2
            style={{
              fontSize: '2.5rem',
              marginBottom: '14px',
              textAlign: 'center',
              color: DARK_BLUE,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h2>
        )}
        {description && (
          <div style={{ fontSize: '1.2rem', marginBottom: '60px', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
            {renderRichText(description, 'center')}
          </div>
        )}

        {services && services.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '20px',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            {services.map((service: any, idx: number) => {
              return <ServiceCard key={idx} service={service} />
            })}
          </div>
        )}
      </div>
    </section>
  )
}

