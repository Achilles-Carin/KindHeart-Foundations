import { Link } from 'react-router-dom';

type Props = { onClick?: () => void };

export default function Brand({ onClick }: Props) {
  return (
    <Link to="/" className="brand" onClick={onClick} aria-label="KindHeart Foundation home">
      <svg className="brand-heart" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#f07861"
          d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"
        />
      </svg>
      <span>KindHeart</span>
    </Link>
  );
}