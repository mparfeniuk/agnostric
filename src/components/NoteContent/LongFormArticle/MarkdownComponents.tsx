// components/MarkdownComponents.tsx
import React from 'react'
import { Tweet } from 'react-tweet'
import { InstagramEmbed } from 'react-social-media-embed'
import {
  getYouTubeEmbedUrl,
  getTweetId,
  isInstagramUrl,
  getTikTokId,
  isHeroImage,
  isStandaloneLink,
} from '@/lib/media-utils'

interface CustomMarkdownOptions {
  heroImage?: string
  existingComponents?: Record<string, React.ComponentType<any>>
}

export const createMarkdownComponents = (options: CustomMarkdownOptions = {}) => {
  const { heroImage, existingComponents = {} } = options

  return {
    ...existingComponents,

    // Intercept <img> tags: omit rendering if the image matches the metadata/hero image
    img: ({ node, src, alt, ...props }: any) => {
      if (isHeroImage(src, heroImage)) {
        return null // Skip duplicate hero image in content body
      }

      const CustomImg = existingComponents.img
      if (CustomImg) {
        return <CustomImg node={node} src={src} alt={alt} {...props} />
      }

      return <img src={src} alt={alt} className="my-2 max-w-full rounded-lg" {...props} />
    },

    // Handle HTML <video> tags (parsed via rehype-raw)
    video: ({ src, ...props }: any) => {
      if (!src) return null
      return (
        <video
          src={src}
          controls
          playsInline
          className="my-3 max-h-[500px] w-full rounded-xl bg-black"
          {...props}
        />
      )
    },

    // Handle <a> tags: convert URLs to embedded media components if applicable
    a: ({ node, href, children, ...props }: any) => {
      if (!href) return <a href={href} {...props}>{children}</a>

      // Check if the link is on its own line (standalone URL)
      const standalone = isStandaloneLink(children, href)

      if (standalone) {
        // YouTube Embed
        const ytEmbed = getYouTubeEmbedUrl(href)
        if (ytEmbed) {
          return (
            <span className="my-3 block aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={ytEmbed}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
            </span>
          )
        }

        // Twitter / X Embed
        const tweetId = getTweetId(href)
        if (tweetId) {
          return (
            <span className="my-3 flex justify-center light">
              <Tweet id={tweetId} />
            </span>
          )
        }

        // Instagram Embed
        if (isInstagramUrl(href)) {
          return (
            <span className="my-3 flex justify-center overflow-hidden rounded-xl">
              <InstagramEmbed url={href} width={328} />
            </span>
          )
        }

        // TikTok Embed
        const tiktokId = getTikTokId(href)
        if (tiktokId) {
          return (
            <span className="my-3 flex justify-center overflow-hidden rounded-xl">
              <iframe
                src={`https://www.tiktok.com/embed/v2/${tiktokId}`}
                className="h-[580px] w-full max-w-[325px] border-0"
                allowFullScreen
              />
            </span>
          )
        }
      }

      // Fallback for regular inline hyperlinks
      const CustomA = existingComponents.a
      if (CustomA) {
        return <CustomA node={node} href={href} children={children} {...props} />
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" {...props}>
          {children}
        </a>
      )
    },
  }
}