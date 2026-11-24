import { z } from "zod";

/** Minimum time (ms) between the form rendering and submission — bots submit instantly. */
export const MIN_FILL_TIME_MS = 3000;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email: z.string().trim().max(255, "Email is too long.").email("Please enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a subject.").max(150, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Your message should be at least 10 characters.")
    .max(5000, "Message is too long (max 5000 characters)."),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Server payload adds spam-protection fields. */
export const contactPayloadSchema = contactSchema.extend({
  /** Honeypot: hidden field real visitors never fill in. */
  website: z.string().max(0, "Spam detected.").optional().default(""),
  /** Epoch ms when the form was first shown. */
  startedAt: z.number().int().positive(),
});

export type ContactPayload = z.input<typeof contactPayloadSchema>;

export function isLikelyBot(payload: { website?: string | undefined; startedAt: number }, now = Date.now()) {
  if (payload.website && payload.website.length > 0) return true;
  return now - payload.startedAt < MIN_FILL_TIME_MS;
}
