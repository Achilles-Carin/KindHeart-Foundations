import { Link, type LinkProps } from 'react-router-dom';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'accent' | 'outline' | 'light';

type Shared = { variant?: Variant; block?: boolean };

const cls = (variant: Variant, block?: boolean, extra?: string) =>
  ['btn', `btn-${variant}`, block ? 'btn-block' : '', extra ?? ''].filter(Boolean).join(' ');

export default function Button({
  variant = 'primary',
  block,
  className,
  type = 'button',
  ...rest
}: Shared & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cls(variant, block, className)} {...rest} />;
}

export function LinkButton({
  variant = 'primary',
  block,
  className,
  ...rest
}: Shared & LinkProps) {
  return <Link className={cls(variant, block, className)} {...rest} />;
}
