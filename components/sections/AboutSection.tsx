'use client'

import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'
import { renderRichText } from '@/lib/richText'

interface AboutProps {
  id?: string
  sectionHeading?: string
  sectionSubheading?: string
  title?: string
  description?: string
  videoUrl?: string
  image?: any
  quote?: string
  highlights?: any[]
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

export function AboutSection({ 
  title, 
  description, 
  videoUrl, 
  image, 
  id, 
  sectionHeading 
}: AboutProps) {
  const imageUrl = image ? urlForImage(image).width(800).height(600).url() : null
  const videoId = videoUrl ? getYouTubeId(videoUrl) : null

  return (
    <section id={id || 'about'} style={{ backgroundColor: '#ffffff', padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="about-grid">
          {/* Left Column: Text */}
          <div className="about-text">
            {sectionHeading && (
              <h2 style={{ 
                fontFamily: "'Outfit', sans-serif", 
                fontSize: '1rem', 
                color: '#0d2a63', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                marginBottom: '1rem' 
              }}>
                {sectionHeading}
              </h2>
            )}
            
            {title && (
              <h3 style={{ 
                fontFamily: "'Outfit', sans-serif", 
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', // Reduced size
                color: '#0d2a63', 
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '2rem' 
              }}>
                {title}
              </h3>
            )}

            <div style={{ 
              fontFamily: "'Source Serif 4', serif", 
              fontSize: '1.05rem', // Reduced size
              lineHeight: 1.7, 
              color: '#4a4a4a'
            }}>
              {renderRichText(description)}
            </div>
          </div>

          {/* Right Column: Video or Image */}
          <div className="about-visual">
            {videoId ? (
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="About Section Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(13, 42, 99, 0.15)'
                  }}
                />
              </div>
            ) : imageUrl && (
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(13, 42, 99, 0.15)' }}>
                <Image
                  src={imageUrl}
                  alt={title || 'About Image'}
                  width={800}
                  height={600}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: flex-start;
        }

        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
          overflow: hidden;
          width: 100%;
        }

        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .about-visual {
            order: 2; /* Video below text on mobile */
          }
        }
      `}</style>
    </section>
  )
}
