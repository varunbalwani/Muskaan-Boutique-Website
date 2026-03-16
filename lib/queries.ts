import { client } from './sanity'
import { Category, Dress } from './types'

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{ aboutImage, aboutText }`)
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(`*[_type == "category"] | order(name asc) {
    _id, name, slug, picture, startingPrice
  }`)
}

export async function getFeaturedDresses(): Promise<Dress[]> {
  return client.fetch(
    `*[_type == "dress" && inStock == true][0...8] {
      _id, name, code, price, displayPrice, images, sizes, colors, inStock,
      categories[]->{ _id, name, slug }
    }`
  )
}

export async function getDresses(filters?: {
  categories?: string[]
  colors?: string[]
  sizes?: string[]
  minPrice?: number
  maxPrice?: number
  search?: string
}): Promise<Dress[]> {
  let conditions = [`_type == "dress"`, `inStock == true`]

  if (filters?.search) {
    conditions.push(
      `(name match "*${filters.search}*" || code == "${filters.search}")`
    )
  }
  if (filters?.categories?.length) {
    const cats = filters.categories.map((c) => `"${c}"`).join(',')
    conditions.push(`count((categories[]->slug.current)[@ in [${cats}]]) > 0`)
  }
  if (filters?.colors?.length) {
    const cols = filters.colors.map((c) => `"${c}"`).join(',')
    conditions.push(`count((colors)[@ in [${cols}]]) > 0`)
  }
  if (filters?.sizes?.length) {
    const szs = filters.sizes.map((s) => `"${s}"`).join(',')
    conditions.push(`count((sizes)[@ in [${szs}]]) > 0`)
  }
  if (filters?.minPrice) conditions.push(`price >= ${filters.minPrice}`)
  if (filters?.maxPrice) conditions.push(`price <= ${filters.maxPrice}`)

  const query = `*[${conditions.join(' && ')}] {
    _id, name, code, price, displayPrice, images, sizes, colors, inStock,
    categories[]->{ _id, name, slug }
  }`

  return client.fetch(query)
}

export async function getRelatedDresses(
  categoryIds: string[],
  excludeId: string,
  start: number,
  limit: number
): Promise<Dress[]> {
  if (!categoryIds.length) return []
  const cats = categoryIds.map((id) => `"${id}"`).join(',')
  return client.fetch(
    `*[_type == "dress" && inStock == true && _id != $excludeId && count((categories[]._ref)[@ in [${cats}]]) > 0]
    | order(_createdAt desc) [$start...$end] {
      _id, name, code, price, displayPrice, images, sizes, colors, inStock,
      categories[]->{ _id, name, slug }
    }`,
    { excludeId, start, end: start + limit }
  )
}

export async function getDressBySlug(id: string): Promise<Dress> {
  return client.fetch(
    `*[_type == "dress" && _id == $id][0] {
      _id, name, code, price, displayPrice, description, sizes, colors, inStock,
      "images": images[].asset->{ _id, url },
      categories[]->{ _id, name, slug }
    }`,
    { id }
  )
}
