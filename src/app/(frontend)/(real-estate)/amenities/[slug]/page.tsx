import { RelatedDocs } from '@CMS/blocks/RelatedDocs/Component'
import { BlogHero } from '@CMS/heros/Blog'
import { LivePreviewListener } from '@components/LivePreviewListener'
import { PayloadRedirects } from '@components/PayloadRedirects'
import RichText from '@components/RichText'
import { getDynamicMeta } from '@data/getDynamicMeta'
import { getAmenityBySlug } from '@data/real-estate/getAmenity'
import configPromise from '@payload-config'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { generateMeta } from '@services/seo/generateMeta'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const amenities = await payload.find({
    collection: 'amenities',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = amenities.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function AmenityPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/amenities/' + slug
  const amenity = await getAmenityBySlug({ slug })

  if (!amenity) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <BlogHero post={amenity} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            data={amenity.description as SerializedEditorState}
            enableGutter={false}
          />
          {amenity.relatedDocs && amenity.relatedDocs.length > 0 && (
            <RelatedDocs
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={amenity.relatedDocs.filter(
                (relatedDoc) => typeof relatedDoc === 'object',
              )}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const amenity = await getAmenityBySlug({ slug })

  if (!amenity) {
    const { siteName, siteDescription } = await getDynamicMeta()
    return {
      title: `Not Found | ${siteName}`,
      description: siteDescription,
    }
  }

  return generateMeta({ doc: amenity })
}
