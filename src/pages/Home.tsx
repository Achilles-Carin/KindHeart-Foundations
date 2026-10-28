import {
  BookOpen,
  Eye,
  HandHeart,
  Lock,
  Scale,
  Sprout,
  Target,
  Users,
  CalendarHeart,
  ShoppingBasket,
  ClipboardList,
} from 'lucide-react';
import { LinkButton } from '../components/Button';
import Photo from '../components/Photo';
import ProgramCard from '../components/ProgramCard';
import SectionHeading from '../components/SectionHeading';
import DonateForm from '../components/DonateForm';
import VolunteerForm from '../components/VolunteerForm';

const programs = [
  {
    title: 'Education and Learning Support',
    text: 'Notebooks, pencils, books, and a patient tutor can change how a child feels about school. This program focuses on getting learning materials to students who go without.',
    photo: 'education',
    alt: 'Children studying together with school supplies',
  },
  {
    title: 'Community Food Assistance',
    text: 'We aim to organize food-sharing drives and community pantries that give families essential groceries, handed over with respect.',
    photo: 'food',
    alt: 'Volunteers sharing meals with a community',
  },
  {
    title: 'Family and Youth Empowerment',
    text: 'Families do better when parents and young people have somewhere to learn and ask questions. We aim to support workshops and mentoring shaped with the community.',
    photo: 'family',
    alt: 'A family and a young person together',
  },
  {
    title: 'Volunteer and Community Outreach',
    text: 'Many neighbors want to help but do not know where to begin. We connect willing volunteers with clean-ups, check-ins on elderly neighbors, and local groups already doing the work.',
    photo: 'outreach',
    alt: 'Community members volunteering together',
  },
] as const;

const principles = [
  {
    icon: Users,
    title: 'Community-centered assistance',
    text: 'Help starts with what a community says it needs, not with what we assume it needs.',
  },
  {
    icon: HandHeart,
    title: 'Respect and dignity',
    text: 'Everyone we serve is a neighbor. Our wording, photos, and processes should protect that.',
  },
  {
    icon: Scale,
    title: 'Responsible use of donations',
    text: 'We commit to spending carefully and being clear about where a gift goes, before and after it is given.',
  },
  {
    icon: Sprout,
    title: 'Sustainable, collaborative solutions',
    text: 'We work alongside local groups and families so that help lasts beyond a single drive.',
  },
];

const allocation = [
  {
    icon: BookOpen,
    title: 'Learning materials',
    text: 'Notebooks, pens, books, and school supplies for students who go without.',
  },
  {
    icon: ShoppingBasket,
    title: 'Essential food and supplies',
    text: 'Groceries and basic necessities for food-sharing drives and community pantries.',
  },
  {
    icon: CalendarHeart,
    title: 'Community activities',
    text: 'Venues, materials, and refreshments for workshops, clean-ups, and youth sessions.',
  },
  {
    icon: ClipboardList,
    title: 'Volunteer coordination',
    text: 'Scheduling, transport, and simple training so volunteers can help safely and well.',
  },
];

