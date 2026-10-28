import { Link } from 'react-router-dom';
import Brand from './Brand';
import { LinkButton } from './Button';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand tone="light" />
          <p className="footer-text">
            A student-built nonprofit concept that invites people to support food assistance,
            learning, and community outreach for families in the Philippines.
          </p>
          <LinkButton to="/#donate" variant="accent">
            Donate
          </LinkButton>
        </div>

        <nav aria-label="Footer: explore">
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about#approach">Our approach</Link></li>
            <li><Link to="/about#creator">About the creator</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer: take part">
          <h2 className="footer-heading">Take part</h2>
          <ul className="footer-links">
            <li><Link to="/#donate">Make a donation</Link></li>
            <li><Link to="/#volunteer">Volunteer</Link></li>
            <li><Link to="/#impact">Where support goes</Link></li>
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} KindHeart Foundation. A student project, not a registered charity.</p>
        <p>Payments run in Stripe test mode. No real charges are made.</p>
      </div>
    </footer>
  );
}
