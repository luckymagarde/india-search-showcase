import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';

const valid = { name: 'Test enquiry', email: 'qa@example.com', phone: '1234567890', website: '', budget: '', goals: 'Website enquiry', page_path: '/contact/', company_fax: '' };
describe('Shared enquiry validation', () => {
 it('accepts the existing required form fields and optional blanks', () => expect(contactSchema.safeParse(valid).success).toBe(true));
 it.each(['name', 'email', 'phone'])('rejects missing %s', field => expect(contactSchema.safeParse({ ...valid, [field]: '' }).success).toBe(false));
 it('rejects bot-trap content', () => expect(contactSchema.safeParse({ ...valid, company_fax: 'spam' }).success).toBe(false));
 it('rejects unsafe website protocols', () => expect(contactSchema.safeParse({ ...valid, website: 'javascript:alert(1)' }).success).toBe(false));
 it('rejects oversized enquiry text', () => expect(contactSchema.safeParse({ ...valid, goals: 'x'.repeat(5001) }).success).toBe(false));
 it.each(['google.com','www.google.com','example.com','https://google.com','http://google.com','example.co.in','www.example.co.uk'])('accepts %s',website=>expect(contactSchema.safeParse({...valid,website}).success).toBe(true));
 it.each(['invalid domain','malformed','https://','-invalid.com','example..com','ftp://google.com'])('rejects malformed %s',website=>expect(contactSchema.safeParse({...valid,website}).success).toBe(false));
 it('normalizes a trimmed bare domain',()=>expect(contactSchema.parse({...valid,website:'  www.google.com  '}).website).toBe('https://www.google.com'));
});