const commitments = [
  {
    title: 'We tell the truth about what we do',
    text: 'No invented numbers, no staged stories. If we have not done something yet, we say so.',
  },
  {
    title: 'We ask communities first',
    text: 'Programs begin with conversations with teachers, parents, and local leaders.',
  },
  {
    title: 'We show where gifts go',
    text: 'Every drive should end with a plain account of what was collected and who received it.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Small acts of kindness. Lasting community impact.</h1>
            <p className="lead">
              KindHeart is a student-built nonprofit concept. It shows how donations, volunteer time, and neighborly
              effort can support meals, school supplies, and local outreach for families in the Philippines.
            </p>
            <div className="hero-actions">
              <LinkButton to="/#donate" variant="accent">
                Donate Now
              </LinkButton>
              <LinkButton to="/#mission" variant="outline">
                Explore Our Mission
              </LinkButton>
            </div>
            <p className="hero-note">
              <Lock size={16} aria-hidden="true" /> Donations run in Stripe test mode. No real charges.
            </p>
          </div>
          <Photo
            name="hero"
            priority
            className="hero-photo"
            alt="Community members sharing food and kindness"
          />
        </div>
      </section>

      {/* Mission and vision */}
      <section id="mission" className="section section-plain" aria-labelledby="mission-title">
        <div className="container">
          <SectionHeading id="mission-title" title="Why KindHeart exists">
            Many families struggle to put regular meals on the table, and many children go without school supplies.
            KindHeart imagines a community that closes those gaps together.
          </SectionHeading>

          <div className="duo">
            <article className="panel panel-mission">
              <Target size={32} aria-hidden="true" />
              <h3>Our mission</h3>
              <p>
                To support underserved communities through educational opportunities, essential resources, and
                community-led programs.
              </p>
            </article>
            <article className="panel panel-vision">
              <Eye size={32} aria-hidden="true" />
              <h3>Our vision</h3>
              <p>
                A future where every individual has access to opportunities, dignity, and the resources needed to
                thrive.
              </p>
            </article>
          </div>

          <dl className="facts">
            <div>
              <dt>Who we hope to serve</dt>
              <dd>
                Families who struggle with regular meals, children without school supplies, and neighbors who want to
                help but do not know where to start.
              </dd>
            </div>
            <div>
              <dt>How we work</dt>
              <dd>
                We listen first, partner with people and groups already serving their communities, and keep every
                request for help clear and honest.
              </dd>
            </div>
            <div>
              <dt>What guides us</dt>
              <dd>Compassion, integrity, inclusion, accountability, collaboration, and empowerment.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="section section-tint" aria-labelledby="programs-title">
        <div className="container">
          <SectionHeading id="programs-title" title="Four ways we want to help">
            Each program is a place where a small contribution of money, time, or supplies can reach a real person.
          </SectionHeading>
          <div className="programs">
            {programs.map((p, i) => (
              <ProgramCard
                key={p.title}
                title={p.title}
                text={p.text}
                photo={p.photo}
                alt={p.alt}
                to="/about#approach"
                featured={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why support us */}
      <section id="why" className="section section-plain" aria-labelledby="why-title">
        <div className="container split">
          <SectionHeading id="why-title" title="What your support is built on">
            Giving works best when people can trust how help is planned and delivered. These four principles shape
            every decision. KindHeart makes no claim of outside certification or audit.
          </SectionHeading>
          <ul className="principles">
            {principles.map(({ icon: Icon, title, text }) => (
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

      {/* Donation */}
      <section id="donate" className="section section-dark on-dark" aria-labelledby="donate-title">
        <div className="container donate-grid">
          <div className="donate-copy">
            <SectionHeading id="donate-title" title="Give what you can. Choose where it goes." tone="light">
              Your gift is meant to support food assistance, learning materials, and community activities. Pick an
              amount and a fund, then pay by card.
            </SectionHeading>
            <ol className="steps">
              <li>
                <span className="step-num" aria-hidden="true">1</span>
                <span>Choose an amount and a fund.</span>
              </li>
              <li>
                <span className="step-num" aria-hidden="true">2</span>
                <span>Enter your card in Stripe&rsquo;s secure form.</span>
              </li>
              <li>
                <span className="step-num" aria-hidden="true">3</span>
                <span>See your confirmation on screen.</span>
              </li>
            </ol>
            <p className="donate-fine">
              This site uses Stripe test mode, so no real money is charged. KindHeart is not a registered charity, and
              donations are not tax-deductible.
            </p>
          </div>
          <DonateForm />
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="section section-plain" aria-labelledby="volunteer-title">
        <div className="container split">
          <div>
            <SectionHeading id="volunteer-title" title="Offer your time">
              Not everyone can give money, and that is fine. A few hours can pack groceries, tutor a student, or
              check in on a neighbor.
            </SectionHeading>
            <ul className="checks">
              <li>Join a food-sharing drive in your barangay, school, or workplace</li>
              <li>Collect and pass on notebooks, pencils, and books</li>
              <li>Tutor a child or help at a youth session</li>
              <li>Support a local clean-up or neighbor check-in</li>
            </ul>
          </div>
          <VolunteerForm />
        </div>
      </section>

      {/* Impact and transparency */}
      <section id="impact" className="section section-tint" aria-labelledby="impact-title">
        <div className="container">
          <SectionHeading id="impact-title" title="Where your support is meant to go">
            These are the areas we plan to spend on. We do not publish percentages or results, because KindHeart is a
            concept and no real funds are collected.
          </SectionHeading>
          <ul className="allocation">
            {allocation.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={28} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community commitment */}
      <section id="commitments" className="section section-plain" aria-labelledby="commit-title">
        <div className="container split">
          <SectionHeading id="commit-title" title="What we promise our community">
            We have no testimonials to share because KindHeart has not served anyone yet. Here is what we would hold
            ourselves to if it did.
          </SectionHeading>
          <div>
            <ul className="commitments">
              {commitments.map((c) => (
                <li key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
            <aside className="scenario" aria-label="Illustrative scenario">
              <p className="scenario-label">Illustrative scenario, not a real story</p>
              <p>
                A barangay school notices that students share a single set of notebooks. A KindHeart-style drive
                would begin by asking the teachers what is needed, gather supplies from neighbors, and publish a
                simple list of what was collected and where it went.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
