# Frontend Winners - Telegram WebApp

Приложение для работы с каталогом товаров через Telegram WebApp API.

## Технологии

- React + TypeScript + Vite
- Telegram WebApp API
- CSS с поддержкой тем Telegram

## Установка и запуск

### Предварительные требования

- Node.js (версия 18 или выше)
- npm или yarn

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка SSL сертификатов для локальной разработки

Приложение работает через HTTPS, поэтому необходимо настроить локальные SSL сертификаты.

#### Для macOS:

```bash
# Установка mkcert
brew install mkcert
brew install nss  # если используете Firefox

# Создание сертификата для локального домена
mkcert mercatus.local

# Установка корневого сертификата
mkcert --install

# Добавление домена в hosts файл
sudo echo "127.0.0.1 mercatus.local" >> /etc/hosts
```

#### Для Windows:

```bash
# Установка через Chocolatey (если установлен)
choco install mkcert

# Или скачать с https://github.com/FiloSottile/mkcert/releases
# и добавить в PATH

# Создание сертификата для локального домена
mkcert mercatus.local

# Установка корневого сертификата
mkcert --install

# Добавление домена в hosts файл
# Открыть файл C:\Windows\System32\drivers\etc\hosts от имени администратора
# Добавить строку: 127.0.0.1 mercatus.local
```

#### Для Linux:

```bash
# Установка mkcert
sudo apt install libnss3-tools
wget -O mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
chmod +x mkcert
sudo mv mkcert /usr/local/bin/

# Создание сертификата для локального домена
mkcert mercatus.local

# Установка корневого сертификата
mkcert --install

# Добавление домена в hosts файл
sudo echo "127.0.0.1 mercatus.local" >> /etc/hosts
```

### 3. Запуск приложения

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр продакшен сборки
npm run preview
```

Приложение будет доступно по адресу: `https://mercatus.local:5173`

## Структура проекта

```
src/
├── app/                    # Основные компоненты приложения
├── entities/               # Бизнес-сущности
├── features/               # Функциональные компоненты
│   ├── CardItem/          # Карточка товара
│   ├── InitializeTgApp/   # Инициализация Telegram WebApp
│   └── TelegramHaptic/    # Haptic feedback
├── pages/                  # Страницы приложения
│   ├── CartItemsPage/     # Страница корзины
│   ├── CatalogPage/       # Страница каталога
│   ├── MainPage/          # Главная страница
│   └── SupportChatPage/   # Страница поддержки
├── processes/              # Бизнес-процессы
├── shared/                 # Общие компоненты и утилиты
│   ├── api/               # API клиент
│   └── lib/               # Библиотеки и хуки
└── widgets/                # Виджеты
    ├── BottomBar/         # Нижняя панель навигации
    └── Filter/            # Фильтр товаров
```

## Особенности

- Поддержка тем Telegram (светлая/темная)
- Адаптивный дизайн
- Haptic feedback для мобильных устройств
- Корзина товаров
- Каталог с фильтрацией

## Разработка

### ESLint конфигурация

Проект использует ESLint с TypeScript поддержкой. Для более строгой проверки типов рекомендуется обновить конфигурацию:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // Для более строгих правил
      tseslint.configs.strictTypeChecked,
      // Стилистические правила
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### React Compiler

React Compiler не включен в шаблон из-за влияния на производительность разработки и сборки. Для добавления см. [документацию](https://react.dev/learn/react-compiler/installation).