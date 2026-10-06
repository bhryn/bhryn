import { ArrowUpRight, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { NewsletterForm } from '@/components/network/newsletter';
import { useState } from 'react';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner"><Link to="/" className="wordmark" aria-label="BHRYPN home"><img src="/bhr-logo.png" className="site-logo" width={169} height={40} alt="BHR Young Professionals Network" /></Link><nav className="desktop-nav" aria-label="Main navigation"><Link to="/">Home</Link><Link to="/" hash="about">About Us</Link><Link to="/" hash="leadership">Leadership Board</Link><Link to="/events">Events</Link></nav><Button asChild variant="outline" className="join-button hidden md:inline-flex"><Link to="/contact">Contact / Join Us <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <nav className="mobile-nav shell" aria-label="Mobile navigation" onClick={() => setOpen(false)}><Link to="/">Home</Link><Link to="/" hash="about">About Us</Link><Link to="/" hash="leadership">Leadership Board</Link><Link to="/events">Events</Link><Link to="/contact">Contact / Join Us</Link></nav>}</header>;
}
export function SiteFooter() { return <footer className="site-footer"><div className="shell footer-inner"><Link to="/" className="wordmark"><span className="footer-logo-title">BHR<small>Young Professionals Network</small></span></Link><p>Business and Human Rights<br />Young Professionals Network</p><div className="footer-links"><Link to="/events">Events</Link><Link to="/contact">Contact / Join Us <ArrowUpRight size={14} /></Link></div><span className="footer-copy">© 2026 BHRYPN</span></div></footer>; }
export function JoinBand() { return <section className="join-band shell"><h2 className="section-title">Hear from us</h2><p className="section-intro mt-5">News about upcoming gatherings, opportunities and community updates.</p><NewsletterForm className="mt-8" /></section>; }
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} — BHRYPN` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — BHRYPN` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }
