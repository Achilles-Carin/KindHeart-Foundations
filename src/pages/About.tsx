import { useState } from 'react';
import Photo from '../components/Photo';
import DonateForm from '../components/DonateForm';
import JoinForm, { type Member } from '../components/JoinForm';
import portrait from '../assets/Smiling Young Man in Black Suit.png';

const profile = {
  name: '',
  course: '',
  interests: '',
  reason: '',
};

const values = [
  {
    title: 'Compassion',
    text: 'We begin by listening and paying attention to what people actually need.',
  },
  {
    title: 'Respect',
    text: 'Everyone we help is a neighbor with dignity, and every offer of help should honor that.',
  },
  {
    title: 'Responsibility',
    text: 'Good intentions need follow-through. We commit to using resources carefully and being honest about what we can do.',
  },
  {
    title: 'Community',
    text: 'Lasting change grows when neighbors, families, students, and volunteers work side by side.',
  },
];

const actions = [
  {
    title: 'Share a meal',
    text: 'Organize or join a food-sharing drive in your barangay, school, or workplace.',
  },
  {
    title: 'Give learning materials',
    text: 'Gather notebooks, pencils, and books for children who need them.',
  },
  {
    title: 'Volunteer your time',
    text: 'Offer a few hours to a local group doing outreach near you.',
  },
];

const placeholder = 'Add this in src/pages/About.tsx';

export default function About() {
  const [member, setMember] = useState<Member>(null);

  const fields: [string, string][] = [
    ['Name', profile.name],
    ['Course', profile.course],
    ['Interests', profile.interests],
    ['Why this charity concept', profile.reason],
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">ABOUT KINDHEART</p>
            <h1>A Little Kindness Goes a Long Way.</h1>
            <p className="lead">
              KindHeart is a nonprofit website concept built around the belief that
              compassion and community action can help create a better future.
            </p>
          </div>
          <Photo
            name="outreach"
            priority
            className="hero-photo"
            alt="Volunteers working together in a community"
          />
        </div>
      </section>

      <section className="section section-tint">
        <div className="container split">
          <h2>Our Story</h2>
          <div className="prose">
            <p>
              KindHeart began as an exercise in imagining what a nonprofit built on everyday
              generosity could look like. Many families in underserved communities across the
              Philippines struggle to put regular meals on the table, children go without
              school supplies, and neighbors who want to help often do not know where to start.
            </p>
            <p>
              The concept brings three kinds of action together: food assistance, education
              support, and volunteer service. Each one is a way for ordinary people to give
              something small that adds up to something meaningful for a family or a child.
            </p>
            <p>
              KindHeart is a concept created for a school project. It is not a registered
              organization and does not collect donations or run real programs. Its purpose
              is to show how a clear, welcoming website can invite people toward kindness.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container duo">
          <article className="panel panel-green">
            <h2>Our Mission</h2>
            <p>
              To encourage community support through food assistance, educational
              opportunities, and meaningful acts of service.
            </p>
          </article>
          <article className="panel panel-sand">
            <h2>Our Vision</h2>
            <p>
              A future where every family has access to basic needs and every child has the
              opportunity to learn and grow.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">WHAT GUIDES US</p>
            <h2>Our Core Values</h2>
          </header>
          <div className="values">
            {values.map((v, i) => (
              <article className="value" key={v.title}>
                <span className="value-index">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="get-involved" className="section">
        <div className="container split">
          <div>
            <h2>Get Involved</h2>
            <p className="muted-note">
              KindHeart is a concept, so these are ideas you can carry out with local
              organizations in your own community.
            </p>
          </div>
          <ul className="actions">
            {actions.map((a) => (
              <li key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="donate" className="section section-tint">
        <div className="container split">
          <div>
            <p className="eyebrow">GIVE</p>
            <h2>Make a Donation</h2>
            <p className="muted-note">
              Give anonymously, or join the community and give as a member. Every amount
              counts, and you choose where your gift goes.
            </p>
          </div>
          <DonateForm member={member} />
        </div>
      </section>

      <section id="join" className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">JOIN US</p>
            <h2>Become a Member</h2>
            <p className="muted-note">
              Sign up to be part of a community that cares. Members can give under their own
              name and choose the kind of help they want to offer.
            </p>
          </div>
          <JoinForm member={member} onJoin={setMember} />
        </div>
      </section>

            <section id="about-me" className="section section-tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">THE CREATOR</p>
            <h2>About Me</h2>
          </header>

          <div className="about-me">
            <figure className="portrait">
              <img
                src={portrait}
                alt={
                  profile.name
                    ? `Portrait of ${profile.name}, creator of this website`
                    : 'Portrait of the creator of this website'
                }
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
                  <dd className={value ? '' : 'is-empty'}>{value || placeholder}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <h2>Website Notice</h2>
          <div className="prose">
            <p>
              This website is a student project and a work of fiction. KindHeart Foundation
              is not a real charity, does not accept money or personal information, and makes
              no claims about donations or beneficiaries. Photographs are used for
              illustration only. By browsing this site you agree to treat its content as a
              concept and not as an official appeal for funds.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}