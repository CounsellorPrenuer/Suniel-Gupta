'use client'

import React from 'react'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'


export function renderRichText(content: any, textAlign: 'left' | 'center' = 'left', color: string = '#4a4a4a') {
  if (!content) return null

  // Fallback for plain text
  if (typeof content === 'string') {
    return <p style={{ color, lineHeight: '1.7', textAlign, whiteSpace: 'pre-line' }}>{content}</p>
  }

  if (!Array.isArray(content)) return null

  const renderInline = (children: any[]) =>
    children.map((child: any, childIdx: number) => {
      if (typeof child === 'string') return child
      if (child?._type !== 'span') return null
      const isBold = Array.isArray(child.marks) && child.marks.includes('strong')
      return (
        <span key={child._key || childIdx} style={{ fontWeight: isBold ? 800 : 400 }}>
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
              margin: '1.5em 0',
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
        <ul key={block._key || `list-${idx}`} style={{ margin: '0 0 1em', paddingLeft: '1.5em', textAlign: 'left' }}>
          {listItems.map((item, itemIdx) => (
            <li key={item._key || itemIdx} style={{ marginBottom: '0.5em', lineHeight: 1.6, color }}>
              {renderInline(item.children)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    nodes.push(
      <p key={block._key || idx} style={{ margin: '0 0 1em', lineHeight: 1.7, color, textAlign }}>
        {renderInline(block.children)}
      </p>
    )
    idx += 1
  }

  return <div>{nodes}</div>
}
