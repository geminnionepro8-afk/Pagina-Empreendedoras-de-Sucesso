import { useEffect } from 'react';

// ============================================
// TECLAS PERMITIDAS (UX)
// ============================================
const UX_SAFE_KEYS: Record<string, boolean> = {
    Tab: true, Escape: true, Enter: true, F5: true,
    ArrowUp: true, ArrowDown: true, ArrowLeft: true, ArrowRight: true,
};

// ============================================
// DETECÇÃO DE CRAWLER (SEO)
// ============================================
const isSearchBot = (): boolean => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent.toLowerCase();
    return (
        ua.includes('googlebot') || ua.includes('bingbot') ||
        ua.includes('yandexbot') || ua.includes('duckduckbot') ||
        ua.includes('slurp') || ua.includes('baiduspider')
    );
};

// ============================================
// CONFIGURAÇÃO
// ============================================
interface ContentProtectionConfig {
    blockContextMenu: boolean;
    blockKeyboardShortcuts: boolean;
    blockDragDrop: boolean;
    protectClipboard: boolean;
    protectedCopyMessage: string;
    allowSearchBots: boolean;
}

const DEFAULT_CONFIG: ContentProtectionConfig = {
    blockContextMenu: true,
    blockKeyboardShortcuts: true,
    blockDragDrop: true,
    protectClipboard: true,
    protectedCopyMessage: '© Empreendedoras de Sucesso - Conteúdo Protegido',
    allowSearchBots: true,
};

// ============================================
// MÓDULO 1: BLOQUEIO DE INTERFACE
// ============================================
const initInterfaceProtection = (config: ContentProtectionConfig): (() => void) => {
    const handlers: { event: string; handler: EventListener; target: EventTarget }[] = [];

    // 1. Bloqueio de clique direito (menu de contexto)
    if (config.blockContextMenu) {
        const handler = (e: Event) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        };
        document.addEventListener('contextmenu', handler, true);
        handlers.push({ event: 'contextmenu', handler, target: document });
    }

    // 2. Bloqueio de atalhos de teclado
    if (config.blockKeyboardShortcuts) {
        const handler = (e: Event) => {
            const ke = e as KeyboardEvent;
            
            // Teclas UX-safe: SEMPRE permitir
            if (UX_SAFE_KEYS[ke.key]) return;

            // Ctrl/Cmd + combinações
            if (ke.ctrlKey || ke.metaKey) {
                // Ctrl+U (View Source)
                if (/^[Uu]$/.test(ke.key)) {
                    ke.preventDefault();
                    ke.stopImmediatePropagation();
                    return;
                }
                // Ctrl+S (Salvar Página)
                if (/^[Ss]$/.test(ke.key)) {
                    ke.preventDefault();
                    ke.stopImmediatePropagation();
                    return;
                }
                // Ctrl+P (Imprimir / Salvar como PDF)
                if (/^[Pp]$/.test(ke.key)) {
                    ke.preventDefault();
                    ke.stopImmediatePropagation();
                    return;
                }
            }
        };
        window.addEventListener('keydown', handler, true);
        handlers.push({ event: 'keydown', handler, target: window });
    }

    // 3. Bloqueio de drag & drop global (impede arrastar texto)
    if (config.blockDragDrop) {
        const handler = (e: Event) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        };
        window.addEventListener('dragstart', handler, true);
        handlers.push({ event: 'dragstart', handler, target: window });
    }

    // Cleanup: remove todos os listeners
    return () => {
        handlers.forEach(({ event, handler, target }) => {
            target.removeEventListener(event, handler, true);
        });
    };
};

// ============================================
// MÓDULO 2: PROTEÇÃO DE CLIPBOARD
// ============================================
const initClipboardProtection = (config: ContentProtectionConfig): (() => void) => {
    const handlers: { event: string; handler: EventListener; target: EventTarget }[] = [];

    if (config.protectClipboard) {
        // Interceptar COPY (Ctrl+C)
        const copyHandler = (e: Event) => {
            const ce = e as ClipboardEvent;
            // Apenas para textos
            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
                ce.preventDefault();
                ce.stopImmediatePropagation();
                ce.clipboardData?.setData('text/plain', config.protectedCopyMessage);
            }
        };

        // Interceptar CUT (Ctrl+X)
        const cutHandler = (e: Event) => {
            const ce = e as ClipboardEvent;
            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
                ce.preventDefault();
                ce.stopImmediatePropagation();
                ce.clipboardData?.setData('text/plain', config.protectedCopyMessage);
            }
        };

        document.addEventListener('copy', copyHandler, true);
        document.addEventListener('cut', cutHandler, true);
        handlers.push({ event: 'copy', handler: copyHandler, target: document });
        handlers.push({ event: 'cut', handler: cutHandler, target: document });
    }

    return () => {
        handlers.forEach(({ event, handler, target }) => {
            target.removeEventListener(event, handler, true);
        });
    };
};

// ============================================
// INICIALIZADOR PRINCIPAL
// ============================================
let cleanupFunctions: (() => void)[] = [];

export const initContentProtection = (
    userConfig: Partial<ContentProtectionConfig> = {}
): (() => void) => {
    const config = { ...DEFAULT_CONFIG, ...userConfig };

    // SEO: NÃO aplicar proteções para crawlers de busca
    if (config.allowSearchBots && isSearchBot()) {
        return () => {};
    }

    // Limpar inicialização anterior (evita memory leak)
    cleanupFunctions.forEach((fn) => fn());
    cleanupFunctions = [];

    // Inicializar módulos
    cleanupFunctions.push(initInterfaceProtection(config));
    cleanupFunctions.push(initClipboardProtection(config));

    // Retornar cleanup master
    return () => {
        cleanupFunctions.forEach((fn) => fn());
        cleanupFunctions = [];
    };
};

// ============================================
// REACT HOOK
// ============================================
export const useContentProtection = (
    config: Partial<ContentProtectionConfig> = {}
) => {
    useEffect(() => {
        const cleanup = initContentProtection(config);
        return cleanup;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
