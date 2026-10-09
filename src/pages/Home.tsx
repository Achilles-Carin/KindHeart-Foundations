import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import type { Kind } from '../components/Illustration';

type Program = {
  title: string;
  text: string;
  idea: string;
  photo: Kind;
  alt: string;
};

const programs: Program[] = [
  {
    title: 'Food Assistance',
    text: 'Promote food-sharing initiatives that help families access essential meals.',
    idea: 'Ways to take part include organizing a community pantry, packing meals with neighbors, or sharing a portion of a harvest or a meal with a family nearby.',
    photo: 'food',
    alt: 'Volunteers sharing meals with a community',
  },
  {
    title: 'Education Support',
    text: 'Encourage learning by connecting children with school supplies and learning resources.',
    idea: 'Ways to take part include collecting notebooks and pencils before the school year, passing on books you have finished, or tutoring a child in your neighborhood.',
    photo: 'education',
    alt: 'Children learning with school supplies',
  },
  {
    title: 'Community Outreach',
    text: 'Inspire people to volunteer, share resources, and support their local communities.',
    idea: 'Ways to take part include joining a local clean-up, checking in on elderly neighbors, or helping a nearby group that already serves your community.',
    photo: 'outreach',
    alt: 'Community members volunteering together',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">KINDHEART FOUNDATION</p>
            <h1>
              Small Acts.
              <br />
              Big Changes.
            </h1>
            <p className="lead">
              Every family deserves hope, every child deserves a chance, and every act of
              kindness can make a difference. Together, we can build a caring community
              where no one is left behind.
            </p>
            <a href="#programs" className="button">Discover Our Mission</a>
          </div>
          <Photo
            name="hero"
            priority
            className="hero-photo"
            alt="Community members sharing food and kindness"
          />
        </div>
      </section>

      <section id="programs" className="section section-tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">HOW WE HELP</p>
            <h2>Making Kindness Matter</h2>
          </header>

          <div className="programs">
            {programs.map((p) => (
              <article className="program" key={p.title}>
                <Photo name={p.photo} alt={p.alt} />
                <div className="program-body">
                  <h3>{p.title}</h3>
                  <p className="program-text">{p.text}</p>
                  <p className="program-idea">{p.idea}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>Kindness Starts With You.</h2>
            <p>Small actions can inspire meaningful change. Be part of a community that cares.</p>
            <Link to="/about" className="button button-coral">Get to Know Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}