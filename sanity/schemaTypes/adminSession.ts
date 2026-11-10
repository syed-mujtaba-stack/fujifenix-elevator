import { defineField, defineType } from 'sanity'

/**
 * adminSession — tracks individual sign-in sessions so admins can list
 * their own active sessions and the superadmin can revoke any session
 * remotely. One document per successful login. The `sessionId` lives in the
 * NextAuth JWT; every authenticated request validates the matching document
 * still exists and is not revoked.
 */
export const adminSession = defineType({
  name: 'adminSession',
  title: 'Admin Session',
  type: 'document',
  fields: [
    defineField({
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'Admin User',
      type: 'reference',
      to: [{ type: 'adminUser' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastSeenAt',
      title: 'Last Seen',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
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
      name: 'device',
      title: 'Device',
      type: 'string',
      description: 'Human-readable device summary, e.g. "Chrome on Windows".',
    }),
    defineField({
      name: 'isRevoked',
      title: 'Revoked',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'revokedAt',
      title: 'Revoked At',
      type: 'datetime',
    }),
    defineField({
      name: 'revokedBy',
      title: 'Revoked By',
      type: 'reference',
      to: [{ type: 'adminUser' }],
    }),
  ],
  preview: {
    select: {
      title: 'device',
      subtitle: 'createdAt',
    },
  },
})