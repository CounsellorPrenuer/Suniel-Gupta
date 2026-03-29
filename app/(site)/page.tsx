import { getAbout, getContact, getFooter, getHero, getPackages, getServices, getSiteConfig, getTestimonials, getVideos, getDiscoveryCall, getHomepage, getWorkshops } from '@/lib/sanity'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { PackagesSection } from '@/components/sections/PackagesSection'
import { ServiceSection } from '@/components/sections/ServiceSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { VideoSection } from '@/components/sections/VideoSection'
import { DiscoveryCallSection } from '@/components/sections/DiscoveryCallSection'
import { WorkshopsSection } from '@/components/sections/WorkshopsSection'

export default async function Home() {
  let heroContent = null
  let aboutContent = null
  let servicesContent: any[] = []
  let testimonialsContent: any[] = []
  let contactContent = null
  let siteConfigContent = null
  let packagesContent = null
  let footerContent = null
  let videosContent: any[] = []
  let discoveryCallContent = null
  let homepageContent = null
  let workshopsContent = null

  // Helper for parallel fetching with timeout
  const fetchWithTimeout = async (promise: Promise<any>, timeout = 5000) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
    try {
      return await Promise.race([promise, timeoutPromise])
    } catch (error) {
      console.error('[Home] Fetch failed', error)
      return null
    }
  }

  // Parallel fetches
  const [
    hero,
    about,
    services,
    testimonials,
    contact,
    siteConfig,
    packages,
    footer,
    videos,
    discoveryCall,
    homepage,
    workshops
  ] = await Promise.all([
    fetchWithTimeout(getHero()),
    fetchWithTimeout(getAbout()),
    fetchWithTimeout(getServices()),
    fetchWithTimeout(getTestimonials()),
    fetchWithTimeout(getContact()),
    fetchWithTimeout(getSiteConfig()),
    fetchWithTimeout(getPackages()),
    fetchWithTimeout(getFooter()),
    fetchWithTimeout(getVideos()),
    fetchWithTimeout(getDiscoveryCall()),
    fetchWithTimeout(getHomepage()),
    fetchWithTimeout(getWorkshops())
  ])

  heroContent = hero
  aboutContent = about
  servicesContent = services || []
  testimonialsContent = testimonials || []
  contactContent = contact
  siteConfigContent = siteConfig
  packagesContent = packages
  footerContent = footer
  videosContent = videos || []
  discoveryCallContent = discoveryCall
  homepageContent = homepage
  workshopsContent = workshops

  const mappedServices = servicesContent.map((service: any) => ({
    serviceName: service.title,
    serviceDescription: service.description,
    keyBenefits: service.keyBenefits,
    targetAudience: service.targetAudience,
    duration: service.duration,
    format: service.format,
    icon: service.image || service.icon
  }))

  const mappedTestimonials = testimonialsContent.map((item: any) => ({
    author: item.name,
    role: item.title,
    quote: item.quote,
    image: item.image,
  }))

  const effectiveContact = {
    title: contactContent?.title || 'Get In Touch',
    description: contactContent?.description,
    email: contactContent?.email || siteConfigContent?.email || 'coachsuniel@gmail.com',
    phone: contactContent?.phone || siteConfigContent?.phone || '87796 20761',
    address: contactContent?.address || siteConfigContent?.address || 'Mumbai, India',
    formTitle: contactContent?.formTitle || 'Send us a message',
    backgroundImage: contactContent?.backgroundImage,
  }

  const standaloneFooter = {
    companyName: siteConfigContent?.title || 'Coach Suniel',
    description: siteConfigContent?.description,
    socialLinks: footerContent?.socialLinks || siteConfigContent?.socialLinks || [
      { label: 'Instagram', url: 'https://www.instagram.com/coachsuniel/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sunielguptaa/' },
      { label: 'YouTube', url: 'https://www.youtube.com/@sunielguptaa' }
    ],
    copyright: footerContent?.copyright || `© ${new Date().getFullYear()} Coach Suniel. All rights reserved.`,
  }

  return (
    <main>
      {/* 1. Hero Section */}
      {(homepageContent || heroContent) && (
        <HeroSection
          brandName={homepageContent?.brandName || 'Coach Suniel'}
          tagline={homepageContent?.tagline}
          subTagline={homepageContent?.subTagline}
          description={homepageContent?.description || 'Coach Suniel works with students and professionals who want to grow. Whether that means choosing the right career, becoming a better leader, or gaining confidence to communicate effectively.'}
          stats={homepageContent?.stats || [
            { value: '30 plus', label: 'years of corporate experience' },
            { value: '10,000 plus', label: 'people trained' },
          ]}
          heading={homepageContent?.tagline || heroContent?.headline}
          subheading={homepageContent?.subTagline || heroContent?.subheadline}
          cta={homepageContent?.cta || { 
            text: heroContent?.ctaText || 'Book a Discovery Call', 
            link: heroContent?.ctaLink || '#discovery-call' 
          }}
        />
      )}

      {/* 2. Introduction (Part of Hero or standalone - currently using Hero subheadline) */}

      {/* 3. About Coach Suniel */}
      {aboutContent && (
        <AboutSection
          id="about"
          sectionHeading={aboutContent.sectionHeading || 'About Founder'}
          title={(!aboutContent.title || aboutContent.title === 'About Founder') ? 'Hi, I’m Suniel Guptaa' : aboutContent.title}
          videoUrl={aboutContent.videoUrl || 'https://youtu.be/kYP-ywYQxgE'}
          description={(!aboutContent.description || aboutContent.description.length < 150) ? `I’m a Mentoria-certified career counsellor, ICF-certified life coach, and soft skills trainer. But before any of that, I spent more than three decades working in the corporate world. I’ve worked in business development, sales management, and training leadership, including leading the training department of a major pharmaceutical company.

Over the years, one thing became very clear to me:

People with opportunities don’t struggle because they lack talent or will power. They struggle because they lack clarity, confidence, and guidance.

That’s why I now dedicate my work to helping people grow—whether that means choosing the right career, becoming a better leader, or simply finding direction in life.

I’ve had the privilege of training 10,000+ professionals and students across industries.

I’m also the author of What Next? Journey to a Successful Career, a practical guide for students and job seekers navigating today’s professional world. My programmes cover:

•	Behavioural Training: Shifting mindsets for long-term success.
•	Skills-Based Training: Practical tools for communication, leadership, and efficiency.
•	Personalised Coaching: Goal-oriented sessions designed to unlock your unique potential.` : aboutContent.description}
        />
      )}

      {/* 4. How I Can Help (Services) */}
      {mappedServices.length > 0 && (
        <ServiceSection
          id="services"
          title="How I Can Help"
          description="Everyone’s journey is different, but from students and corporate professionals to business owners and C-suite executives, people come to me for one of these reasons:"
          services={mappedServices}
        />
      )}

      {/* 5. Programs (Packages) */}
      {packagesContent && <PackagesSection id="programs" {...packagesContent} />}

      {/* 6. Testimonials */}
      {mappedTestimonials.length > 0 && (
        <TestimonialsSection id="testimonials" heading="What People Say" testimonials={mappedTestimonials} />
      )}

      {/* 7. Workshops Section */}
      {workshopsContent && <WorkshopsSection {...workshopsContent} />}

      {/* 8. Video Section */}
      {videosContent.length > 0 && (
        <VideoSection id="videos" title="Videos" videos={videosContent} />
      )}

      {/* 8. Discovery Call */}
      <DiscoveryCallSection 
        id="discovery-call"
        title={discoveryCallContent?.title}
        description={discoveryCallContent?.description}
        ctaText={discoveryCallContent?.ctaText}
        ctaLink={discoveryCallContent?.ctaLink}
        backgroundImage={discoveryCallContent?.backgroundImage}
      />

      {/* 9. Contact */}
      <ContactSection
        id="contact"
        title={effectiveContact.title}
        description={effectiveContact.description}
        email={effectiveContact.email}
        phone={effectiveContact.phone}
        address={effectiveContact.address}
        formTitle={effectiveContact.formTitle}
        backgroundImage={effectiveContact.backgroundImage}
      />

      <FooterSection {...standaloneFooter} />
    </main>
  )
}
// Git sync
