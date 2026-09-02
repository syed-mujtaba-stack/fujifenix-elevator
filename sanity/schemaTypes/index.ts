import { type SchemaTypeDefinition } from 'sanity'

import { category } from './category'
import { product } from './product'
import { adminUser } from './adminUser'
import { inquiry } from './inquiry'
import { inquiryReply } from './inquiry'
import { popup } from './popup'
import { pushSubscription } from './pushSubscription'
import { auditLog } from './auditLog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, adminUser, inquiry, inquiryReply, popup, pushSubscription, auditLog],
}