# Инструкция по настройке Capacitor для проекта "Занимательные жидкости"

> **Локальный репозиторий:** `C:\Users\user\Documents\lik2`

## Содержание
1. [Предварительные требования](#1-предварительные-требования)
2. [Установка Capacitor](#2-установка-capacitor)
3. [Конфигурация Capacitor](#3-конфигурация-capacitor)
4. [Настройка сборки Vite](#4-настройка-сборки-vite)
5. [Добавление платформ](#5-добавление-платформ)
6. [Кастомные иконки и сплеш-скрины](#6-кастомные-иконки-и-сплеш-скрины)
7. [Первая сборка и запуск](#7-первая-сборка-и-запуск)
8. [Полезные команды](#8-полезные-команды)
9. [Решение проблем](#9-решение-проблем)

---

## 1. Предварительные требования

### Общие требования

```bash
# Проверьте версию Node.js (требуется 18+)
node --version

# Проверьте версию npm
npm --version
```

### Для Android

1. **Java Development Kit (JDK) 17+**
   - Скачайте: https://adoptium.net/
   - Установите и добавьте в PATH

2. **Android Studio**
   - Скачайте: https://developer.android.com/studio
   - При установке выберите:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

3. **Настройка переменных окружения (Windows)**
   ```powershell
   # Добавьте в системные переменные:
   ANDROID_HOME = C:\Users\user\AppData\Local\Android\Sdk

   # Добавьте в PATH:
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```

### Для iOS (только macOS)

1. **Xcode 15+** из App Store
2. **Xcode Command Line Tools**
   ```bash
   xcode-select --install
   ```
3. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

---

## 2. Установка Capacitor

Откройте терминал в папке проекта:

```powershell
cd C:\Users\user\Documents\lik2
```

### Шаг 2.1: Установите Capacitor Core и CLI

```bash
npm install @capacitor/core @capacitor/cli
```

### Шаг 2.2: Инициализируйте Capacitor

```bash
npx cap init
```

При инициализации введите:
- **App name:** `Занимательные жидкости`
- **App Package ID:** `com.liquidworld.app`
- **Web asset directory:** `dist`

### Шаг 2.3: Установите платформы

```bash
# Для Android
npm install @capacitor/android

# Для iOS (только на macOS)
npm install @capacitor/ios
```

---

## 3. Конфигурация Capacitor

После инициализации в корне проекта появится файл `capacitor.config.ts`. Отредактируйте его:

```typescript
// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.liquidworld.app',
  appName: 'Занимательные жидкости',
  webDir: 'dist',

  // Настройки для Android
  android: {
    // Отключить web view debugging в production
    webContentsDebuggingEnabled: false,
    // Минимальная версия Android SDK
    minWebViewVersion: 60,
  },

  // Настройки для iOS
  ios: {
    // Отключить web view debugging в production
    webContentsDebuggingEnabled: false,
    // Цвет фона при загрузке
    backgroundColor: '#1a1a2e',
  },

  // Общие настройки
  server: {
    // Для разработки можно указать URL dev-сервера
    // url: 'http://192.168.1.100:3000',
    // cleartext: true,
  },

  plugins: {
    // Настройки Splash Screen
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#1a1a2e',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },

    // Настройки Status Bar
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1a1a2e',
    },
  },
};

export default config;
```

---

## 4. Настройка сборки Vite

Отредактируйте `vite.config.ts` для корректной работы с Capacitor:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // ВАЖНО: base должен быть './' для Capacitor
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    port: 3000,
    host: true, // Позволяет доступ с других устройств в сети
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Генерировать sourcemaps для отладки (опционально)
    sourcemap: false,
    // Оптимизация для мобильных устройств
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
```

---

## 5. Добавление платформ

### Шаг 5.1: Выполните первую сборку

```bash
npm run build
```

### Шаг 5.2: Добавьте платформу Android

```bash
npx cap add android
```

Эта команда создаст папку `android/` с нативным проектом.

### Шаг 5.3: Добавьте платформу iOS (только macOS)

```bash
npx cap add ios
```

Эта команда создаст папку `ios/` с нативным проектом.

---

## 6. Кастомные иконки и сплеш-скрины

### Шаг 6.1: Подготовьте исходные изображения

Создайте папку `resources/` в корне проекта:

```powershell
mkdir C:\Users\user\Documents\lik2\resources
```

Подготовьте следующие файлы:
- `resources/icon.png` — **1024x1024 px**, PNG, без прозрачности для iOS
- `resources/icon-foreground.png` — **1024x1024 px**, PNG, передний план для Android Adaptive Icons
- `resources/icon-background.png` — **1024x1024 px**, PNG, фон для Android Adaptive Icons
- `resources/splash.png` — **2732x2732 px**, PNG, сплеш-скрин
- `resources/splash-dark.png` — **2732x2732 px**, PNG, сплеш-скрин для тёмной темы (опционально)

### Шаг 6.2: Установите @capacitor/assets

```bash
npm install -D @capacitor/assets
```

### Шаг 6.3: Сгенерируйте иконки и сплеш-скрины

```bash
npx capacitor-assets generate
```

Эта команда автоматически:
- Создаст все необходимые размеры иконок для Android и iOS
- Создаст сплеш-скрины для всех разрешений
- Поддержит Android Adaptive Icons

### Альтернативный способ: Ручная настройка иконок

#### Для Android

Иконки размещаются в `android/app/src/main/res/`:

| Папка | Размер иконки |
|-------|---------------|
| `mipmap-mdpi/` | 48x48 px |
| `mipmap-hdpi/` | 72x72 px |
| `mipmap-xhdpi/` | 96x96 px |
| `mipmap-xxhdpi/` | 144x144 px |
| `mipmap-xxxhdpi/` | 192x192 px |

Файлы:
- `ic_launcher.png` — обычная иконка
- `ic_launcher_round.png` — круглая иконка
- `ic_launcher_foreground.png` — передний план (Adaptive Icon)
- `ic_launcher_background.png` — фон (Adaptive Icon)

#### Для iOS

Иконки размещаются в `ios/App/App/Assets.xcassets/AppIcon.appiconset/`:

Создайте иконки следующих размеров:
- 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

### Шаг 6.4: Настройка Adaptive Icons для Android

Отредактируйте `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

### Шаг 6.5: Настройка сплеш-скрина для Android

Отредактируйте `android/app/src/main/res/values/styles.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.NoActionBar">
        <item name="android:windowBackground">@drawable/splash</item>
        <item name="android:statusBarColor">#1a1a2e</item>
        <item name="android:navigationBarColor">#1a1a2e</item>
    </style>

    <style name="AppTheme.NoActionBarLaunch" parent="AppTheme">
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
```

Создайте `android/app/src/main/res/drawable/splash.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splash_background"/>
    <item
        android:drawable="@drawable/splash_image"
        android:gravity="center"/>
</layer-list>
```

Создайте `android/app/src/main/res/values/colors.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="splash_background">#1a1a2e</color>
</resources>
```

---

## 7. Первая сборка и запуск

### Шаг 7.1: Соберите веб-приложение

```bash
npm run build
```

### Шаг 7.2: Синхронизируйте с нативными проектами

```bash
npx cap sync
```

Эта команда:
- Копирует содержимое `dist/` в нативные проекты
- Устанавливает/обновляет нативные зависимости

### Шаг 7.3: Откройте проект в IDE

#### Android Studio
```bash
npx cap open android
```

#### Xcode (macOS)
```bash
npx cap open ios
```

### Шаг 7.4: Запуск на устройстве/эмуляторе

#### Через Android Studio:
1. Выберите устройство или эмулятор в панели инструментов
2. Нажмите **Run** (зелёный треугольник) или `Shift+F10`

#### Через командную строку:
```bash
# Запуск на подключённом Android устройстве
npx cap run android

# Запуск на эмуляторе (укажите имя AVD)
npx cap run android --target=Pixel_6_API_34
```

### Шаг 7.5: Live Reload для разработки

Для разработки с горячей перезагрузкой:

1. Запустите dev-сервер:
   ```bash
   npm run dev
   ```

2. Найдите IP вашего компьютера в локальной сети:
   ```powershell
   ipconfig
   # Найдите IPv4 Address, например: 192.168.1.100
   ```

3. Временно измените `capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://192.168.1.100:3000',
     cleartext: true,
   },
   ```

4. Синхронизируйте и запустите:
   ```bash
   npx cap sync
   npx cap run android
   ```

> **Важно:** Уберите настройку `server.url` перед финальной сборкой!

---

## 8. Полезные команды

### Ежедневная разработка

```bash
# Сборка + синхронизация + открытие IDE
npm run build && npx cap sync && npx cap open android

# Быстрая синхронизация (только копирование web-файлов)
npx cap copy

# Полная синхронизация (+ обновление нативных зависимостей)
npx cap sync

# Запуск на устройстве напрямую
npx cap run android
npx cap run ios
```

### Добавьте скрипты в package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "cap:sync": "npx cap sync",
    "cap:android": "npm run build && npx cap sync && npx cap open android",
    "cap:ios": "npm run build && npx cap sync && npx cap open ios",
    "cap:run:android": "npm run build && npx cap sync && npx cap run android",
    "cap:run:ios": "npm run build && npx cap sync && npx cap run ios"
  }
}
```

### Проверка конфигурации

```bash
# Информация о Capacitor
npx cap doctor

# Список доступных устройств
npx cap run android --list
```

---

## 9. Решение проблем

### Проблема: Белый экран при запуске

**Решение:**
1. Проверьте, что `base: './'` в `vite.config.ts`
2. Убедитесь, что `webDir: 'dist'` в `capacitor.config.ts`
3. Проверьте консоль в Chrome DevTools:
   ```bash
   chrome://inspect/#devices
   ```

### Проблема: Ресурсы (аудио, изображения) не загружаются

**Решение:**
1. Пути должны быть относительными: `./audio/music.mp3`
2. Или использовать import: `import music from './audio/music.mp3'`

### Проблема: Android Studio не видит SDK

**Решение:**
1. Откройте Android Studio → Settings → Languages & Frameworks → Android SDK
2. Установите нужные версии SDK (рекомендуется API 34)
3. Перезапустите терминал после настройки переменных окружения

### Проблема: Gradle ошибки сборки

**Решение:**
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

### Проблема: Иконки не обновляются

**Решение:**
1. Удалите приложение с устройства/эмулятора
2. В Android Studio: Build → Clean Project
3. Build → Rebuild Project
4. Запустите снова

### Проблема: CORS ошибки при Live Reload

**Решение:** Добавьте в `vite.config.ts`:
```typescript
server: {
  port: 3000,
  host: true,
  cors: true,
}
```

---

## Структура проекта после настройки

```
C:\Users\user\Documents\lik2\
├── android/                    # Нативный Android проект
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── res/           # Ресурсы (иконки, сплеш)
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   └── build.gradle
├── ios/                        # Нативный iOS проект (macOS)
│   ├── App/
│   │   └── App/
│   │       └── Assets.xcassets/
│   └── Podfile
├── resources/                  # Исходные изображения для иконок
│   ├── icon.png
│   ├── icon-foreground.png
│   ├── icon-background.png
│   └── splash.png
├── src/                        # Исходный код React
├── dist/                       # Собранное приложение
├── capacitor.config.ts         # Конфигурация Capacitor
├── vite.config.ts
├── package.json
└── ...
```

---

## Дополнительные плагины Capacitor

Для расширения функционала:

```bash
# Status Bar (управление статус баром)
npm install @capacitor/status-bar

# Splash Screen (управление сплеш-скрином)
npm install @capacitor/splash-screen

# App (события жизненного цикла)
npm install @capacitor/app

# Haptics (вибрация)
npm install @capacitor/haptics

# Storage (хранение данных)
npm install @capacitor/preferences

# Screen Orientation (управление ориентацией)
npm install @capacitor/screen-orientation
```

### Пример использования Screen Orientation

Так как ваше приложение предпочитает горизонтальную ориентацию:

```typescript
// В App.tsx
import { ScreenOrientation } from '@capacitor/screen-orientation';

useEffect(() => {
  // Блокировка в горизонтальной ориентации
  ScreenOrientation.lock({ orientation: 'landscape' });

  return () => {
    ScreenOrientation.unlock();
  };
}, []);
```

---

## Сборка релизной версии

### Android APK/AAB

1. Откройте Android Studio
2. Build → Generate Signed Bundle / APK
3. Создайте или выберите keystore
4. Выберите release build variant
5. Файл появится в `android/app/release/`

### Подписание через командную строку

```bash
cd android
./gradlew assembleRelease  # APK
./gradlew bundleRelease    # AAB для Google Play
```

---

## Контрольный список перед публикацией

- [ ] Удалены настройки `server.url` из `capacitor.config.ts`
- [ ] `webContentsDebuggingEnabled: false`
- [ ] Установлены кастомные иконки
- [ ] Установлен сплеш-скрин
- [ ] Протестировано на реальном устройстве
- [ ] Проверены все аудио-файлы
- [ ] Создан release keystore и сохранён в безопасном месте
- [ ] Версия приложения обновлена в `android/app/build.gradle`

---

*Документация создана для проекта "Занимательные жидкости" (Liquid World)*
*Технологии: React 19 + Vite + TypeScript + Capacitor*
