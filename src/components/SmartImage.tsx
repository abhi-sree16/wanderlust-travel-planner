import { useState } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

export default function SmartImage({ src, alt, className = '', loading = 'lazy' }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200" />
      )}
      {errored ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-50">
          <span className="font-serif text-lg italic text-primary-400">Wanderlust</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-xl'
          }`}
        />
      )}
    </div>
  );
}
