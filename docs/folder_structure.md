src/
├── api/                 # API clients, interceptors, and request/response types
├── assets/              # Static assets (images, fonts, icons, etc.)
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
├── components/          # Reusable, UI-only components (atomic design optional)
│   ├── common/          # Very generic (buttons, inputs, modals)
│   └── layout/          # Layout components (header, footer, sidebar)
├── config/              # Environment variables and app configuration
├── constants/           # Global constants (enums, routes, API endpoints)
├── features/            # Feature-based modules (core of the app)
│   ├── auth/            # Example feature: authentication
│   │   ├── components/  # Feature-specific components
│   │   ├── hooks/       # Feature-specific hooks
│   │   ├── services/    # Feature-specific business logic/API calls
│   │   ├── store/       # Feature-specific state (Redux slice / Zustand store)
│   │   ├── types/       # Feature-specific TypeScript types
│   │   ├── utils/       # Feature-specific utilities
│   │   └── index.ts     # Public API of the feature
│   ├── dashboard/
│   ├── user-profile/
│   └── ...              # Other features
├── hooks/               # Global, reusable custom hooks (app-wide)
├── lib/                 # Third-party library configurations (e.g., i18n, logger)
├── pages/               # Page-level components (route entry points)
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── ...
├── routes/              # Routing configuration (React Router)
│   ├── index.tsx
│   └── PrivateRoute.tsx
├── store/               # Global store setup (Redux store, providers)
│   ├── index.ts
│   └── rootReducer.ts
├── styles/              # Global CSS/Sass/Tailwind files
│   ├── globals.css
│   └── variables.css
├── types/               # Global TypeScript types/interfaces
├── utils/               # Global utility functions (date formatting, validators)
├── App.tsx              # Root component
├── .env
├── main.tsx             # Entry point
└── vite-env.d.ts        # (or react-app-env.d.ts) for environment types