# Hexlet Chat

[![Actions Status](https://github.com/ruslanmsk/frontend-project-lvl4/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ruslanmsk/frontend-project-lvl4/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ruslanmsk_frontend-project-lvl4&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ruslanmsk_frontend-project-lvl4)

> Реализация упрощенной версии Slack чата с использованием React, Redux Toolkit, Socket.io и Bootstrap

## 🚀 Демонстрация

**🌐 [Посмотреть проект](https://frontend-project-lvl4-mv02.onrender.com)**

📊 [Мониторинг развертывания](https://dashboard.render.com/web/srv-cv77fu8fnakc738htiog/events)

## 📋 Описание

Hexlet Chat — это веб-приложение для обмена сообщениями в реальном времени. Проект реализован в рамках обучения на платформе Hexlet и включает современные практики разработки фронтенда.

### Основные возможности

- 💬 Обмен сообщениями в реальном времени
- 📁 Создание и управление каналами
- 👤 Система регистрации и авторизации
- 🌐 Поддержка нескольких языков (русский/английский)
- 🚫 Модерация контента (фильтрация нецензурной лексики)
- 📱 Адаптивный дизайн

## 🛠 Технологии

- **Frontend**: React 19, Redux Toolkit, React Router
- **UI**: Bootstrap 5, React Bootstrap
- **Real-time**: Socket.io
- **Forms**: Formik + Yup
- **Internationalization**: i18next
- **Build Tool**: Vite
- **Deployment**: Render.com
- **Backend**: @hexlet/chat-server

## 🏃‍♂️ Быстрый старт

### Предварительные требования

- Node.js 20+
- npm

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/ruslanmsk/frontend-project-lvl4.git
cd frontend-project-lvl4

# Установка зависимостей
make install

# Запуск в режиме разработки
make start-frontend

# Сборка для продакшена
make build

# Запуск продакшен версии
make start
```

### Доступные команды

```bash
make install        # Установка зависимостей
make start-frontend # Запуск в режиме разработки (порт 5002)
make build         # Сборка проекта
make start         # Запуск продакшен версии
```

## 📁 Структура проекта

```
frontend-project-lvl4/
├── frontend/              # React приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── hooks/         # Кастомные хуки
│   │   ├── slices/        # Redux слайсы
│   │   ├── services/      # API сервисы
│   │   ├── contexts/      # React контексты
│   │   └── utils/         # Утилиты
│   ├── public/            # Статические файлы
│   └── package.json       # Зависимости фронтенда
├── package.json           # Основные зависимости
└── Makefile              # Команды сборки
```

## 🔧 Особенности реализации

- **State Management**: Redux Toolkit с RTK Query для работы с API
- **Real-time**: WebSocket соединение через Socket.io
- **Authentication**: JWT токены с сохранением в localStorage
- **Validation**: Клиентская валидация форм с Formik и Yup
- **Error Handling**: Rollbar для отслеживания ошибок
- **Moderation**: Автоматическая фильтрация нецензурной лексики

## 📚 Полезные ссылки

- [Документация сервера](https://www.npmjs.com/package/@hexlet/chat-server)
- [React Boilerplate](https://github.com/hexlet-components/js-react-hexlet-chat)
- [React Router v6 Guide](https://ru.hexlet.io/blog/posts/react-router-v6)
- [Formik Documentation](https://formik.org/docs/overview)
- [RTK Query Authentication](https://redux-toolkit.js.org/rtk-query/usage/examples#authentication)

