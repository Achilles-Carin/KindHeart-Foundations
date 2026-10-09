import { Link } from 'react-router-dom';
import Brand from './Brand';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand />
          <p className="footer-tagline">Small Acts. Real Impact.</p>
          <p className="footer-text">
            Our mission is to encourage community support through food assistance,
            educational opportunities, and meaningful acts of service.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about#get-involved">Get Involved</Link></li>
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} KindHeart Foundation. A school project concept.</p>
        <p>KindHeart is fictional and does not accept donations.</p>
      </div>
    </footer>
  );
}