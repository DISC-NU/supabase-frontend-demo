# Supabase Auth Frontend

A React TypeScript frontend application demonstrating Supabase authentication with a clean, modern UI built using Vite and Tailwind CSS.

## Features

- 🔐 User authentication (Sign up, Sign in, Sign out)
- 🛡️ Protected routes
- 💪 TypeScript for type safety

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Supabase account and project

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DISC-NU/supabase-frontend-demo.git
cd supabase-auth-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

To start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## Build

To build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthForm.tsx    # Authentication form component
│   └── Dashboard.tsx   # Dashboard component
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── lib/               # Utility functions and configurations
│   └── supabase.ts    # Supabase client configuration
├── types/             # TypeScript types and interfaces
│   └── index.ts       # Type definitions
├── App.tsx            # Main App component
├── AppRoutes.tsx      # Application routes
└── main.tsx          # Application entry point
```

## Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase project's anonymous key

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router DOM
- HeadlessUI/React
- HeroIcons

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
