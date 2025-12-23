import { useEffect, useState } from 'react';
import { getLanguage, setInterfaceLanguage } from '../services/yandexSdk';

export function useInterfaceLanguage(preferredLang: 'ru' | 'en' = 'ru') {
  const [language, setLanguage] = useState<string>(() => getLanguage());

  useEffect(() => {
    let mounted = true;

    const applyLanguage = async () => {
      const lang = await setInterfaceLanguage(preferredLang);
      if (mounted) {
        setLanguage(lang);
      }
    };

    applyLanguage();

    return () => {
      mounted = false;
    };
  }, [preferredLang]);

  return language;
}
