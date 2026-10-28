import { useState } from 'react';
import { getPhoto } from '../lib/photos';
import Illustration, { type Kind } from './Illustration';

type Props = {
  name: Kind;
  alt: string;
  priority?: boolean;
  className?: string;
};

export default function Photo({ name, alt, priority = false, className = '' }: Props) {
  const src = getPhoto(name);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const showImage = Boolean(src) && status !== 'error';

  return (
    <div className={`photo ${className}`}>
      {!showImage && (
        <div role="img" aria-label={alt} className="photo-fallback">
          <Illustration kind={name} />
        </div>
      )}
      {showImage && status === 'loading' && <div className="photo-skeleton" aria-hidden="true" />}
      {showImage && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={status === 'loaded' ? 'is-loaded' : ''}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
}
