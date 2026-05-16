import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { updateMetaTags, SEOConfig } from './seo'

describe('updateMetaTags', () => {
  beforeEach(() => {
    // Clear head before each test
    document.head.innerHTML = ''
  })

  afterEach(() => {
    // Clean up
    document.head.innerHTML = ''
  })

  it('updates document.title', () => {
    const config: SEOConfig = { title: 'Test Title', description: 'Test Description' }
    updateMetaTags(config)
    expect(document.title).toBe('Test Title')
  })

  it('creates standard meta tags when they do not exist', () => {
    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
      keywords: 'test, keywords',
      robots: 'noindex, nofollow',
      author: 'Test Author',
    }

    updateMetaTags(config)

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Test Description')
    expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toBe('test, keywords')
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow')
    expect(document.querySelector('meta[name="author"]')?.getAttribute('content')).toBe('Test Author')
  })

  it('updates standard meta tags when they already exist', () => {
    document.head.innerHTML = `
      <meta name="description" content="Old Description">
      <meta name="keywords" content="old, keywords">
    `

    const config: SEOConfig = {
      title: 'Test Title',
      description: 'New Description',
      keywords: 'new, keywords',
    }

    updateMetaTags(config)

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('New Description')
    expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toBe('new, keywords')
    // Ensure we don't have multiple elements
    expect(document.querySelectorAll('meta[name="description"]').length).toBe(1)
  })

  it('creates Open Graph meta tags', () => {
    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
      ogTitle: 'OG Title',
      ogDescription: 'OG Description',
      ogType: 'article',
      ogImage: 'https://example.com/image.jpg',
    }

    updateMetaTags(config)

    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('OG Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('OG Description')
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article')
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://example.com/image.jpg')
  })

  it('falls back to standard title and description for Open Graph if not provided', () => {
    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
    }

    updateMetaTags(config)

    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Test Title')
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('Test Description')
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website') // Default fallback
  })

  it('creates Twitter Card meta tags', () => {
    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
      twitterCard: 'summary',
      twitterCreator: '@testcreator',
    }

    updateMetaTags(config)

    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary')
    expect(document.querySelector('meta[name="twitter:creator"]')?.getAttribute('content')).toBe('@testcreator')
  })

  it('falls back to default twitter card if not provided', () => {
    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
    }

    updateMetaTags(config)

    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image')
  })

  it('creates canonical link', () => {
    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
      canonicalUrl: 'https://example.com/test',
    }

    updateMetaTags(config)

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://example.com/test')
  })

  it('updates canonical link if it already exists', () => {
    document.head.innerHTML = '<link rel="canonical" href="https://example.com/old">'

    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
      canonicalUrl: 'https://example.com/new',
    }

    updateMetaTags(config)

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://example.com/new')
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1)
  })

  it('creates structured data script', () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Test Business',
    }

    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
      structuredData,
    }

    updateMetaTags(config)

    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script?.textContent).toBe(JSON.stringify(structuredData))
  })

  it('replaces existing structured data script', () => {
    document.head.innerHTML = '<script type="application/ld+json">{"@type":"OldBusiness"}</script>'

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'New Business',
    }

    const config: SEOConfig = {
      title: 'Test Title',
      description: 'Test Description',
      structuredData,
    }

    updateMetaTags(config)

    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    expect(scripts.length).toBe(1)
    expect(scripts[0].textContent).toBe(JSON.stringify(structuredData))
  })
})
