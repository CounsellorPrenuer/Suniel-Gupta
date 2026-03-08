/**
 * SANITY CLIENT CONFIGURATION
 * Initializes the Sanity client for fetching content
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Defaults keep static hosting functional even when CI secrets are missing.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bc4fmw79'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

/**
 * Image URL builder for Sanity images
 */
const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: any) {
  return builder.image(source)
}

/**
 * Fetch a page by slug
 */
export async function getPageBySlug(slug: string) {
  const query = `
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      seo,
      sections[] {
        _key,
        _type,
        ...
      }
    }
  `

  return sanityClient.fetch(query, { slug })
}

/**
 * Fetch all page slugs for static generation
 */
export async function getAllPageSlugs() {
  const query = `
    *[_type == "page"] {
      "slug": slug.current
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch all pages
 */
export async function getAllPages() {
  const query = `
    *[_type == "page"] {
      _id,
      title,
      slug,
      seo
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch navbar configuration
 */
export async function getNavbar() {
  const query = `
    *[_type == "navbar"][0] {
      links[] {
        label,
        href
      }
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch site configuration
 */
export async function getSiteConfig() {
  const query = `
    *[_type == "site"][0] {
      title,
      description,
      email,
      phone,
      address,
      logo,
      logoImage {
        asset->{
          _id,
          url
        },
        alt
      },
      primaryColor,
      primaryHoverColor,
      backgroundColor,
      surfaceColor,
      textPrimary,
      textSecondary,
      borderColor,
      footerBackground,
      footerText
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone packages content
 */
export async function getPackages() {
  const query = `
    *[_type == "packages"][0] {
      _id,
      _type,
      sectionTitle,
      sectionSubtitle,
      sectionId,
      packageCategories,
      heading,
      subheading,
      audienceTabs,
      plans,
      addOnsHeading,
      addOnsDescription,
      addOns
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone hero content
 */
export async function getHero() {
  const query = `
    *[_type == "hero"][0] {
      _id,
      _type,
      headline,
      subheadline,
      ctaText,
      ctaLink
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone about content
 */
export async function getAbout() {
  const query = `
    *[_type == "about"][0] {
      _id,
      _type,
      sectionHeading,
      sectionSubheading,
      title,
      description,
      quote,
      highlights,
      image {
        ...,
        asset->
      }
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone services list
 */
export async function getServices() {
  const query = `
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      icon,
      image {
        ...,
        asset->
      },
      order
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone testimonials list
 */
export async function getTestimonials() {
  const query = `
    *[_type == "testimonial"] | order(order asc) {
      _id,
      name,
      role,
      quote,
      rating,
      company,
      image {
        ...,
        asset->
      }
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone contact content
 */
export async function getContact() {
  const query = `
    *[_type == "contact"][0] {
      _id,
      title,
      description,
      email,
      phone,
      address,
      formTitle,
      backgroundImage {
        ...,
        asset->
      }
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone footer content
 */
export async function getFooter() {
  const query = `
    *[_type == "footer"][0] {
      _id,
      _type,
      copyright,
      socialLinks[] {
        label,
        url
      }
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch standalone workshops content
 */
export async function getWorkshops() {
  const query = `
    *[_type == "workshops"][0] {
      _id,
      _type,
      images[] {
        _key,
        alt,
        asset->
      }
    }
  `

  return sanityClient.fetch(query)
}
