import { defineType, defineField } from 'sanity'

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'subject', title: 'Subject', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'projectType', title: 'Project Type', type: 'string' }),
    defineField({ name: 'floors', title: 'Floors', type: 'string' }),
    defineField({ name: 'units', title: 'Units', type: 'string' }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: { list: [{ title: 'CTA', value: 'cta' }, { title: 'Contact', value: 'contact' }, { title: 'Popup', value: 'popup' }] },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: [{ title: 'New', value: 'new' }, { title: 'Read', value: 'read' }, { title: 'Replied', value: 'replied' }, { title: 'Archived', value: 'archived' }] },
      initialValue: 'new',
    }),
    defineField({
      name: 'replies',
      title: 'Replies',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'message', title: 'Message', type: 'text' }),
          defineField({ name: 'sentBy', title: 'Sent By', type: 'string', options: { list: [{ title: 'Admin', value: 'admin' }, { title: 'User', value: 'user' }] } }),
          defineField({ name: 'timestamp', title: 'Timestamp', type: 'string' }),
          defineField({ name: 'emailSent', title: 'Email Sent', type: 'boolean', initialValue: false }),
        ],
      }],
    }),
    defineField({ name: 'createdAt', title: 'Created At', type: 'string' }),
    defineField({ name: 'updatedAt', title: 'Updated At', type: 'string' }),
    defineField({ name: 'readAt', title: 'Read At', type: 'string' }),
  ],
  initialValue: { status: 'new', replies: [] },
})
