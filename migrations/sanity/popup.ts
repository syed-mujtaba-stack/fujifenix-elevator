import { defineType, defineField } from 'sanity'

export const popup = defineType({
  name: 'popup',
  title: 'Popup',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: [{ title: 'Timed', value: 'timed' }, { title: 'Exit Intent', value: 'exit-intent' }, { title: 'Scroll Triggered', value: 'scroll' }, { title: 'Banner', value: 'banner' }, { title: 'Custom Page', value: 'custom-page' }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'content', title: 'Content', type: 'text' }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
    defineField({ name: 'showOnPages', title: 'Show On Pages', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'frequency',
      title: 'Frequency',
      type: 'string',
      options: { list: [{ title: 'Once', value: 'once' }, { title: 'Every Visit', value: 'every-visit' }, { title: 'Every Session', value: 'every-session' }] },
      initialValue: 'every-visit',
    }),
    defineField({ name: 'delay', title: 'Delay (seconds)', type: 'number', initialValue: 0 }),
    defineField({ name: 'scrollPercent', title: 'Scroll Percent', type: 'number', initialValue: 50 }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'string' }),
    defineField({ name: 'endDate', title: 'End Date', type: 'string' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  initialValue: { active: true, frequency: 'every-visit', order: 0 },
})
