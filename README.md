# Domain Threat Intelligence HUB

Магистерская диссертация по кибербезопасности на тему обнаружения вредоносных доменов. Единая точка для управления и
проведения всех операций.
Предоставляет пользовательский интерфейс для взаимодействия с основным API.

Ссылки:

- [Основной проект на GitLab](https://gitlab.qvineox.ru/masters/domain-threat-intelligence-hub)
- [Зеркало на GitHub](https://github.com/Qvineox/domain-threat-intelligence-hub-mirror)

## Установка и разработка

### Сборка и запуск

Для сборки и запуска приложения необходимо выполнить следующие команды. Обратите внимание, что необходимые переменные
окружения должны
находиться в файле ./config/.env.development или в окружении для запуска приложения. Запускается из корня проекта.

```shell
npm run dev --host
```

### Окружение

В приложении используются следующие переменные. Эти переменные также отображаются в автоматизированном GitLab CI/CD:

| Переменная       | 	Необходимость | 	GitLab CI переменная | 	Описание           | 	Пример                    |
|------------------|----------------|-----------------------|---------------------|----------------------------|
| VITE_API_URL     |                | API_URL               | Backend API URL     | http://localhost:7090      |
| VITE_API_VERSION |                | API_VERSION           | Backend API version | v1                         |
| VITE_APP_VERSION | optional       | APP_VERSION           | Application version | v0.1.0                     |
| VITE_APP_BRANCH  | optional       | APP_BRANCH            | Application branch  | test                       |
| VITE_BUILD_ID    | optional       | CI_COMMIT_SHORT_SHA   | Git build ID        | d4e5c67d                   |
| VITE_TITLE_NAME  | optional       | TITLE_NAME            | Page title name     | DTI                        |
| VITE_HOME_NAME   | optional       | HOME_NAME             | Home page name      | Domain Threat Intelligence |

## Демо

> TODO: coming soon...
