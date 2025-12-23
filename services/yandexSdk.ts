import type { SDK, Player } from 'ysdk';

// Глобальный интерфейс для YaGames
declare global {
  interface Window {
    YaGames: {
      init(): Promise<SDK>;
    };
  }
}

// Состояние SDK
let ysdk: SDK | null = null;
let player: Player | null = null;
let isInitialized = false;
let currentLanguage: string | null = null;

const supportedLangs = ['ru', 'en'] as const;

type SupportedLanguage = typeof supportedLangs[number];

const normalizeLang = (lang: string | undefined): SupportedLanguage | null => {
  if (!lang) return null;
  const lower = lang.toLowerCase();
  const base = lower.split('-')[0];
  if (supportedLangs.includes(lower as SupportedLanguage)) return lower as SupportedLanguage;
  if (supportedLangs.includes(base as SupportedLanguage)) return base as SupportedLanguage;
  return null;
};

// Интерфейс для данных прогресса
export interface GameProgress {
  currentLevel: number;
  maxLevel: number;
  audioSettings: {
    music: boolean;
    sfx: boolean;
  };
}

// Инициализация Yandex SDK
export async function initYandexSdk(): Promise<SDK | null> {
  if (isInitialized && ysdk) {
    return ysdk;
  }

  try {
    if (typeof window !== 'undefined' && window.YaGames) {
      ysdk = await window.YaGames.init();
      const environmentLang = (
        ysdk as unknown as { environment?: { i18n?: { lang?: string } } } | null
      )?.environment?.i18n?.lang;

      if (environmentLang) {
        const normalizedEnvLang = normalizeLang(environmentLang);
        if (normalizedEnvLang) {
          currentLanguage = normalizedEnvLang;
        }
        console.log('Yandex environment language detected:', environmentLang);
      }

      isInitialized = true;
      console.log('Yandex SDK initialized successfully');
      return ysdk;
    }
  } catch (error) {
    console.error('Failed to initialize Yandex SDK:', error);
  }

  return null;
}

// Инициализация игрока
export async function initPlayer(): Promise<Player | null> {
  if (player) {
    return player;
  }

  const sdk = await initYandexSdk();
  if (!sdk) {
    return null;
  }

  try {
    player = await sdk.getPlayer();
    console.log('Yandex Player initialized successfully');
    return player;
  } catch (error) {
    console.error('Failed to initialize player:', error);
    return null;
  }
}

// Получение данных из облачных сохранений
export async function getCloudData(): Promise<GameProgress | null> {
  const p = await initPlayer();
  if (!p) {
    return null;
  }

  try {
    const data = await p.getData(['currentLevel', 'maxLevel', 'audioSettings'] as const);

    if (data && (data.currentLevel !== undefined || data.maxLevel !== undefined)) {
      return {
        currentLevel: typeof data.currentLevel === 'number' ? data.currentLevel : 0,
        maxLevel: typeof data.maxLevel === 'number' ? data.maxLevel : 0,
        audioSettings: typeof data.audioSettings === 'object' && data.audioSettings !== null
          ? data.audioSettings as { music: boolean; sfx: boolean }
          : { music: true, sfx: true }
      };
    }
  } catch (error) {
    console.error('Failed to get cloud data:', error);
  }

  return null;
}

// Сохранение данных в облачные сохранения
export async function saveCloudData(progress: GameProgress): Promise<boolean> {
  const p = await initPlayer();
  if (!p) {
    return false;
  }

  try {
    await p.setData({
      currentLevel: progress.currentLevel,
      maxLevel: progress.maxLevel,
      audioSettings: progress.audioSettings
    }, true); // flush=true для немедленной синхронизации
    console.log('Cloud data saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save cloud data:', error);
    return false;
  }
}

// Интерфейс для колбэков полноэкранной рекламы
export interface FullscreenAdCallbacks {
  onOpen?: () => void;
  onClose?: () => void;
  onVisibilityChange?: (isHidden: boolean) => void;
}

