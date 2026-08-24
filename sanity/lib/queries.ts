export const categoriesQuery = `
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    group,
    description,
    image,
    "productCount": count(*[_type == "product" && category._ref == ^._id])
  }
`

export const categoryQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    group,
    description,
    image
  }
`

export const productsByCategoryQuery = `
  *[_type == "product" && category->slug.current == $slug] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    features,
    image,
    "category": category->title,
    "categorySlug": category->slug.current
  }
`

export const productQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    features,
    image,
    "category": category->title,
    "categorySlug": category->slug.current,
    "related": *[_type == "product" && category._ref == ^.category._ref && slug.current != ^.slug.current] | order(order asc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      image
    }
  }
`

export const featuredProductsQuery = `
  *[_type == "product"] | order(order asc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    description,
    features,
    image,
    "category": category->title,
    "categorySlug": category->slug.current
  }
`

export const allProductsQuery = `
  *[_type == "product"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
  description,
  image,
    "category": category->title,
    "categorySlug": category->slug.current
  }
`