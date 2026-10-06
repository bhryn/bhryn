import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Mail, Linkedin, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/components/network/site';
import community from '@/assets/community.jpg';

export const Route = createFileRoute('/contact')({
  head: () => pageHead('Contact / Join Us', 'Connect with the Business and Human Rights Young Professionals Network and find your community in business and human rights.'),
  component: Contact,
});

type Status = 'idle' | 'saving' | 'done' | 'error';

function Contact() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
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

  return <main className="shell">
    <section className="page-intro"><h1>Contact / Join Us</h1><p>Questions about joining, events or collaborations? Get in touch.</p></section>
    <section className="contact-layout">
      <div>
        <div className="contact-item">
          <Mail className="text-primary mb-5" size={26} />
          <h2>Email us</h2>
          <p>For membership enquiries, collaborations and general questions.</p>
          <a className="contact-link mt-4" href="mailto:BHRYPN@gmail.com">BHRYPN@gmail.com <ArrowUpRight size={16} /></a>
        </div>
        <div className="contact-item">
          <Linkedin className="text-primary mb-5" size={26} />
          <h2>Find our community on LinkedIn</h2>
          <p>Keep the conversation going and connect with fellow professionals.</p>
          <a className="contact-link mt-4" href="https://www.linkedin.com/groups/13029451" target="_blank" rel="noreferrer">Join the LinkedIn group <ArrowUpRight size={16} /></a>
        </div>
        <div className="contact-item">
          <h2>Stay in the loop</h2>
          <p>News about upcoming gatherings, opportunities and community updates.</p>
          {status === 'done' ? (
            <p className="newsletter-done"><Check size={18} /> {note}</p>
          ) : (
            <>
              <form className="newsletter-form mt-4" onSubmit={signUp}>
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
        </div>
      </div>
      <img src={community} width={1024} height={768} alt="Illustrative photograph of professionals connecting and sharing ideas" className="contact-image" />
    </section>
  </main>;
}
