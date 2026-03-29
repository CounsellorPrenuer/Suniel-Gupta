'use client'

import { useEffect, useMemo, useState } from 'react'
import { urlForImage } from '@/lib/sanity'
import { SectionProps } from '@/lib/sections/registry'

export function WorkshopsSection({ images, videos }: SectionProps) {
  const combinedItems = useMemo(() => {
    const galleryImages = (images || []).filter((img: any) => !!img).map((img: any) => ({ ...img, _type: 'image' }))
    const galleryVideos = (videos || []).filter((vid: any) => !!vid).map((vid: any) => ({ ...vid, _type: 'video' }))
    return [...galleryImages, ...galleryVideos]
  }, [images, videos])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2)

  if (combinedItems.length === 0) return null

  useEffect(() => {
    const applyBreakpoint = () => {
      setItemsPerView(window.innerWidth < 900 ? 1 : 2)
    }

    applyBreakpoint()
    window.addEventListener('resize', applyBreakpoint)
    return () => window.removeEventListener('resize', applyBreakpoint)
  }, [])

  useEffect(() => {
    if (combinedItems.length <= itemsPerView) return
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const maxStart = Math.max(0, combinedItems.length - itemsPerView)
        return prev >= maxStart ? 0 : prev + 1
      })
    }, 5000)

    return () => window.clearInterval(timer)
  }, [combinedItems.length, itemsPerView])

  const maxStart = Math.max(0, combinedItems.length - itemsPerView)
  const safeStart = Math.min(currentIndex, maxStart)
  const visibleItems = combinedItems.slice(safeStart, safeStart + itemsPerView)

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxStart : prev - 1))
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxStart ? 0 : prev + 1))
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return null
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/')
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/')
    }
    return url
  }

  return (
    <section id="workshops" style={{ padding: '80px 20px', backgroundColor: '#f9f9f9' }}>
      <div style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '15px', textAlign: 'center', color: 'var(--color-primary)' }}>
          Workshops & Events
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '45px', color: '#666', fontSize: '1.2rem' }}>
          Capturing the spirit of growth and learning in our interactive sessions.
        </p>

        <div
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            padding: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${itemsPerView}, minmax(0, 1fr))`,
              gap: '12px',
            }}
          >
            {visibleItems.map((item: any, idx: number) => {
              if (item._type === 'image') {
                const imageUrl = urlForImage(item).width(900).height(620).fit('crop').url()
                return (
                  <img
                    key={item._key || `img-${idx}`}
                    src={imageUrl}
                    alt={item.alt || `Workshop ${safeStart + idx + 1}`}
                    style={{
                      width: '100%',
                      height: 'clamp(200px, 35vw, 350px)',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '10px',
                    }}
                  />
                )
              } else if (item._type === 'video') {
                const isUploaded = !!item.fileUrl
                const embedUrl = !isUploaded ? getEmbedUrl(item.url) : null

                return (
                  <div 
                    key={item._key || `vid-${idx}`}
                    style={{
                      width: '100%',
                      height: 'clamp(200px, 35vw, 350px)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      backgroundColor: '#000'
                    }}
                  >
                    {isUploaded ? (
                      <video
                        src={item.fileUrl}
                        controls
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <iframe
                        src={embedUrl || ''}
                        title={item.title || 'Workshop Video'}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                )
              }
              return null
            })}
          </div>

          {combinedItems.length > itemsPerView && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous workshop item"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '20px',
                  transform: 'translateY(-50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: 'var(--color-primary)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <span>&larr;</span>
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next workshop item"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '20px',
                  transform: 'translateY(-50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: 'var(--color-primary)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <span>&rarr;</span>
              </button>

              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  backdropFilter: 'blur(4px)',
                }}
              >
                {safeStart + 1}-{Math.min(safeStart + itemsPerView, combinedItems.length)} / {combinedItems.length}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
