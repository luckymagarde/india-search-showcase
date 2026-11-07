import { createServerFn } from '@tanstack/react-start';
import { contactSchema } from './contact-schema';

export const submitContact = createServerFn({ method: 'POST' })
 .inputValidator((input: unknown) => contactSchema.parse(input))
 .handler(async ({ data }) => {
  // This public write-only action validates every field; no submissions are returned.
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { company_fax: _honeypot, ...submission } = data;
  const { error } = await supabaseAdmin.from('contact_submissions').insert(submission);
  if (error) throw new Error('Your enquiry could not be saved. Please try again.');
  return { saved: true };
 });