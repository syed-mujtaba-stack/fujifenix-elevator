import { defineField, defineType } from 'sanity'

export const adminUser = defineType({
  name: 'adminUser',
  title: 'Admin User',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: ['superadmin', 'admin', 'editor'],
      },
      initialValue: 'editor',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime',
    }),
    defineField({
      name: 'twoFactorSecret',
      title: '2FA Secret',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'pushSubscription',
      title: 'Push Subscription',
      type: 'object',
      hidden: true,
      fields: [
        defineField({ name: 'endpoint', title: 'Endpoint', type: 'string' }),
        defineField({
          name: 'keys',
          title: 'Keys',
          type: 'object',
          fields: [
            defineField({ name: 'p256dh', title: 'P256DH', type: 'string' }),
            defineField({ name: 'auth', title: 'Auth', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})