import React from 'react';

interface ImageProtectionProps {
    src: string;
    alt: string;
    className?: string;
    wrapperClassName?: string;
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'sync' | 'auto';
    srcSet?: string;
    sizes?: string;
}

export const ImageProtection: React.FC<ImageProtectionProps> = ({
    src,
    alt,
    className = '',
    wrapperClassName = '',
    width,
    height,
    loading = 'lazy',
    decoding = 'async',
    srcSet,
    sizes,
}) => {
    const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
    const handleDragStart = (e: React.DragEvent) => e.preventDefault();

    return (
        <div
            className={`img-protection-wrapper ${wrapperClassName}`}
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
        >
            <img
                src={src}
                alt={alt}
                className={className}
                width={width}
                height={height}
                loading={loading}
                decoding={decoding}
                srcSet={srcSet}
                sizes={sizes}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                draggable={false}
            />
            {/* Overlay transparente — intercepta todos os eventos */}
            <div
                className="img-guard"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                aria-hidden="true"
            />
        </div>
    );
};

export default ImageProtection;
