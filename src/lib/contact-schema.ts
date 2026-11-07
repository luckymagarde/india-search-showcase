import { z } from 'zod';

export const contactSchema = z.object({
 name: z.string().trim().min(1, 'Please enter your name.').max(100),
 email: z.string().trim().email('Please enter a valid email.').max(255),
 phone: z.string().trim().min(7, 'Please enter your number.').max(40),
 website: z.string().trim().max(500).refine(value => !value || /^https?:\/\//i.test(value), 'Use a website address beginning with https:// or http://.'),
 budget: z.string().trim().max(100),
 goals: z.string().trim().max(5000),
 page_path: z.string().max(300).refine(value => value.startsWith('/') && !value.startsWith('//')),
 company_fax: z.string().max(0, 'Unable to accept this submission.'),
});