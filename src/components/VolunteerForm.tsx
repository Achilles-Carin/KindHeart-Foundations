import { useId, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from './Button';

const AREAS = [
  'Food Assistance',
  'Education Support',
  'Family and Youth',
  'Community Outreach',
  'Anywhere I am needed',
];

export default function VolunteerForm() {
  const uid = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(AREAS[4]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Enter your name so we know who to thank.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address, like name@example.com.');
      return;
    }
    setError('');
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-card">
        <div className="result result-success" role="status">
          <CheckCircle2 size={36} aria-hidden="true" />
          <h3>Thanks, {name.trim().split(' ')[0]}.</h3>
          <p>
            Your interest in <strong>{area}</strong> is noted. This is a student demo, so nothing was sent or
            stored, and no one will email you.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSent(false);
              setName('');
              setEmail('');
              setMessage('');
            }}
          >
            Send another inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Full name</label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby={error ? `${uid}-error` : undefined}
          />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-email`}>Email address</label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby={error ? `${uid}-error` : undefined}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${uid}-area`}>I would like to help with</label>
        <select id={`${uid}-area`} value={area} onChange={(e) => setArea(e.target.value)}>
          {AREAS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor={`${uid}-message`}>Anything we should know? (optional)</label>
        <textarea
          id={`${uid}-message`}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your availability, skills, or questions"
        />
      </div>

      {error && (
        <p id={`${uid}-error`} className="form-error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      <Button type="submit" block>
        Send volunteer inquiry
      </Button>
      <p className="form-note">Demo form: your details stay in this browser tab and are not sent or stored.</p>
    </form>
  );
}
