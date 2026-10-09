import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Brand from './Brand';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container navbar">
        <Brand onClick={close} />

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-label">{open ? 'Close' : 'Menu'}</span>
          <span className="menu-bars" aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          className={`nav ${open ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          <ul className="nav-links">
            <li>
              <NavLink to="/" end onClick={close}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={close}>About</NavLink>
            </li>
          </ul>
          <Link to="/about#get-involved" className="button" onClick={close}>
            Get Involved
          </Link>
        </nav>
      </div>
    </header>
  );
}