import { getCategories, getDresses } from '@/lib/queries'
import CatalogClient from './CatalogClient'

export const revalidate = 60

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const filters = {
    search: params.search,
    categories: params.categories ? params.categories.split(',') : undefined,
    colors: params.colors ? params.colors.split(',') : undefined,
    sizes: params.sizes ? params.sizes.split(',') : undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  }

  const [dresses, categories] = await Promise.all([
    getDresses(filters),
    getCategories(),
  ])

  return <CatalogClient dresses={dresses} categories={categories} initialFilters={filters} />
}
