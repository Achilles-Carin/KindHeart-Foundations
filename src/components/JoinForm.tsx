import { useState, type FormEvent } from 'react';

export type Member = { name: string; email: string } | null;

type Props = {
  member: Member;
  onJoin: (member: Member) => void;
};

const areas = ['Food Assistance', 'Education Support', 'Community Outreach', 'Anywhere I am needed'];

export default function JoinForm({ member, onJoin }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(areas[3]);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onJoin({ name: name.trim(), email: email.trim() });
  }

  if (member) {
    return (
      <div className="form-card" role="status">
        <h3>Welcome, {member.name}.</h3>
        <p className="form-help">
          You have joined the KindHeart community. You can now choose to give as a member in the
          donation form above.
        </p>
        <p className="form-note">
          Demo only: nothing was saved or sent, and no email will be delivered.
        </p>
        <button type="button" className="button button-outline" onClick={() => onJoin(null)}>
          Leave community
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="join-name">Full name</label>
        <input
          id="join-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby={error ? 'join-error' : undefined}
        />
      </div>

      <div className="field">
        <label htmlFor="join-email">Email address</label>
        <input
          id="join-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={error ? 'join-error' : undefined}
        />
      </div>

      <div className="field">
        <label htmlFor="join-area">I would like to help with</label>
        <select id="join-area" value={area} onChange={(e) => setArea(e.target.value)}>
          {areas.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      {error && (
        <p id="join-error" className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="button">Join Us</button>
      <p className="form-note">
        Demo only: your details stay in this browser tab and are not stored or sent.
      </p>
    </form>
  );
}