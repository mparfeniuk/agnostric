/**
 * Normalizes a URL string for reliable comparison (trims spaces, converts to lowercase, removes trailing slash).
 */
export const normalizeUrl = (url?: string): string => {
  if (!url) return ''
  return url.trim().toLowerCase().replace(/\/$/, '')
}

/**
 * Checks whether a given image URL matches the hero/metadata image URL.
 */
export const isHeroImage = (src?: string, heroImage?: string): boolean => {
  if (!src || !heroImage) return false
  return normalizeUrl(src) === normalizeUrl(heroImage)
}

/**
 * Extracts YouTube Video ID and returns an embeddable URL.
 */
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11
    ? `https://www.youtube-nocookie.com/embed/${match[2]}`
    : null
}

/**
 * Extracts Tweet ID from Twitter or X URLs.
 */
export const getTweetId = (url: string): string | null => {
  const match = url.match(/(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status\/(\d+)/)
  return match ? match[2] : null
}

/**
 * Validates if a URL points to an Instagram post or reel.
 */
export const isInstagramUrl = (url: string): boolean => {
  return /(?:instagram\.com|instagr\.am)\/(?:p|reel)\/([^/?#&]+)/.test(url)
}

/**
 * Extracts Video ID from TikTok URLs.
 */
export const getTikTokId = (url: string): string | null => {
  const match = url.match(/(?:tiktok\.com)\/@[\w.-]+\/video\/(\d+)/)
  return match ? match[1] : null
}

/**
 * Checks if the link text equals the URL itself.
 * Used to ensure we only replace standalone links with embedded widgets,
 * avoiding layout breaks for inline hyperlinked text.
 */
export const isStandaloneLink = (children: any, href: string): boolean => {
  if (!children) return true
  const text = Array.isArray(children) ? children.join('') : String(children)
  return normalizeUrl(text) === normalizeUrl(href)
}