# 🌷 [FlowCycle](https://flowcycle.netlify.app/) https://flowcycle.netlify.app/

FlowCycle is a modern web application built with React, Express, and TypeScript, featuring a robust full-stack architecture with real-time capabilities.

FlowCycle is a comprehensive menstrual cycle tracking and period product delivery application. It helps users track their menstrual cycles while providing personalized product recommendations and subscription-based delivery of period products. The app features a user-friendly dashboard for cycle visualization, customizable product subscriptions, and emergency delivery options when needed.

## ✨ Features

- Modern React frontend with TypeScript
- Express.js backend server
- Real-time WebSocket communication
- User authentication with Firebase and Passport.js
- Database integration with Drizzle ORM
- Beautiful UI components using Radix UI
- Responsive design with Tailwind CSS
- Form handling with React Hook Form and Zod validation

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- React Router
- React Query
- Framer Motion
- React Hook Form

### Backend
- Express.js
- WebSocket (ws)
- Firebase Authentication
- Drizzle ORM
- PostgreSQL (via Neon Serverless)

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd FlowCycle
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (if required)

## 🚀 Development

To run the development server:

```bash
npm run dev
```

This will start both the frontend and backend in development mode.

## 🏗️ Building for Production

To build the application:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## 🔧 Project Structure

```
FlowCycle/
├── client/           # Frontend React application
│   ├── src/         # Source files
│   └── public/      # Static files
├── server/          # Backend Express server
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   ├── storage.ts   # Data storage logic
│   └── vite.ts      # Vite configuration
├── shared/          # Shared types and utilities
└── package.json     # Project dependencies
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 
