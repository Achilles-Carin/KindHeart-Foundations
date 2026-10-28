import { Link } from 'react-router-dom';

type Props = { onClick?: () => void; tone?: 'default' | 'light' };

export default function Brand({ onClick, tone = 'default' }: Props) {
  return (
    <Link
      to="/"
      className={`brand ${tone === 'light' ? 'brand-light' : ''}`}
      onClick={onClick}
      aria-label="KindHeart Foundation, home"
    >
      <svg className="brand-heart" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"
        />
      </svg>
      <span>KindHeart</span>
    </Link>
  );
}
