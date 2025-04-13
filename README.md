# Next.js 15 Starter Project

This is a modern full-stack web application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**. The project structure is modular and scalable, supporting both public and protected routes using Next.js App Router and middleware.

## 🧱 Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI**
- **Axios**
- **TankStack table**

## 📁 Project Structure

```
.
├── app/                # App router structure
│   ├── (auth)/         # Public routes (login, register)
│   ├── (dashboard)/    # Authenticated layout and pages
│   ├── layout.tsx      # Global layout
│   └── page.tsx        # Root page
├── components/         # UI and shared components
├── lib/                # Utilities (auth, api, constants)
├── middleware.ts       # Auth middleware
├── public/             # Static files
├── styles/             # Tailwind CSS config
├── types/              # TypeScript types
├── .env.local          # Environment variables
├── tailwind.config.ts  # Tailwind config
├── next.config.js      # Next.js config
└── package.json
```

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

## 📦 Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
  