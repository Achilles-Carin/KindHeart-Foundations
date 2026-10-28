import { Link } from 'react-router-dom';
import Photo from './Photo';
import type { Kind } from './Illustration';

type Props = {
  title: string;
  text: string;
  photo: Kind;
  alt: string;
  to: string;
  featured?: boolean;
};

export default function ProgramCard({ title, text, photo, alt, to, featured }: Props) {
  return (
    <article className={`program ${featured ? 'program-featured' : ''}`}>
      <Photo name={photo} alt={alt} />
      <div className="program-body">
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to={to} className="text-link">
          Learn about our work
          <span className="sr-only">: {title}</span>
        </Link>
      </div>
    </article>
  );
}
