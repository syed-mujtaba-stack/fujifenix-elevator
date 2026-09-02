import { defineField, defineType } from 'sanity'

export const pushSubscription = defineType({
  name: 'pushSubscription',
  title: 'Push Subscription',
  type: 'document',
  fields: [
    defineField({
      name: 'endpoint',
      title: 'Endpoint',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keys',
      title: 'Keys',
      type: 'object',
      fields: [
        defineField({ name: 'p256dh', title: 'P256DH', type: 'string' }),
        defineField({ name: 'auth', title: 'Auth', type: 'string' }),
      ],
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
    }),
    defineField({
      name: 'adminUser',
      title: 'Admin User',
      type: 'reference',
      to: [{ type: 'adminUser' }],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})