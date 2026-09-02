import { defineField, defineType } from 'sanity'

export const popup = defineType({
  name: 'popup',
  title: 'Popup / Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['modal', 'banner', 'slide-in', 'fullscreen'],
      },
      initialValue: 'modal',
    }),
    defineField({
      name: 'trigger',
      title: 'Trigger',
      type: 'string',
      options: {
        list: ['onLoad', 'onScroll', 'onExit', 'onClick', 'timer'],
      },
      initialValue: 'onLoad',
    }),
    defineField({
      name: 'triggerConfig',
      title: 'Trigger Configuration',
      type: 'object',
      fields: [
        defineField({ name: 'delay', title: 'Delay (seconds)', type: 'number' }),
        defineField({ name: 'scrollPercentage', title: 'Scroll %', type: 'number' }),
        defineField({ name: 'selector', title: 'Click Selector', type: 'string' }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'subheadline', title: 'Subheadline', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text' }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'primaryCTA',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Text', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'style', title: 'Style', type: 'string', options: { list: ['primary', 'secondary', 'ghost'] } }),
          ],
        }),
        defineField({
          name: 'secondaryCTA',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Text', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'style', title: 'Style', type: 'string', options: { list: ['primary', 'secondary', 'ghost'] } }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'targeting',
      title: 'Targeting',
      type: 'object',
      fields: [
        defineField({ name: 'paths', title: 'URL Paths', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'countries', title: 'Countries', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'devices', title: 'Devices', type: 'array', of: [{ type: 'string', options: { list: ['desktop', 'mobile', 'tablet'] } }] }),
        defineField({ name: 'userSegments', title: 'User Segments', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'showOnce', title: 'Show Once', type: 'boolean', initialValue: true }),
        defineField({ name: 'frequencyCap', title: 'Frequency Cap (days)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'object',
      fields: [
        defineField({ name: 'startDate', title: 'Start Date', type: 'datetime' }),
        defineField({ name: 'endDate', title: 'End Date', type: 'datetime' }),
        defineField({ name: 'timezone', title: 'Timezone', type: 'string', initialValue: 'Asia/Shanghai' }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({ name: 'impressions', title: 'Impressions', type: 'number', initialValue: 0 }),
        defineField({ name: 'clicks', title: 'Clicks', type: 'number', initialValue: 0 }),
        defineField({ name: 'conversions', title: 'Conversions', type: 'number', initialValue: 0 }),
      ],
    }),
  ],
})