export interface Category {
  _id: string
  name: string
  slug: { current: string }
  picture?: { asset: { _ref: string } }
  startingPrice?: number
}

export interface Dress {
  _id: string
  name: string
  code: string
  price: number
  displayPrice?: number
  description?: string
  images: { asset: { _ref: string } }[] | { _id: string; url: string }[]
  sizes?: string[]
  colors?: string[]
  categories?: Category[]
  inStock: boolean
}
