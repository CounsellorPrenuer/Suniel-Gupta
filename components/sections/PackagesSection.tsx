'use client'

import { useMemo, useState } from 'react'
import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

interface PackageFeature {
  text?: string
  included?: boolean
}

interface PackageCategoryItem {
  name?: string
  image?: any
  subtitle?: string
  price?: string
  description?: string
  features?: string[]
  unavailableFeatures?: string[]
  markAsPopular?: boolean
  badgeText?: string
  buttonLabel?: string
  buttonLink?: string
}

interface PackageCategory {
  categoryName?: string
  packages?: PackageCategoryItem[]
}

interface PackagePlan {
  audienceKey?: string
  badge?: string
  title?: string
  subtitle?: string
  price?: string
  description?: string
  features?: PackageFeature[]
  ctaLabel?: string
  ctaLink?: string
  featured?: boolean
}

interface AudienceTab {
  label?: string
  key?: string
}

interface AddOnItem {
  title?: string
  price?: string
  description?: string
  image?: any
  iconEmoji?: string
  buttonLabel?: string
  buttonLink?: string
}

const screenshotFallbackAddOns: AddOnItem[] = [
  {
    title: 'CV Building',
    price: '₹2000',
    description:
      'Our HR experts will help you build a CV that stands out and increases your chances of getting interview calls.',
    iconEmoji: '📄',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'LinkedIn Profile Building',
    price: '₹2000',
    description:
      'Revamp your LinkedIn profile with recommendations from recruitment experts to showcase your career journey.',
    iconEmoji: 'in',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'LinkedIn Profile + CV Building',
    price: '₹3500',
    description:
      'Get your CV and LinkedIn profile built by HR/Recruitment experts in one bundled package.',
    iconEmoji: '🗂',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Job Application Strategy',
    price: '₹4000',
    description:
      'Build the right interview pipeline through a customized application tracker and action plan.',
    iconEmoji: '💼',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Career Report',
    price: '₹2500',
    description:
      'Get a scientific analysis of your interests, personality and abilities with detailed career recommendations.',
    iconEmoji: '📋',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Career Report + Career Counselling',
    price: '₹4000',
    description:
      'Connect with top career coaches and shortlist the top paths you are most likely to enjoy and excel in.',
    iconEmoji: '📝',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Knowledge Gateway + Career Helpline Access',
    price: '₹250/month',
    description:
      'Access holistic career information and direct support from dedicated career experts.',
    iconEmoji: '💬',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'One-to-One Session with a Career Expert',
    price: '₹3500 per interaction for 1 hour',
    description:
      'Resolve your career queries and gain clarity through a one-on-one session with an expert.',
    iconEmoji: '🗣',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Overseas Admission Planner',
    price: '₹3000 for a planner with top 10 colleges in India OR any 1 country abroad',
    description:
      'Get unbiased recommendations and organized details on your future college options in India and abroad.',
    iconEmoji: '🌍',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Overseas Admission: SOP Brainstorm',
    price: '₹3000 for a one-hour session',
    description:
      'Structure your SOP in the ideal manner through discussions with overseas admissions experts.',
    iconEmoji: '🌍',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Overseas Admission: SOP Review',
    price: '₹2500',
    description:
      'Get your SOP/Essay reviewed by admissions experts to improve your chances of shortlist.',
    iconEmoji: '🌍',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
  {
    title: 'Interview Prep Session',
    price: '₹2000',
    description:
      'Ace upcoming interviews with guidance from top HR experts and boost your chances of landing your dream job.',
    iconEmoji: '🧑‍💼',
    buttonLabel: 'BUY NOW',
    buttonLink: '#',
  },
]

export function PackagesSection({
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
  addOns,
}: SectionProps) {
  const safeTabs: AudienceTab[] = Array.isArray(audienceTabs) ? audienceTabs : []
  const safePlans: PackagePlan[] = Array.isArray(plans) ? plans : []
  const safeAddOns: AddOnItem[] = Array.isArray(addOns) ? addOns : []
  const safeCategories: PackageCategory[] = Array.isArray(packageCategories) ? packageCategories : []

  const finalAddOns = safeAddOns.length > 0 ? safeAddOns : screenshotFallbackAddOns
  const finalAddOnsHeading = addOnsHeading || 'Want To Customise Your Mentorship Plan?'
  const finalAddOnsDescription =
    addOnsDescription ||
    'If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:'

  const hasCategoriesModel = safeCategories.length > 0

  const firstTabKey = hasCategoriesModel
    ? safeCategories[0]?.categoryName || 'all'
    : safeTabs[0]?.key || 'all'
  const [activeTab, setActiveTab] = useState(firstTabKey)

  const normalizedTabs = useMemo(() => {
    if (hasCategoriesModel) {
      return safeCategories.map((cat, idx) => ({
        label: cat.categoryName || `Category ${idx + 1}`,
        key: cat.categoryName || `category-${idx}`,
      }))
    }
    return safeTabs
  }, [hasCategoriesModel, safeCategories, safeTabs])

  const visiblePlans = useMemo(() => {
    if (hasCategoriesModel) {
      const selectedCategory = safeCategories.find((cat) => (cat.categoryName || '').trim() === activeTab)
      const categoryPackages = Array.isArray(selectedCategory?.packages) ? selectedCategory!.packages! : []

      return categoryPackages.map((item) => {
        const includedFeatures = (Array.isArray(item.features) ? item.features : []).map((text) => ({ text, included: true }))
        const excludedFeatures = (Array.isArray(item.unavailableFeatures) ? item.unavailableFeatures : []).map((text) => ({ text, included: false }))
        return {
          title: item.name,
          subtitle: item.subtitle,
          price: item.price,
          description: item.description,
          features: [...includedFeatures, ...excludedFeatures],
          ctaLabel: item.buttonLabel || 'Book Now',
          ctaLink: item.buttonLink || '#',
          featured: item.markAsPopular,
          badge: item.badgeText,
        }
      })
    }

    if (!safePlans.length) return []
    if (activeTab === 'all') return safePlans
    return safePlans.filter((plan) => (plan.audienceKey || '').trim() === activeTab)
  }, [activeTab, hasCategoriesModel, safeCategories, safePlans])

  return (
    <section id={sectionId || 'packages'} className="packages-wrap">
      <div className="packages-shell">
        {(sectionTitle || sectionSubtitle || heading || subheading) && (
          <div className="packages-head">
            {(sectionTitle || heading) && <h2>{sectionTitle || heading}</h2>}
            {(sectionSubtitle || subheading) && <p>{sectionSubtitle || subheading}</p>}
          </div>
        )}

        {normalizedTabs.length > 0 && (
          <div className="packages-tabs">
            {normalizedTabs.map((tab, index) => {
              const tabKey = tab.key || `tab-${index}`
              const isActive = activeTab === tabKey
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`packages-tab ${isActive ? 'active' : ''}`}
                >
                  {tab.label || `Option ${index + 1}`}
                </button>
              )
            })}
          </div>
        )}

        {visiblePlans.length > 0 && (
          <div className="plans-grid" style={{ marginBottom: finalAddOns.length > 0 ? '54px' : 0 }}>
            {visiblePlans.map((plan, index) => (
              <article key={`${plan.title || 'plan'}-${index}`} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
                {plan.badge && (
                  <span className="plan-badge">{plan.badge}</span>
                )}

                {plan.subtitle && (
                  <p className="plan-subtitle">
                    {plan.subtitle}
                  </p>
                )}
                {plan.title && (
                  <h3 className="plan-title">
                    {plan.title}
                  </h3>
                )}
                {plan.price && (
                  <p className="plan-price">
                    {plan.price}
                  </p>
                )}
                {plan.description && (
                  <p className="plan-desc">{plan.description}</p>
                )}

                {Array.isArray(plan.features) && plan.features.length > 0 && (
                  <ul className="plan-features">
                    {plan.features.map((feature, featureIdx) => (
                      <li
                        key={`${feature.text || 'feature'}-${featureIdx}`}
                        className={`feature-item ${feature.included === false ? 'excluded' : ''}`}
                      >
                        <span className="feature-icon">{feature.included === false ? 'x' : 'v'}</span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {(plan.ctaLabel || plan.ctaLink) && (
                  <a
                    href={plan.ctaLink || '#'}
                    className="plan-cta"
                  >
                    {plan.ctaLabel || 'Learn More'}
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        {finalAddOns.length > 0 && (
          <div>
            {(finalAddOnsHeading || finalAddOnsDescription) && (
              <div className="addons-head">
                {finalAddOnsHeading && <h3>{finalAddOnsHeading}</h3>}
                {finalAddOnsDescription && <p>{finalAddOnsDescription}</p>}
              </div>
            )}

            <div className="addons-grid">
              {finalAddOns.map((item, idx) => {
                const imageUrl = item.image ? urlForImage(item.image).width(640).height(420).fit('max').ignoreImageParams().url() : null
                return (
                  <article key={`${item.title || 'addon'}-${idx}`} className="addon-card">
                    <div className="addon-media">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.title || 'Package item'}
                          style={{ width: '74px', height: '74px', objectFit: 'contain' }}
                        />
                      ) : (
                        <span className="addon-no-image">{item.iconEmoji || '📌'}</span>
                      )}
                    </div>

                    <div className="addon-body">
                      {item.title && (
                        <h4>
                          {item.title}
                        </h4>
                      )}
                      {item.price && (
                        <p className="addon-price">
                          {item.price}
                        </p>
                      )}
                      {item.description && (
                        <p className="addon-desc">
                          {item.description}
                        </p>
                      )}

                      {(item.buttonLabel || item.buttonLink) && (
                        <a
                          href={item.buttonLink || '#'}
                          className="addon-cta"
                        >
                          {item.buttonLabel || 'Buy Now'}
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .packages-wrap {
          padding: 72px 20px;
          background: var(--color-background);
        }

        .packages-shell {
          max-width: 2200px;
          width: 95%;
          margin: 0 auto;
          padding: 40px 0;
        }

        .packages-head {
          text-align: center;
          margin-bottom: 24px;
        }

        .packages-head h2 {
          margin: 0;
          font-size: clamp(2rem, 3.2vw, 3rem);
          line-height: 1.1;
          color: var(--color-primary);
          letter-spacing: -0.02em;
        }

        .packages-head p {
          margin: 10px 0 0;
          color: var(--color-text-secondary);
          font-size: 1rem;
        }

        .packages-tabs {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .packages-tab {
          border: 1px solid rgba(13, 42, 99, 0.12);
          border-radius: 999px;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          background: #ffffff;
          color: var(--color-primary);
        }

        .packages-tab.active {
          background: var(--color-primary);
          color: #ffffff;
          border-color: var(--color-primary);
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          justify-content: center;
          gap: 20px;
        }

        .plan-card {
          padding: 30px;
          background: white;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 4px 16px rgba(13, 42, 99, 0.08);
          border: 1px solid #eee;
          transition: transform 0.3s ease;
        }

        .plan-card.featured {
          border-width: 2px;
          box-shadow: 0 10px 20px rgba(13, 42, 99, 0.14);
        }

        .plan-badge {
          position: absolute;
          right: 18px;
          top: -11px;
          background: #17a878;
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 800;
          border-radius: 8px;
          padding: 4px 10px;
        }

        .plan-subtitle {
          margin: 0 0 10px;
          color: #4f6288;
          font-weight: 800;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          font-size: 0.84rem;
        }

        .plan-title {
          margin: 0;
          font-size: 3rem;
          line-height: 1.1;
          color: var(--color-primary);
          font-weight: 800;
        }

        .plan-price {
          margin: 15px 0 20px;
          font-size: 3.5rem;
          line-height: 1;
          color: var(--color-primary);
          font-weight: 900;
        }

        .plan-desc {
          margin: 0 0 14px;
          color: #3b4d72;
          line-height: 1.55;
        }

        .plan-features {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
          flex: 1;
        }

        .feature-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 10px;
          color: #21365f;
          align-items: start;
          line-height: 1.45;
        }

        .feature-item.excluded {
          color: #7f8ba3;
          text-decoration: line-through;
        }

        .feature-icon {
          margin-top: 2px;
          font-size: 0.85rem;
          font-weight: 900;
          color: var(--color-primary);
          text-decoration: none;
        }

        .feature-item.excluded .feature-icon {
          color: #8e99ae;
        }

        .plan-cta {
          margin-top: 20px;
          text-decoration: none;
          background: var(--color-primary);
          color: #ffffff;
          border-radius: 9px;
          padding: 12px 16px;
          font-weight: 800;
          display: inline-flex;
          justify-content: center;
          width: 100%;
        }

        .addons-head {
          text-align: center;
          margin-bottom: 22px;
        }

        .addons-head h3 {
          margin: 0;
          color: var(--color-primary);
          font-size: clamp(2.2rem, 3.4vw, 3.4rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .addons-head p {
          margin: 12px auto 0;
          color: var(--color-text-secondary);
          font-size: 1.2rem;
          max-width: 1000px;
        }

        .addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 22px;
        }

        .addon-card {
          display: grid;
          grid-template-columns: 170px 1fr;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(13, 42, 99, 0.16);
          min-height: 218px;
          box-shadow: 0 7px 16px rgba(13, 42, 99, 0.08);
        }

        .addon-media {
          background: #f2f6ff;
          min-height: 100%;
          display: grid;
          place-items: center;
          padding: 16px;
        }

        .addon-no-image {
          color: var(--color-primary);
          font-weight: 800;
          font-size: 2rem;
          line-height: 1;
        }

        .addon-body {
          padding: 20px 18px 16px;
        }

        .addon-body h4 {
          margin: 0 0 2px;
          color: var(--color-primary);
          font-size: 2rem;
          line-height: 1.2;
        }

        .addon-price {
          margin: 0 0 10px;
          color: var(--color-primary);
          font-weight: 900;
          font-size: 1.85rem;
        }

        .addon-desc {
          margin: 0 0 14px;
          color: #32456e;
          line-height: 1.55;
          font-size: 1.06rem;
        }

        .addon-cta {
          display: inline-flex;
          text-decoration: none;
          background: var(--color-primary);
          color: #ffffff;
          border-radius: 8px;
          padding: 10px 20px;
          font-weight: 800;
          font-size: 1rem;
        }

        @media (max-width: 740px) {
          .packages-wrap {
            padding: 62px 14px;
          }

          .plans-grid {
            grid-template-columns: 1fr;
          }

          .addon-card {
            grid-template-columns: 116px 1fr;
            min-height: 180px;
          }

          .addon-body h4 {
            font-size: 1.45rem;
          }

          .addon-price {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  )
}
