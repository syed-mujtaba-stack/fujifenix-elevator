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
        list: [
          'login', 'login_failed', 'logout', 'logout_all',
          'create', 'update', 'delete',
          'password_change', '2fa_setup', '2fa_disable',
          'session_revoke', 'session_revoke_all',
          'role_change', 'user_create', 'user_update', 'user_deactivate', 'user_activate',
          'export', 'settings_update', 'profile_update', 'push_subscribe', 'push_unsubscribe',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entityType',
      title: 'Entity Type',
      type: 'string',
      options: {
        list: [
          'product', 'category', 'inquiry', 'popup', 'adminUser', 'adminSession', 'settings', 'auth', 'push',
        ],
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
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'text',
      description: 'JSON formatted metadata details',
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
  preview: {
    select: {
      title: 'action',
      subtitle: 'entityType',
    },
  },
})