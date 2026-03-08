import { getAbout, getContact, getFooter, getHero, getPackages, getPageBySlug, getServices, getSiteConfig, getTestimonials, getWorkshops } from '@/lib/sanity'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { PackagesSection } from '@/components/sections/PackagesSection'
import { ServiceSection } from '@/components/sections/ServiceSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { WorkshopsSection } from '@/components/sections/WorkshopsSection'

/**
 * Root page / home
 * Shows welcome page or home content
 */
export default async function Home() {
  let homePage = null
  let heroContent = null
  let aboutContent = null
  let servicesContent: any[] = []
  let testimonialsContent: any[] = []
  let contactContent = null
  let siteConfigContent = null
  let packagesContent = null
  let footerContent = null
  let workshopsContent = null

  try {
    // Add 5-second timeout for Sanity fetch
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    homePage = await Promise.race([getPageBySlug('home'), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch home page, using fallback', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    heroContent = await Promise.race([getHero(), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch standalone hero content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    aboutContent = await Promise.race([getAbout(), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch standalone about content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    servicesContent = await Promise.race([getServices(), timeoutPromise]) as any[]
  } catch (error) {
    console.log('[Home] Failed to fetch standalone services content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    testimonialsContent = await Promise.race([getTestimonials(), timeoutPromise]) as any[]
  } catch (error) {
    console.log('[Home] Failed to fetch standalone testimonials content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    contactContent = await Promise.race([getContact(), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch standalone contact content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    siteConfigContent = await Promise.race([getSiteConfig(), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch standalone site config content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    packagesContent = await Promise.race([getPackages(), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch standalone packages content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    footerContent = await Promise.race([getFooter(), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch standalone footer content', error)
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
    workshopsContent = await Promise.race([getWorkshops(), timeoutPromise])
  } catch (error) {
    console.log('[Home] Failed to fetch standalone workshops content', error)
  }

  // If home page exists in Sanity, render it directly
  if (homePage) {
    const { getSectionComponent } = await import('@/lib/sections/registry')
    const allSections = homePage.sections || []
    const footerSection = allSections.find((s: any) => s._type === 'footerSection')
    const regularSections = allSections.filter((s: any) => {
      if (s._type === 'footerSection') return false
      if (heroContent && s._type === 'heroSection') return false
      if (aboutContent && s._type === 'aboutSection') return false
      if (servicesContent.length > 0 && s._type === 'serviceSection') return false
      if (testimonialsContent.length > 0 && (s._type === 'testimonialsSection' || s._type === 'testimonialSection')) return false
      if (contactContent && s._type === 'contactSection') return false
      return true
    })

    const mappedServices = servicesContent.map((service: any) => ({
      serviceName: service.title,
      serviceDescription: service.description,
      icon: service.image || service.icon,
    }))

    const mappedTestimonials = testimonialsContent.map((item: any) => ({
      author: item.name,
      role: item.role || item.company,
      quote: item.quote,
      rating: item.rating,
    }))

    const effectiveContact = {
      title: contactContent?.title || 'Get In Touch',
      description: contactContent?.description,
      email: contactContent?.email || siteConfigContent?.email,
      phone: contactContent?.phone || siteConfigContent?.phone,
      address: contactContent?.address || siteConfigContent?.address,
      formTitle: contactContent?.formTitle || 'Send us a message',
      backgroundImage: contactContent?.backgroundImage,
    }

    const hasContactContent =
      !!contactContent ||
      !!effectiveContact.email ||
      !!effectiveContact.phone ||
      !!effectiveContact.address

    const standaloneFooter = footerContent
      ? {
        companyName: siteConfigContent?.title,
        description: siteConfigContent?.description,
        socialLinks: footerContent.socialLinks,
        copyright: footerContent.copyright,
      }
      : null

    return (
      <main>
        {heroContent && (
          <HeroSection
            heading={heroContent.headline}
            subheading={heroContent.subheadline}
            cta={{ text: heroContent.ctaText, link: heroContent.ctaLink }}
          />
        )}
        {aboutContent && (
          <AboutSection
            id="about"
            sectionHeading={aboutContent.sectionHeading}
            sectionSubheading={aboutContent.sectionSubheading}
            title={aboutContent.title}
            description={aboutContent.description}
            quote={aboutContent.quote}
            highlights={aboutContent.highlights}
            image={aboutContent.image}
          />
        )}
        {mappedServices.length > 0 && (
          <ServiceSection
            id="services"
            title="Services"
            services={mappedServices}
          />
        )}
        {regularSections.length > 0 ? (
          regularSections.map((section: any, idx: number) => {
            const Component = getSectionComponent(section._type)
            if (!Component) return null
            return <Component key={section._key || idx} {...section} />
          })
        ) : null}
        {packagesContent && <PackagesSection {...packagesContent} />}
        {mappedTestimonials.length > 0 && (
          <TestimonialsSection heading="Testimonials" testimonials={mappedTestimonials} />
        )}
        {workshopsContent?.images?.length > 0 && <WorkshopsSection images={workshopsContent.images} />}
        {hasContactContent && (
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
        )}
        {footerSection && (() => {
          const { getSectionComponent } = require('@/lib/sections/registry')
          const FooterComponent = getSectionComponent(footerSection._type)
          if (FooterComponent) return <FooterComponent key={footerSection._key || 'footer'} {...footerSection} />
          return null
        })()}
        {!footerSection && standaloneFooter && <FooterSection {...standaloneFooter} />}
      </main>
    )
  }

  if (heroContent || aboutContent || servicesContent.length > 0 || testimonialsContent.length > 0 || contactContent || siteConfigContent?.email || siteConfigContent?.phone || siteConfigContent?.address || packagesContent || footerContent || workshopsContent?.images?.length > 0) {
    const mappedServices = servicesContent.map((service: any) => ({
      serviceName: service.title,
      serviceDescription: service.description,
      icon: service.image || service.icon,
    }))

    const mappedTestimonials = testimonialsContent.map((item: any) => ({
      author: item.name,
      role: item.role || item.company,
      quote: item.quote,
      rating: item.rating,
    }))

    const effectiveContact = {
      title: contactContent?.title || 'Get In Touch',
      description: contactContent?.description,
      email: contactContent?.email || siteConfigContent?.email,
      phone: contactContent?.phone || siteConfigContent?.phone,
      address: contactContent?.address || siteConfigContent?.address,
      formTitle: contactContent?.formTitle || 'Send us a message',
      backgroundImage: contactContent?.backgroundImage,
    }

    const hasContactContent =
      !!contactContent ||
      !!effectiveContact.email ||
      !!effectiveContact.phone ||
      !!effectiveContact.address

    const standaloneFooter = footerContent
      ? {
        companyName: siteConfigContent?.title,
        description: siteConfigContent?.description,
        socialLinks: footerContent.socialLinks,
        copyright: footerContent.copyright,
      }
      : null

    return (
      <main>
        {heroContent && (
          <HeroSection
            heading={heroContent.headline}
            subheading={heroContent.subheadline}
            cta={{ text: heroContent.ctaText, link: heroContent.ctaLink }}
          />
        )}
        {aboutContent && (
          <AboutSection
            id="about"
            sectionHeading={aboutContent.sectionHeading}
            sectionSubheading={aboutContent.sectionSubheading}
            title={aboutContent.title}
            description={aboutContent.description}
            quote={aboutContent.quote}
            highlights={aboutContent.highlights}
            image={aboutContent.image}
          />
        )}
        {mappedServices.length > 0 && (
          <ServiceSection
            id="services"
            title="Services"
            services={mappedServices}
          />
        )}
        {packagesContent && <PackagesSection {...packagesContent} />}
        {mappedTestimonials.length > 0 && (
          <TestimonialsSection heading="Testimonials" testimonials={mappedTestimonials} />
        )}
        {workshopsContent?.images?.length > 0 && <WorkshopsSection images={workshopsContent.images} />}
        {hasContactContent && (
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
        )}
        {standaloneFooter && <FooterSection {...standaloneFooter} />}
      </main>
    )
  }

  // Fallback welcome message if no home page found
  return (
    <main style={{ padding: '40px', textAlign: 'center', minHeight: '100vh' }}>
      <h1>Welcome to Your Remixable Template</h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '20px auto' }}>
        This is a section-based website template powered by Sanity CMS.
      </p>
      <p>
        <a
          href="/Suniel_Gupta/admin"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-background)',
            padding: '12px 30px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Manage Content in Sanity
        </a>
      </p>
      <p style={{ marginTop: '40px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        Create a page with slug "home" in Sanity to get started.
      </p>
    </main>
  )
}
// Git sync
