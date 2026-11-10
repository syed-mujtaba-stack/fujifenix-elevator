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
      name: 'phone',
      title: 'Phone (PII — superadmin only in admin UI)',
      type: 'string',
      description: 'Never exposed to non-superadmin roles.',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Super Admin (users/settings/full access — one only)', value: 'superadmin' },
          { title: 'Admin (inquiries + popups + content)', value: 'admin' },
          { title: 'Editor (products / content only)', value: 'editor' },
          { title: 'Viewer (read-only, aggregate stats, no PII)', value: 'viewer' },
        ],
      },
      initialValue: 'editor',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'passwordChangedAt',
      title: 'Password Last Changed',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'mustChangePassword',
      title: 'Must Change Password on Next Login',
      type: 'boolean',
      initialValue: false,
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
      readOnly: true,
    }),
    defineField({
      name: 'lastLoginIp',
      title: 'Last Login IP',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'lastLoginDevice',
      title: 'Last Login Device',
      type: 'string',
      readOnly: true,
    }),
    // Login hardening — rate limiting / lockout
    defineField({
      name: 'failedLoginAttempts',
      title: 'Consecutive Failed Logins',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'lockoutUntil',
      title: 'Locked Until',
      type: 'datetime',
    }),
    defineField({
      name: 'twoFactorEnabled',
      title: 'Two-Factor Enabled',
      type: 'boolean',
      initialValue: false,
      readOnly: true,
    }),
    defineField({
      name: 'twoFactorSecret',
      title: '2FA Secret',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    // Preferences (persisted — timezone, theme, notifications)
    defineField({
      name: 'preferences',
      title: 'Preferences',
      type: 'object',
      fields: [
        defineField({ name: 'timezone', title: 'Timezone', type: 'string', initialValue: 'Asia/Shanghai' }),
        defineField({ name: 'language', title: 'Language', type: 'string', initialValue: 'en' }),
        defineField({ name: 'theme', title: 'Theme', type: 'string', options: { list: ['light', 'dark', 'system'] }, initialValue: 'system' }),
        defineField({
          name: 'notifications',
          title: 'Notifications',
          type: 'object',
          fields: [
            defineField({ name: 'newInquiry', title: 'New Inquiry', type: 'boolean', initialValue: true }),
            defineField({ name: 'inquiryReply', title: 'Inquiry Reply', type: 'boolean', initialValue: true }),
            defineField({ name: 'popupAlerts', title: 'Popup Alerts', type: 'boolean', initialValue: true }),
            defineField({ name: 'systemAlerts', title: 'System Alerts', type: 'boolean', initialValue: true }),
          ],
        }),
      ],
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
        defineField({ name: 'subscribedAt', title: 'Subscribed At', type: 'datetime' }),
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})