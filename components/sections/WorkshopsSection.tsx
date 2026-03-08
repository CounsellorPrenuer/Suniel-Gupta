'use client'

import { useEffect, useMemo, useState } from 'react'
import { urlForImage } from '@/lib/sanity'
import { SectionProps } from '@/lib/sections/registry'

export function WorkshopsSection({ images }: SectionProps) {
  if (!images || images.length === 0) return null

  const validImages = useMemo(() => images.filter((image: any) => !!image), [images])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesPerView, setImagesPerView] = useState(2)

  if (validImages.length === 0) return null

  useEffect(() => {
    const applyBreakpoint = () => {
      setImagesPerView(window.innerWidth < 900 ? 1 : 2)
    }

    applyBreakpoint()
    window.addEventListener('resize', applyBreakpoint)
    return () => window.removeEventListener('resize', applyBreakpoint)
  }, [])

  useEffect(() => {
    if (validImages.length <= imagesPerView) return
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const maxStart = Math.max(0, validImages.length - imagesPerView)
        return prev >= maxStart ? 0 : prev + 1
      })
    }, 3000)

    return () => window.clearInterval(timer)
  }, [validImages.length, imagesPerView])

  const maxStart = Math.max(0, validImages.length - imagesPerView)
  const safeStart = Math.min(currentIndex, maxStart)
  const visibleImages = validImages.slice(safeStart, safeStart + imagesPerView)

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxStart : prev - 1))
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxStart ? 0 : prev + 1))
  }

  return (
    <section id="workshops" style={{ padding: '60px 20px' }}>
      <div style={{ maxWidth: '2200px', width: '95%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center', color: 'var(--color-primary)' }}>
          Workshops
        </h2>

        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            padding: '10px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${imagesPerView}, minmax(0, 1fr))`,
              gap: '10px',
            }}
          >
            {visibleImages.map((image: any, idx: number) => {
              const imageUrl = image
                ? urlForImage(image).width(900).height(620).fit('crop').url()
                : null
              if (!imageUrl) return null

              return (
                <img
                  key={image._key || idx}
                  src={imageUrl}
                  alt={image.alt || `Workshop ${safeStart + idx + 1}`}
                  style={{
                    width: '100%',
                    height: 'clamp(180px, 30vw, 300px)',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '8px',
                  }}
                />
              )
            })}
          </div>

          {validImages.length > imagesPerView && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous workshop image"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '14px',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.65)',
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                {'<'}
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next workshop image"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '14px',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.65)',
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                {'>'}
              </button>

              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '14px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                }}
              >
                {safeStart + 1}-{Math.min(safeStart + imagesPerView, validImages.length)} / {validImages.length}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
