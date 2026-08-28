export interface GalleryImage {
  src: string;
  alt: string;
  _key?: string;
}

export interface SpecItem {
  label: string;
  value: string;
  _key?: string;
}

export interface SpecGroup {
  title: string;
  sectionImages?: string[] | null;
  sectionDescription?: string | null;
  items: SpecItem[] | null;
  _key?: string;
}

export interface TechnicalDrawing {
  title: string;
  drawingGroup: 'machine-room' | 'mrl' | 'general';
  src: string;
  _key?: string;
}

export interface SanityProductItem {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
  features: string[] | null;
  image: unknown;
  gallery: GalleryImage[] | null;
  category: string;
  categorySlug: string;
}

export interface SanityProductDetail extends SanityProductItem {
  specGroups: SpecGroup[] | null;
  technicalDrawings: TechnicalDrawing[] | null;
  disclaimer: string | null;
  imageDisclaimer: string | null;
  designedFor: string[] | null;
  configurationNote: string | null;
  related: { _id: string; title: string; slug: string; category: string; image: unknown; gallery: { src: string; alt: string }[] | null }[] | null;
}

export interface SanityCategoryItem {
  _id: string;
  title: string;
  slug: string;
  group: string;
  description: string | null;
  image: unknown;
  productCount: number;
}

const galleryProjection = `
    gallery[] { _key, src, alt },
`
const detailProjections = `
    ${galleryProjection}
    "specGroups": specGroups[] { title, sectionImages, sectionDescription, items[] { label, value } },
    "technicalDrawings": technicalDrawings[] { title, drawingGroup, src },
    "disclaimer": disclaimer,
    "imageDisclaimer": imageDisclaimer,
    "designedFor": designedFor,
    "configurationNote": configurationNote,
`

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
    ${galleryProjection}
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
    ${detailProjections}
    "category": category->title,
    "categorySlug": category->slug.current,
    "related": *[_type == "product" && category._ref == ^.category._ref && slug.current != ^.slug.current] | order(order asc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      image,
      "gallery": gallery[] { src, alt }
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
    ${galleryProjection}
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
  ${galleryProjection}
    "category": category->title,
    "categorySlug": category->slug.current
  }
`