// Показ полноэкранной рекламы
export function showFullscreenAd(callbacks?: FullscreenAdCallbacks): Promise<boolean> {
  return new Promise((resolve) => {
    if (!ysdk) {
      console.warn('SDK not initialized, skipping fullscreen ad');
      resolve(false);
      return;
    }

    // Обработчик изменения видимости вкладки
    const handleVisibilityChange = () => {
      const isHidden = document.visibilityState === 'hidden';
      callbacks?.onVisibilityChange?.(isHidden);
    };

    // Добавляем слушатель при открытии рекламы
    const addVisibilityListener = () => {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      // Сразу проверяем текущее состояние
      handleVisibilityChange();
    };

    // Удаляем слушатель при закрытии рекламы
    const removeVisibilityListener = () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Восстанавливаем звук при закрытии рекламы
      callbacks?.onVisibilityChange?.(false);
    };

    // Останавливаем геймплей перед рекламой
    stopGameplay();

    ysdk.adv.showFullscreenAdv({
      callbacks: {
        onOpen: () => {
          console.log('Fullscreen ad opened');
          callbacks?.onOpen?.();
          addVisibilityListener();
        },
        onClose: (wasShown) => {
          console.log('Fullscreen ad closed, wasShown:', wasShown);
          removeVisibilityListener();
          callbacks?.onClose?.();
          // Возобновляем геймплей после рекламы
          startGameplay();
          resolve(wasShown);
        },
        onError: (error) => {
          console.error('Fullscreen ad error:', error);
          removeVisibilityListener();
          callbacks?.onClose?.();
          // Возобновляем геймплей даже при ошибке
          startGameplay();
          resolve(false);
        }
      }
    });
  });
}

// Интерфейс для колбэков видео-рекламы с наградой
export interface RewardedVideoCallbacks {
  onOpen?: () => void;
  onClose?: () => void;
}

// Показ видео-рекламы с наградой
export function showRewardedVideo(callbacks?: RewardedVideoCallbacks): Promise<boolean> {
  return new Promise((resolve) => {
    if (!ysdk) {
      console.warn('SDK not initialized, skipping rewarded video');
      resolve(false);
      return;
    }

    let rewarded = false;

    // Останавливаем геймплей перед рекламой
    stopGameplay();

    ysdk.adv.showRewardedVideo({
      callbacks: {
        onOpen: () => {
          console.log('Rewarded video opened');
          callbacks?.onOpen?.();
        },
        onRewarded: () => {
          console.log('Rewarded!');
          rewarded = true;
        },
        onClose: () => {
          console.log('Rewarded video closed');
          callbacks?.onClose?.();
          // Возобновляем геймплей после рекламы
          startGameplay();
          resolve(rewarded);
        },
        onError: (error) => {
          console.error('Rewarded video error:', error);
          callbacks?.onClose?.();
          // Возобновляем геймплей даже при ошибке
          startGameplay();
          resolve(false);
        }
      }
    });
  });
}

// Сигнал о готовности игры
export function gameReady(): void {
  if (ysdk) {
    ysdk.features.LoadingAPI.ready();
    console.log('Game ready signal sent');
  }
}

// Сигнал о начале геймплея
export function startGameplay(): void {
  if (ysdk) {
    ysdk.features.GameplayAPI.start();
    console.log('Gameplay started');
  }
}

// Сигнал об остановке геймплея
export function stopGameplay(): void {
  if (ysdk) {
    ysdk.features.GameplayAPI.stop();
    console.log('Gameplay stopped');
  }
}

// Получение языка с учетом I18N данных из SDK и браузера
function resolveLanguage(preferredLang?: string): SupportedLanguage {
  const normalizedPreferred = normalizeLang(preferredLang);
  if (normalizedPreferred) return normalizedPreferred;

  const sdkLang = normalizeLang(ysdk?.environment?.i18n?.lang as string | undefined);
  const browserLang = normalizeLang(typeof navigator !== 'undefined' ? navigator.language || navigator.languages?.[0] : undefined);

  return sdkLang || browserLang || supportedLangs[0];
}

export function getLanguage(): string {
  return currentLanguage || resolveLanguage();
}

export async function setInterfaceLanguage(preferredLang?: string): Promise<SupportedLanguage> {
  const langToSet = resolveLanguage(preferredLang);
  currentLanguage = langToSet;

  if (typeof document !== 'undefined') {
    document.documentElement.lang = langToSet;
  }

  const sdk = await initYandexSdk();
  const i18nApi = (sdk as unknown as { i18n?: { setLang?: (lang: string) => Promise<void> } } | null)?.i18n;

  if (i18nApi && typeof i18nApi.setLang === 'function') {
    try {
      await i18nApi.setLang(langToSet);
      console.log('Interface language set via Yandex SDK:', langToSet);
    } catch (error) {
      console.error('Failed to set language via Yandex SDK:', error);
    }
  }

  return langToSet;
}

// Получение SDK
export function getSdk(): SDK | null {
  return ysdk;
}

// Проверка инициализации SDK
export function isYandexSdkInitialized(): boolean {
  return isInitialized && ysdk !== null;
}
