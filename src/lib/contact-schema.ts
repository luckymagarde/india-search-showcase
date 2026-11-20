import { z } from "zod";

/** Pure validation shared by the browser and server; never fetches submitted URLs. */
export function normalizeWebsite(value: string): string | null {
  const input = value.trim();
  if (!input) return "";
  if (/\s/.test(input) || /\\/.test(input)) return null;
  const candidate = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  try {
    const url = new URL(candidate);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.port)
      return null;
    const labels = url.hostname.split(".");
    if (
      labels.length < 2 ||
      labels.some((label) => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label))
    )
      return null;
    if (!/^[a-z]{2,63}$/i.test(labels.at(-1) ?? "")) return null;
    return candidate;
  } catch {
    return null;
  }
}

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter your number.").max(40),
  website: z
    .string()
    .trim()
    .max(500)
    .refine(
      (value) => normalizeWebsite(value) !== null,
      "Please enter a valid website, such as example.com.",
    )
    .transform((value) => normalizeWebsite(value) ?? ""),
  budget: z.string().trim().max(100),
  goals: z.string().trim().max(5000),
  page_path: z
    .string()
    .max(300)
    .refine((value) => value.startsWith("/") && !value.startsWith("//")),
  company_fax: z.string().max(0, "Unable to accept this submission."),
});
