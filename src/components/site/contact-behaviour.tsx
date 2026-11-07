import { useEffect } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { submitContact } from '@/lib/contact.functions';
import { contactSchema } from '@/lib/contact-schema';

/** Delegated capture handles every legacy form without changing its appearance. */
export function ContactBehaviour() {
 const submit = useServerFn(submitContact);
 useEffect(() => {
  const pending = new WeakSet<HTMLFormElement>();
  const onSubmit = async (event: Event) => {
   const form = event.target;
   if (!(form instanceof HTMLFormElement) || form.id !== 'leadForm') return;
   event.preventDefault();
   event.stopImmediatePropagation();
   if (pending.has(form)) return;
   const values = new FormData(form);
   const read = (name: string) => String(values.get(name) ?? '');
   const parsed = contactSchema.safeParse({ name: read('name'), email: read('email'), phone: read('phone'), website: read('site'), budget: read('budget'), goals: read('goals'), page_path: window.location.pathname, company_fax: read('company_fax') });
   for (const name of ['name', 'email', 'phone']) {
    const invalid = !parsed.success && parsed.error.issues.some(issue => issue.path[0] === name);
    form.querySelector(`#f-${name}`)?.classList.toggle('error', invalid);
    form.querySelector(`#${name}`)?.setAttribute('aria-invalid', String(invalid));
   }
   let feedback = form.querySelector<HTMLElement>('[data-contact-feedback]');
   if (!feedback) {
    feedback = document.createElement('p');
    feedback.dataset.contactFeedback = 'true';
    feedback.setAttribute('role', 'alert');
    form.append(feedback);
   }
   feedback.textContent = '';
   if (!parsed.success) {
    feedback.textContent = parsed.error.issues[0]?.message ?? 'Please check the form.';
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    return;
   }
   const button = form.querySelector<HTMLButtonElement>('.submit');
   const label = button?.textContent ?? 'Send enquiry';
   pending.add(form);
   if (button) { button.disabled = true; button.textContent = 'Sending…'; }
   try {
    const result = await submit({ data: parsed.data });
    if (!result.saved) throw new Error('Unable to save enquiry.');
    form.style.display = 'none';
    const success = form.closest('.form-shell')?.querySelector<HTMLElement>('#fSuccess');
    success?.classList.add('show');
    success?.setAttribute('role', 'status');
   } catch {
    feedback.textContent = 'Your enquiry could not be saved. Please try again.';
   } finally {
    pending.delete(form);
    if (button) { button.disabled = false; button.textContent = label; }
   }
  };
  // A hidden trap provides basic bot filtering without changing visible fields.
  const addTrap = () => document.querySelectorAll<HTMLFormElement>('#leadForm').forEach(form => {
   if (form.querySelector('[name="company_fax"]')) return;
   const trap = document.createElement('input');
   trap.name = 'company_fax'; trap.type = 'text'; trap.hidden = true; trap.tabIndex = -1; trap.autocomplete = 'off';
   form.append(trap);
  });
  addTrap();
  const observer = new MutationObserver(addTrap);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('submit', onSubmit, true);
  return () => { document.removeEventListener('submit', onSubmit, true); observer.disconnect(); };
 }, [submit]);
 return null;
}