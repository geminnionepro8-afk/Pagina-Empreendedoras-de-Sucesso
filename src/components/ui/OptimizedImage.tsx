import { useState, useEffect, useRef, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  placeholderSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  objectPosition?: string;
  onLoad?: () => void;
  style?: React.CSSProperties;
}

/**
 * OptimizedImage — Componente profissional de imagem com:
 * - Lazy loading via IntersectionObserver (200px antecedência)
 * - Placeholder blur-up progressivo (miniatura borrada → nítida)
 * - Skeleton animado enquanto carrega
 * - `fetchpriority="high"` para imagens acima do fold
 * - `decoding="async"` para não bloquear o main thread
 */
const OptimizedImage = memo(({
  src,
  placeholderSrc,
  alt,
  className = '',
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  style,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images are "in view" immediately
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' } // Start loading 300px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className="optimized-image-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Skeleton background — always present until image loads */}
      {!isLoaded && (
        <div
          className="img-skeleton"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        />
      )}

      {/* Tiny placeholder (blur-up effect) */}
      {placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            opacity: placeholderLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2,
          }}
          onLoad={() => setPlaceholderLoaded(true)}
        />
      )}

      {/* Main image — only starts loading when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          className={className}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition,
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? 'blur(0)' : 'blur(10px)',
            transform: isLoaded ? 'scale(1)' : 'scale(1.02)',
            transition: 'opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out',
            zIndex: 3,
            ...style,
          }}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
