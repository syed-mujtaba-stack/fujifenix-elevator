import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const inquiryReplySchema = z.object({
  message: z.string().min(1, 'Reply cannot be empty'),
})

export type InquiryReplyInput = z.infer<typeof inquiryReplySchema>

export const popupSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['exit-intent', 'timed', 'scroll', 'banner', 'custom-page']),
  content: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  active: z.boolean(),
  frequency: z.enum(['once', 'every-visit', 'every-session']),
  delay: z.number().optional(),
  scrollPercent: z.number().optional(),
})

export type PopupInput = z.infer<typeof popupSchema>
