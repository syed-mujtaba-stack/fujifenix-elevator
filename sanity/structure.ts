import { type StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) => {
  const { getClient } = context
  const client = getClient({ apiVersion: '2026-08-19' })

  const productsByCategory = S.listItem()
    .title('Products by Category')
    .child(() =>
      client
        .fetch<{ _id: string; title: string }[]>(
          `*[_type == "category"] | order(order asc) { _id, title }`
        )
        .then((categories) =>
          S.list()
            .title('Products by Category')
            .items(
              categories.map((cat) =>
                S.listItem()
                  .id(`category-${cat._id}`)
                  .title(cat.title)
                  .child(
                    S.documentList()
                      .id(`products-${cat._id}`)
                      .title(cat.title)
                      .filter(`_type == "product" && category._ref == $catId`)
                      .params({ catId: cat._id })
.defaultOrdering([{ field: 'order', direction: 'asc' }])
                    )
              )
            )
        )
    )

  return S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('product').title('All Products'),
      S.divider(),
      productsByCategory,
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
    ])
}