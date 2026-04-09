import { useEffect } from 'react';

/**
 * useImagePreloader
 * 
 * Pré-carrega um array de URLs de imagem em background usando o
 * cache do navegador. Útil para antecipar o carregamento de imagens
 * que o usuário provavelmente verá (ex: próximo speaker no carrossel).
 * 
 * @param urls - Array de URLs para pré-carregar
 * @param enabled - Ativa/desativa o preloading (default: true)
 */
export function useImagePreloader(urls: string[], enabled = true) {
  useEffect(() => {
    if (!enabled || urls.length === 0) return;

    const images: HTMLImageElement[] = [];

    // Use requestIdleCallback to avoid blocking the main thread
    const schedule = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));

    schedule(() => {
      for (const url of urls) {
        if (!url) continue;
        const img = new Image();
        img.src = url;
        images.push(img);
      }
    });

    return () => {
      // Cancel any ongoing loads
      for (const img of images) {
        img.src = '';
      }
    };
  }, [urls.join(','), enabled]);
}

/**
 * preloadImage
 * 
 * Pré-carrega uma única imagem. Retorna Promise que resolve com o URL
 * quando a imagem estiver no cache do browser.
 */
export function preloadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}
