/* GROQ queries tuned for the admin dashboard (server components only). */

export const adminStatsQuery = `{
  "products": count(*[_type == "product"]),
  "productsActive": count(*[_type == "product" && !(_id in path("drafts.**"))]),
  "inquiries": count(*[_type == "inquiry"]),
  "inquiriesNew": count(*[_type == "inquiry" && status == "new"]),
  "inquiriesOpen": count(*[_type == "inquiry" && status != "closed"]),
  "popups": count(*[_type == "popup"]),
  "popupsActive": count(*[_type == "popup" && isActive == true]),
  "users": count(*[_type == "adminUser" && isActive == true])
}`

/** Inquiry counts per day for the trailing N days (inquiry funnel / trends). */
export function adminInquiryTrendQuery(days: number): string {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
  return `*[_type == "inquiry" && createdAt >= $since] | order(createdAt asc) {
    _createdAt,
    status,
    source
  }`
    .replace('$since', `"${since}"`)
}

export const adminRecentActivityQuery = `*[_type == "auditLog"] | order(_createdAt desc) [0...15] {
  _id,
  action,
  entityType,
  entityId,
  "actor": adminUser->name,
  ipAddress,
  createdAt,
  metadata
}`

export const adminProductsQuery = `*[_type == "product"] | order(order asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  "categorySlug": category->slug.current,
  image,
  order,
  description,
  seoTitle,
  configuredAt: _updatedAt
}`

export const adminProductDetailQuery = `*[_type == "product" && _id == $id][0] {
  _id,
  title,
  "slug": slug.current,
  "categoryId": category->_id,
  "categoryTitle": category->title,
  description,
  features,
  image,
  "gallery": gallery[] { _key, src, alt },
  "specGroups": specGroups[] { _key, title, sectionImages, sectionDescription, items[] { _key, label, value } },
  "technicalDrawings": technicalDrawings[] { _key, title, drawingGroup, src },
  disclaimer,
  imageDisclaimer,
  designedFor,
  keyFeatures,
  applications,
  capacities,
  design,
  operation,
  tagline,
  configurationNote,
  order,
  seoTitle,
  seoDescription
}`

export const adminCategoriesQuery = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  "slug": slug.current
}`

export const adminInquiryListQuery = `*[_type == "inquiry"] | order(_createdAt desc) [0...200] {
  _id,
  name,
  email,
  phone,
  country,
  city,
  company,
  subject,
  message,
  status,
  source,
  "assignedTo": assignedTo->name,
  "assignedToId": assignedTo->_id,
  createdAt,
  updatedAt
}`

export const adminInquiryDetailQuery = `*[_type == "inquiry" && _id == $id][0] {
  _id,
  name,
  email,
  phone,
  country,
  city,
  company,
  subject,
  message,
  projectType,
  floors,
  units,
  status,
  source,
  "assignedTo": assignedTo->{ _id, name },
  "replies": replies[] { _key, message, "sentBy": sentBy->name, sentAt, isInternal },
  createdAt,
  updatedAt
}`

export const adminUsersQuery = `*[_type == "adminUser"] | order(_createdAt asc) {
  _id,
  name,
  email,
  phone,
  role,
  isActive,
  twoFactorEnabled,
  mustChangePassword,
  lastLogin,
  createdAt,
  "openSessions": count(*[_type == "adminSession" && user._ref == ^._id && isRevoked == false])
}`

export const adminAuditQuery = `*[_type == "auditLog"] | order(_createdAt desc) [0...200] {
  _id,
  action,
  entityType,
  entityId,
  "actor": adminUser->name,
  sessionId,
  metadata,
  ipAddress,
  userAgent,
  createdAt
}`

export const adminSessionsQuery = `*[_type == "adminSession"] | order(_createdAt desc) [0...200] {
  _id,
  sessionId,
  "user": user->{ _id, name, email },
  createdAt,
  lastSeenAt,
  expiresAt,
  ipAddress,
  device,
  isRevoked,
  revokedAt
}`

export const adminPopupsListQuery = `*[_type == "popup"] | order(priority asc) {
  _id,
  title,
  type,
  trigger,
  triggerConfig,
  isActive,
  priority,
  "startDate": schedule.startDate,
  "endDate": schedule.endDate,
  targeting,
  analytics,
  _updatedAt
}`

export const adminPopupDetailQuery = `*[_type == "popup" && _id == $id][0] {
  _id,
  title,
  type,
  trigger,
  triggerConfig,
  content,
  targeting,
  schedule,
  isActive,
  priority,
  analytics
}`

export const adminSettingsQuery = `*[_type == "adminUser" && _id == $id][0] {
  _id,
  name,
  email,
  phone,
  role,
  preferences,
  twoFactorEnabled,
  mustChangePassword,
  lastLogin,
  createdAt
}`