import React, { useRef, useEffect } from 'react';

interface VideoSource {
    src: string;
    type: string;
}

interface VideoProtectionProps {
    src?: string;
    sources?: VideoSource[];
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    controls?: boolean;
    onCanPlayThrough?: () => void;
    style?: React.CSSProperties;
}

export const VideoProtection: React.FC<VideoProtectionProps> = ({
    src,
    sources,
    poster,
    className = '',
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    preload = 'metadata',
    controls = false,
    onCanPlayThrough,
    style,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
    const handleDragStart = (e: React.DragEvent) => e.preventDefault();

    // Autoplay com fallback para poster
    useEffect(() => {
        const video = videoRef.current;
        if (video && autoPlay) {
            video.play().catch(() => {
                // Autoplay bloqueado pelo browser — cai no poster ou aguarda interação
            });
        }
    }, [autoPlay]);

    return (
        <video
            ref={videoRef}
            className={`video-protected ${className}`}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload={preload}
            controls={controls}
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            onCanPlayThrough={onCanPlayThrough}
            style={style}
        >
            {src && <source src={src} type="video/mp4" />}
            {sources?.map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
            ))}
            Seu navegador não suporta o elemento de vídeo protegido.
        </video>
    );
};

export default VideoProtection;
