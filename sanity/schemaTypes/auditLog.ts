import { defineField, defineType } from 'sanity'

export const auditLog = defineType({
  name: 'auditLog',
  title: 'Audit Log',
  type: 'document',
  fields: [
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
      options: {
        list: ['create', 'update', 'delete', 'login', 'logout', 'password_change', '2fa_setup', '2fa_disable'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entityType',
      title: 'Entity Type',
      type: 'string',
      options: {
        list: ['product', 'category', 'inquiry', 'popup', 'adminUser', 'settings'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entityId',
      title: 'Entity ID',
      type: 'string',
    }),
    defineField({
      name: 'adminUser',
      title: 'Admin User',
      type: 'reference',
      to: [{ type: 'adminUser' }],
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [],
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})