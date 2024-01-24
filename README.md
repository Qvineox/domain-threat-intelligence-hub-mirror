# Domain Threat Intelligence HUB

Masters thesis in cyber security on malicious domains detection. Operations Hub.
Provides Web UI and user interface to interact with core API.

This projecr is mirrored from GitLab.

Links:

- [Main project on GitLab](https://gitlab.qvineox.ru/masters/domain-threat-intelligence-hub)
- [Mirror on GitHub](https://github.com/Qvineox/domain-threat-intelligence-hub-mirror)

## Setup and deployment

### Building and running

Following commands should be executed to build and run the application. Note that required environment variables should
be in ./config/.env.development file or in environment to start the application. Runs from project root.

```shell
npm run dev --host
```

### Environment

Following variables are used in application. These variables are also mapped in automated GitLab CI/CD:

| Environment Variable | 	Is Required? | 	GitLab CI Variable | 	Description        | 	Example values       |
|----------------------|---------------|---------------------|---------------------|-----------------------|
| VITE_API_URL         |               | API_URL             | Backend API URL     | http://localhost:7090 |
| VITE_API_VERSION     |               | API_VERSION         | Backend API version | v1                    |
| VITE_APP_VERSION     | optional      | APP_VERSION         | Application version | v0.1.0                |
| VITE_APP_BRANCH      | optional      | APP_BRANCH          | Application branch  | test                  |
| VITE_BUILD_ID        | optional      | BUILD_ID            | Git build ID        | d4e5c67d              |
| VITE_TITLE_NAME        | optional      | BUILD_ID            | Git build ID        | d4e5c67d              |

## Demo

> TODO: coming soon...
