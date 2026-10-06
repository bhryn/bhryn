import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type Status = 'idle' | 'saving' | 'done' | 'error';

export function NewsletterForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase().slice(0, 255);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('error');
      setNote('Enter a valid email address.');
      return;
    }
    setStatus('saving');
    setNote('');
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: value });
    if (error) {
      if (error.code === '23505' || /duplicate|already/i.test(error.message)) {
        setStatus('done');
        setNote("You're already on the list.");
        return;
      }
      setStatus('error');
      setNote("That didn't work — please try again.");
      return;
    }
    setStatus('done');
    setNote("You're signed up. We'll be in touch.");
    setEmail('');
  }

  return <div className={className}>
    {status === 'done' ? (
      <p className="newsletter-done"><Check size={18} /> {note}</p>
    ) : (
      <>
        <form className="newsletter-form" onSubmit={signUp}>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setNote(''); } }}
            placeholder="you@example.com"
            aria-label="Email address"
            required
          />
          <Button type="submit" className="pill" disabled={status === 'saving'}>{status === 'saving' ? 'Signing up…' : 'Sign up'}</Button>
        </form>
        {note && <p className="newsletter-error">{note}</p>}
      </>
    )}
  </div>;
}
