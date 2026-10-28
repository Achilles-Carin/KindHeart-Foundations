import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Brand from './Brand';
import { LinkButton } from './Button';

export default function Navbar() {
  // The menu is "open" only for the location it was opened on, so any
  // navigation (links, back button) closes it without an effect.
  const { key } = useLocation();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = openKey === key;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpenKey(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenKey(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container navbar">
        <Brand onClick={close} />

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenKey(open ? null : key)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>

        <nav id="primary-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end onClick={close}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={close}>
                About
              </NavLink>
            </li>
          </ul>
          <LinkButton to="/#donate" variant="accent" onClick={close}>
            Donate
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
