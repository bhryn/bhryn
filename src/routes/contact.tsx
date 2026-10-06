import { createFileRoute } from '@tanstack/react-router';
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import { NewsletterForm } from '@/components/network/newsletter';
import { pageHead } from '@/components/network/site';
import community from '@/assets/community.jpg';

export const Route = createFileRoute('/contact')({
  head: () => pageHead('Contact / Join Us', 'Connect with the Business and Human Rights Young Professionals Network and find your community in business and human rights.'),
  component: Contact,
});

function Contact() {
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
          <NewsletterForm className="mt-4" />
        </div>
      </div>
      <img src={community} width={1024} height={768} alt="Illustrative photograph of professionals connecting and sharing ideas" className="contact-image" />
    </section>
  </main>;
}
