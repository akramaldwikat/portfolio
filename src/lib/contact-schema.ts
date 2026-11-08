import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().max(254).pipe(z.email()),
  company: z.string().trim().max(150).optional().default(""),
  type: z.enum(["0", "1", "2", "3", "4", "5", "6"]),
  budget: z.enum(["0", "1", "2", "3", "4"]),
  description: z.string().trim().min(20).max(5000),
  website: z.string().max(0).optional().default(""),
  locale: z.enum(["en", "ar"]),
});
export type Inquiry = z.infer<typeof contactSchema>;
export function inquiryTypeFromQuery(value: string | null) {
  return value !== null && /^[0-6]$/.test(value) ? value : undefined;
}
