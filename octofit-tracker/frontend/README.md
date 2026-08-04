# Octofit Tracker Frontend

React 19 and Vite presentation tier for the Octofit Tracker multi-tier application.

## Environment

`VITE_CODESPACE_NAME` must be defined when running in GitHub Codespaces, for example in `.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When it is unset, the app safely falls back to `http://localhost:8000/api` to avoid `https://undefined-8000...` URLs.
