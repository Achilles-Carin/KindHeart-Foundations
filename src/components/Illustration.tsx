import type { ReactNode } from 'react';

export type Kind = 'hero' | 'food' | 'education' | 'outreach' | 'family' | 'about';

const heart = 'M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z';
const GREEN = '#1f5a40';
const DEEP = '#153f2d';
const MANGO = '#f2b134';
const ROSE = '#d2455b';
const PAPER = '#f5f6f1';

const person = (x: number, head: number, body: number, fill: string) => (
  <>
    <circle cx={x} cy={360 - body - head - 14} r={head} fill={fill} />
    <rect x={x - head * 1.3} y={360 - body} width={head * 2.6} height={body} rx={head * 1.3} fill={fill} />
  </>
);

const scenes: Record<Kind, ReactNode> = {
  hero: (
    <>
      <circle cx="300" cy="560" r="340" fill={GREEN} />
      <circle cx="470" cy="120" r="54" fill={MANGO} />
      <g transform="translate(176 60) scale(10)">
        <path d={heart} fill={ROSE} />
      </g>
    </>
  ),
  food: (
    <>
      <rect y="340" width="600" height="110" fill={DEEP} />
      <path d="M130 230h340a170 120 0 0 1 -340 0z" fill={GREEN} />
      <rect x="120" y="218" width="360" height="16" rx="8" fill={PAPER} />
      <path d="M240 190c-24-30 20-50-2-84M300 190c-24-30 20-50-2-84M360 190c-24-30 20-50-2-84" fill="none" stroke={MANGO} strokeWidth="10" strokeLinecap="round" />
    </>
  ),
  education: (
    <>
      <path d="M300 160C240 130 160 130 100 150v200c60-20 140-20 200 10z" fill={GREEN} />
      <path d="M300 160c60-30 140-30 200-10v200c-60-20-140-20-200 10z" fill={PAPER} stroke={GREEN} strokeWidth="8" />
      <rect x="380" y="70" width="26" height="170" rx="4" transform="rotate(30 393 155)" fill={MANGO} />
    </>
  ),
  outreach: (
    <>
      <rect y="360" width="600" height="90" fill={DEEP} />
      {person(190, 34, 104, GREEN)}
      {person(300, 38, 128, MANGO)}
      {person(410, 34, 104, GREEN)}
      <g transform="translate(278 40) scale(2)">
        <path d={heart} fill={ROSE} />
      </g>
    </>
  ),
  family: (
    <>
      <rect y="360" width="600" height="90" fill={DEEP} />
      {person(220, 36, 130, GREEN)}
      {person(340, 36, 130, ROSE)}
      {person(280, 24, 70, MANGO)}
    </>
  ),
  about: (
    <>
      <circle cx="430" cy="150" r="64" fill={MANGO} />
      <path d="M0 360C120 270 220 270 330 330S520 340 600 290V450H0z" fill={GREEN} />
      <path d="M0 410C140 340 260 360 380 400S540 400 600 380V450H0z" fill={DEEP} />
      <g transform="translate(120 90) scale(5)">
        <path d={heart} fill={ROSE} />
      </g>
    </>
  ),
};

export default function Illustration({ kind }: { kind: Kind }) {
  return (
    <svg
      className="illustration"
      viewBox="0 0 600 450"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="600" height="450" fill="#dfe8da" />
      {scenes[kind]}
    </svg>
  );
}
