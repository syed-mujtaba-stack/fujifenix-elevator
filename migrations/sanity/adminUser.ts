import { defineType, defineField } from 'sanity'

export const adminUser = defineType({
  name: 'adminUser',
  title: 'Admin User',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'password', title: 'Password (bcrypt)', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: { list: [{ title: 'Super Admin', value: 'super-admin' }, { title: 'Admin', value: 'admin' }, { title: 'Viewer', value: 'viewer' }] },
      initialValue: 'admin',
    }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
})
