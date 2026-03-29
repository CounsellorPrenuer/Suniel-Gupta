'use client'

import React from 'react'
import { SectionProps } from '@/lib/sections/registry'

export function VideoSection({ title, videos, id }: SectionProps) {
  if (!videos || videos.length === 0) return null

  return (
    <section id={id} className="video-section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="section-container">
        {title && <h2 className="text-center mb-2">{title}</h2>}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}
        >
          {videos.map((video: any, idx: number) => {
            const videoId = video.url?.split('v=')[1] || video.url?.split('/').pop()
            return (
              <div key={video._id || idx} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title || 'YouTube video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {video.title && (
                  <div style={{ padding: '1rem', backgroundColor: '#fff' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{video.title}</h3>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
