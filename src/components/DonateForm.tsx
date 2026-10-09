import { useState, type FormEvent } from 'react';
import type { Member } from './JoinForm';

type Props = { member: Member };

const presets = [100, 250, 500, 1000];
const funds = [
  'Where it is needed most',
  'Food Assistance',
  'Education Support',
  'Community Outreach',
];

export default function DonateForm({ member }: Props) {
  const [mode, setMode] = useState<'anonymous' | 'member'>('anonymous');
  const [preset, setPreset] = useState<number | 'custom'>(250);
  const [custom, setCustom] = useState('');
  const [fund, setFund] = useState(funds[0]);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');

  const amount = preset === 'custom' ? Number(custom) : preset;
  const needsJoin = mode === 'member' && !member;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (needsJoin) return;
    if (!Number.isFinite(amount) || amount < 20) {
      setError('Please enter an amount of at least ₱20.');
      return;
    }
    setError('');
    const giver = mode === 'member' && member ? member.name : 'an anonymous giver';
    setDone(
      `Thank you, ${giver}. You chose to give ₱${amount.toLocaleString()} to ${fund}. This is a demo, so no money was taken.`,
    );
  }

  if (done) {
    return (
      <div className="form-card" role="status">
        <h3>Thank you.</h3>
        <p className="form-help">{done}</p>
        <button type="button" className="button button-outline" onClick={() => setDone('')}>
          Start again
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <fieldset className="segmented">
        <legend>How would you like to give?</legend>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === 'anonymous'}
            onChange={() => setMode('anonymous')}
          />
          <span>Anonymously</span>
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === 'member'}
            onChange={() => setMode('member')}
          />
          <span>As a member</span>
        </label>
      </fieldset>

      {mode === 'member' && (
        <p className="form-help">
          {member ? (
            <>Giving as {member.name}.</>
          ) : (
            <>
              You are not signed up yet. <a href="#join">Join us first</a>, then come back here.
            </>
          )}
        </p>
      )}

      <fieldset className="chips">
        <legend>Amount (PHP)</legend>
        {presets.map((p) => (
          <label key={p}>
            <input
              type="radio"
              name="amount"
              checked={preset === p}
              onChange={() => setPreset(p)}
            />
            <span>₱{p.toLocaleString()}</span>
          </label>
        ))}
        <label>
          <input
            type="radio"
            name="amount"
            checked={preset === 'custom'}
            onChange={() => setPreset('custom')}
          />
          <span>Other</span>
        </label>
      </fieldset>

      {preset === 'custom' && (
        <div className="field">
          <label htmlFor="donate-custom">Your amount</label>
          <input
            id="donate-custom"
            type="number"
            inputMode="numeric"
            min={20}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="donate-fund">Direct my gift to</label>
        <select id="donate-fund" value={fund} onChange={(e) => setFund(e.target.value)}>
          {funds.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="button" disabled={needsJoin}>
        Donate
      </button>
      <p className="form-note">
        Demo only: no payment details are collected and no money is taken.
      </p>
    </form>
  );
}