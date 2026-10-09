import type { ReactNode } from 'react';

export type Kind = 'hero' | 'food' | 'education' | 'outreach';

const heart = 'M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z';

const scenes: Record<Kind, ReactNode> = {
  hero: (
    <>
      <circle cx="300" cy="560" r="330" fill="#285943" />
      <g transform="translate(180 50) scale(10)">
        <path d={heart} fill="#f07861" />
      </g>
    </>
  ),
  food: (
    <>
      <ellipse cx="300" cy="340" rx="190" ry="18" fill="#d9cdb6" />
      <path d="M130 230h340a170 120 0 0 1 -340 0z" fill="#285943" />
      <path d="M240 190c-24-30 20-50-2-84M300 190c-24-30 20-50-2-84M360 190c-24-30 20-50-2-84" fill="none" stroke="#f07861" strokeWidth="10" strokeLinecap="round" />
    </>
  ),
  education: (
    <>
      <path d="M300 160C240 130 160 130 100 150v200c60-20 140-20 200 10z" fill="#285943" />
      <path d="M300 160c60-30 140-30 200-10v200c-60-20-140-20-200 10z" fill="#f6eedf" stroke="#285943" strokeWidth="8" />
      <rect x="380" y="70" width="26" height="170" rx="4" transform="rotate(30 393 155)" fill="#f07861" />
    </>
  ),
  outreach: (
    <>
      <circle cx="190" cy="200" r="36" fill="#285943" />
      <rect x="150" y="248" width="80" height="110" rx="40" fill="#285943" />
      <circle cx="300" cy="170" r="40" fill="#f07861" />
      <rect x="256" y="222" width="88" height="136" rx="44" fill="#f07861" />
      <circle cx="410" cy="200" r="36" fill="#285943" />
      <rect x="370" y="248" width="80" height="110" rx="40" fill="#285943" />
      <g transform="translate(276 40) scale(2)">
        <path d={heart} fill="#24352d" />
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
      <rect width="600" height="450" fill="#ede3d0" />
      {scenes[kind]}
    </svg>
  );
}