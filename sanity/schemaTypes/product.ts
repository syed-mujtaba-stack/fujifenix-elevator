import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery (local image paths)',
      type: 'array',
      of: [
        defineField({
          name: 'galleryImage',
          title: 'Gallery Image',
          type: 'object',
          fields: [
            defineField({
              name: 'src',
              title: 'Image Path',
              type: 'string',
              description: 'Public URL path, e.g. /Elevators/Passenger%20Elevator%20Cabin/Passenger%20Elevator%20Cabin.png',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'specGroups',
      title: 'Technical Specifications',
      type: 'array',
      of: [
        defineField({
          name: 'specGroup',
          title: 'Specification Group',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Group Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Specifications',
              type: 'array',
              of: [
                defineField({
                  name: 'spec',
                  title: 'Specification',
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required() }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'technicalDrawings',
      title: 'Technical Drawings (local image paths)',
      type: 'array',
      of: [
        defineField({
          name: 'drawing',
          title: 'Technical Drawing',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'drawingGroup',
              title: 'Drawing Group',
              type: 'string',
              options: {
                list: [
                  { title: 'General Traction — Machine Room Type', value: 'machine-room' },
                  { title: 'Machine-Room-Less (MRL) Type', value: 'mrl' },
                  { title: 'Common / Entrance', value: 'general' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'src',
              title: 'Image Path',
              type: 'string',
              description: 'Public URL path, e.g. /Elevators/Passenger%20Elevator%20Cabin/blueprints/Machine%20Room%20Type.png',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer (e.g. specifications may vary by project)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'imageDisclaimer',
      title: 'Image Disclaimer (e.g. images for illustrative purposes only)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})