import { Media } from '@components/Media'
import type { Media as MediaType, Property } from '@payload-types'
import { formatAuthors } from '@utils/formatAuthors'
import { formatDateTime } from '@utils/formatDateTime'
import { cn } from '@utils/ui'
import React from 'react'

export const PropertyHero: React.FC<{
  record: Property
}> = ({ record }) => {
  const { categories, gallery, populatedAuthors, publishedAt, title } = record

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== ''

  const heroImage = gallery?.images?.[0] as MediaType

  return (
    <div
      className={cn('min-h-[80vh] ', 'relative -mt-[10.4rem] flex items-end')}
    >
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { value } = category
                // Handle both cases where value might be a number (id) or the populated category object
                const categoryTitle =
                  typeof value === 'object' ? value.title : 'Untitled category'

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="select-none absolute inset-0">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            fill
            priority
            imgClassName="-z-10 object-cover"
            resource={heroImage}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
