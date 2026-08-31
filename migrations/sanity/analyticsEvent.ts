import { defineType, defineField } from 'sanity'

export const analyticsEvent = defineType({
  name: 'analyticsEvent',
  title: 'Analytics Event',
  type: 'document',
  fields: [
    defineField({ name: 'event', title: 'Event', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'page', title: 'Page', type: 'string' }),
    defineField({ name: 'referrer', title: 'Referrer', type: 'string' }),
    defineField({ name: 'userAgent', title: 'User Agent', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'timestamp', title: 'Timestamp', type: 'string' }),
    defineField({ name: 'sessionId', title: 'Session ID', type: 'string' }),
    defineField({ name: 'metadata', title: 'Metadata', type: 'object' }),
  ],
})
