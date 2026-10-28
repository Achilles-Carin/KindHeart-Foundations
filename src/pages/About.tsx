import {
  BookOpen,
  Eye,
  Handshake,
  HandHeart,
  Heart,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
  UsersRound,
  Sprout,
  HeartHandshake,
  Sparkles,
  Store,
} from 'lucide-react';
import { LinkButton } from '../components/Button';
import Photo from '../components/Photo';
import SectionHeading from '../components/SectionHeading';
import portrait from '../assets/Smiling Young Man in Black Suit.png';

const profile = {
  name: 'Achilles Charlemagne B. Carin',
  course: 'BSIT 3B',
  interests: 'Web development, UI design, and learning how technology can support community causes.',
  reason:
    'A charity site only works if visitors trust it within seconds. I chose this concept because it pushed me to design for that trust: honest wording, a donation form that is easy to follow, and a layout that works on any phone.',
};

const values = [
  { icon: Heart, title: 'Compassion', text: 'We start by listening and paying attention to what people actually need.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'We say what we do and do what we say, even when it is less impressive.' },
  { icon: UsersRound, title: 'Inclusion', text: 'Help is open to everyone, and our programs are designed so no one is left out.' },
  { icon: Lightbulb, title: 'Accountability', text: 'We account for every gift and every drive, and we share the result openly.' },
  { icon: Handshake, title: 'Collaboration', text: 'We work with neighbors, schools, and local groups instead of around them.' },
  { icon: Sprout, title: 'Empowerment', text: 'We aim to build skills and confidence so families can lead their own progress.' },
];

const approach = [
  {
    icon: BookOpen,
    title: 'Education',
    text: 'Learning materials and tutoring support, so a lack of supplies never decides how far a child can go.',
  },
  {
    icon: HeartHandshake,
    title: 'Essential resources',
    text: 'Food and basic necessities shared through drives and pantries, planned with the people who receive them.',
  },
  {
    icon: Store,
    title: 'Partnerships',
    text: 'Working with schools, barangay groups, and organizations already serving the community.',
  },
  {
    icon: Users,
    title: 'Volunteer participation',
    text: 'Clear, simple ways for people to give time, with enough coordination that their effort counts.',
  },
];

const roles = [
  { title: 'Volunteers', text: 'Pack, tutor, and show up. Their time is the engine of every drive.' },
  { title: 'Donors', text: 'Give once or give again. Gifts fund supplies that volunteers cannot make themselves.' },
  { title: 'Community partners', text: 'Schools and local groups tell us what is needed and help us reach the right people.' },
  { title: 'Neighbors and local leaders', text: 'They know their community best, and they shape what we do next.' },
];

export default function About() {
  const fields: [string, string][] = [
    ['Name', profile.name],
    ['Course', profile.course],
    ['Interests', profile.interests],
    ['Why this charity concept', profile.reason],
  ];

  return (
    <>
      <section className="hero" aria-labelledby="about-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="about-title">A community united by hope.</h1>
            <p className="lead">
              KindHeart began as a question: what would a nonprofit built on everyday generosity look like? This page
              explains what we believe, how we would work, and who made this project.
            </p>
            <div className="hero-actions">
              <LinkButton to="/#donate" variant="accent">
                Donate Now
              </LinkButton>
              <LinkButton to="/#volunteer" variant="outline">
                Volunteer
              </LinkButton>
            </div>
          </div>
          <Photo name="about" priority className="hero-photo" alt="Neighbors working together for their community" />
        </div>
      </section>

      <section id="story" className="section section-tint" aria-labelledby="story-title">
        <div className="container split">
          <SectionHeading id="story-title" title="Our story" />
          <div className="prose">
            <p>
              Across the Philippines, many families in underserved communities struggle to put regular meals on the
              table. Children go without notebooks and pencils. Neighbors who want to help often do not know where to
              start.
            </p>
            <p>
              KindHeart brings three kinds of action together: food assistance, education support, and volunteer
              service. Each one lets ordinary people give something small that adds up to something meaningful for a
              family or a child.
            </p>
            <p>
              To be clear about what this is: KindHeart is a concept created for a school project. It is not a
              registered organization and does not run real programs. Its payments use Stripe test mode, so no real
              money moves. Its purpose is to show how a clear, welcoming website can invite people toward kindness.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-plain" aria-label="Mission and vision">
        <div className="container duo">
          <article className="panel panel-mission">
            <Target size={32} aria-hidden="true" />
            <h2 className="panel-title">Our mission</h2>
            <p>
              To support underserved communities through educational opportunities, essential resources, and
              community-led programs.
            </p>
          </article>
          <article className="panel panel-vision">
            <Eye size={32} aria-hidden="true" />
            <h2 className="panel-title">Our vision</h2>
            <p>
              A future where every individual has access to opportunities, dignity, and the resources needed to thrive.
            </p>
          </article>
        </div>
      </section>

      <section id="values" className="section section-tint" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading id="values-title" title="What guides our work">
            Six values shape how KindHeart would plan, spend, and speak.
          </SectionHeading>
          <ul className="values">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={26} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="approach" className="section section-plain" aria-labelledby="approach-title">
        <div className="container split">
          <SectionHeading id="approach-title" title="Our approach">
            We aim to support communities through four channels. In every one, we put dignity, transparency, and
            collaboration ahead of big promises.
          </SectionHeading>
          <ul className="principles">
            {approach.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={26} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="people" className="section section-tint" aria-labelledby="people-title">
        <div className="container">
          <SectionHeading id="people-title" title="The people behind the mission">
            KindHeart has no staff roster to introduce. A mission like this is carried by the people who take part, so
            here are the roles that matter most. If KindHeart ever became a real organization, its team would be
            introduced here.
          </SectionHeading>
          <dl className="roles">
            {roles.map((r) => (
              <div key={r.title}>
                <dt>
                  <HandHeart size={22} aria-hidden="true" />
                  {r.title}
                </dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="creator" className="section section-plain" aria-labelledby="creator-title">
        <div className="container">
          <SectionHeading id="creator-title" title="About the creator" />
          <div className="about-me">
            <figure className="portrait">
              <img
                src={portrait}
                alt={`Portrait of ${profile.name}, creator of this website`}
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <dl className="profile">
              {fields.map(([label, value]) => (
                <div className="profile-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="join" className="section section-plain" aria-labelledby="join-title">
        <div className="container">
          <div className="cta-band on-dark">
            <Sparkles size={32} aria-hidden="true" />
            <h2 id="join-title">Join our mission</h2>
            <p>Give a little, share some time, or just tell a friend. Every kind of help counts.</p>
            <div className="cta-actions">
              <LinkButton to="/#donate" variant="accent">
                Donate Now
              </LinkButton>
              <LinkButton to="/#volunteer" variant="light">
                Volunteer
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
