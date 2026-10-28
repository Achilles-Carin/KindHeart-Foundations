import type { ReactNode } from 'react';

type Props = {
  title: string;
  children?: ReactNode;
  id?: string;
  tone?: 'default' | 'light';
};

export default function SectionHeading({ title, children, id, tone = 'default' }: Props) {
  return (
    <header className={`section-head ${tone === 'light' ? 'is-light' : ''}`}>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </header>
  );
}
