# Architecture Overview - FlowCycle

## 1. Overview

FlowCycle is a full-stack web application for menstrual cycle tracking and subscription-based delivery of period products. The application allows users to:

- Track their menstrual cycle data
- Browse and purchase period products
- Set up recurring subscription deliveries
- Request emergency deliveries

The system follows a modern client-server architecture with a clear separation between frontend and backend components. It uses React for the frontend, Express.js for the backend, and PostgreSQL for data persistence.

## 2. System Architecture

The application follows a layered architecture with the following main components:

### 2.1 Frontend (Client)

- **Framework**: React with TypeScript
- **UI Components**: Uses Radix UI components via shadcn/ui library
- **State Management**: React Context API for global state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod for validation
- **Styling**: Tailwind CSS for utility-first styling

### 2.2 Backend (Server)

- **Framework**: Express.js with TypeScript
- **API**: RESTful API endpoints for data operations
- **Database Access**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod for input validation
- **Development Tools**: Vite for development server with HMR

### 2.3 Database

- **Type**: PostgreSQL (via Neon Serverless)
- **ORM**: Drizzle for schema definition and database operations
- **Schema Management**: Drizzle Kit for migrations

### 2.4 Authentication

- The system implements a custom authentication mechanism using:
  - Local storage for client-side session persistence
  - Password-based authentication
  - Context-based auth state management

## 3. Key Components

### 3.1 Frontend Components

#### 3.1.1 Pages
- `Login/Register`: User authentication pages
- `Dashboard`: Cycle tracking and overview
- `Products`: Product browsing and shopping
- `Subscription`: Subscription management

#### 3.1.2 Context Providers
- `AuthContext`: User authentication state
- `CycleDataContext`: Menstrual cycle tracking data
- `CartContext`: Shopping cart management
- `SubscriptionContext`: Subscription handling

#### 3.1.3 UI Components
- `Layout`: Common page structure with header and navigation
- `CycleCalendar`: Visual representation of the user's cycle
- `ProductCard`: Product display component
- `CartOverlay`: Shopping cart interface
- `EmergencyDeliveryModal`: Modal for emergency product delivery

### 3.2 Backend Components

#### 3.2.1 Server Setup
- Express application configuration
- Route registration
- Middleware setup
- Static file serving
- Vite development integration

#### 3.2.2 API Routes
- User management (`/api/users/*`)
- Cycle data management (`/api/cycle-data/*`)
- Product management (implied from frontend)
- Subscription management (implied from frontend)
- Emergency delivery handling (implied from frontend)

#### 3.2.3 Storage
- Database interaction via Drizzle ORM
- Memory storage implementation for development/testing

### 3.3 Database Schema

The database schema includes the following main entities:

- `users`: User account information
- `cycle_data`: Menstrual cycle tracking information
- `products`: Period product catalog
- `product_flow_types`: Product suitability for different flow types
- `subscriptions`: User subscription details
- `subscription_products`: Products included in a subscription
- `emergency_deliveries`: One-time emergency delivery records

## 4. Data Flow

### 4.1 Authentication Flow

1. User registers or logs in through the frontend
2. Credentials are validated by the backend
3. User information is stored in context and local storage
4. Protected routes check auth state before rendering

### 4.2 Cycle Tracking Flow

1. User inputs cycle data through the frontend form
2. Data is validated with Zod
3. Data is sent to the backend API
4. Backend saves data to the database
5. Frontend displays cycle visualization and product recommendations

### 4.3 Shopping Flow

1. User browses products and adds them to cart
2. Cart state is managed in context and persisted in local storage
3. User checks out with one-time purchase or subscription
4. Order information is sent to backend
5. Backend processes order and updates database

### 4.4 Subscription Flow

1. User selects products and frequency
2. User provides delivery address
3. Subscription details are sent to backend
4. Backend creates subscription record
5. System schedules recurring deliveries

## 5. External Dependencies

### 5.1 UI Components
- Radix UI: Accessible UI primitive components
- shadcn/ui: High-level components built on Radix UI
- Tailwind CSS: Utility-first CSS framework
- Lucide: Icon library

### 5.2 Form Handling
- React Hook Form: Form state management
- Zod: Schema validation

### 5.3 Data Management
- Drizzle ORM: Database operations
- Drizzle Zod: Integration between Drizzle and Zod
- TanStack Query: Data fetching and caching (setup but not fully utilized)

### 5.4 Development Tools
- Vite: Frontend build tool and dev server
- TypeScript: Static typing
- ESBuild: Server-side code bundling

### 5.5 Database
- Neon Serverless PostgreSQL: Serverless database service

## 6. Deployment Strategy

The application is configured for deployment on Replit, with the following setup:

### 6.1 Development Environment
- Node.js 20
- PostgreSQL 16
- Vite dev server for hot module reloading

### 6.2 Build Process
1. Frontend is built using Vite
2. Backend is bundled using ESBuild
3. Output is generated to the `dist` directory

### 6.3 Production Environment
- The application is served by the Node.js backend
- Static assets are served from the `dist/public` directory
- Environment variables control database connections and runtime behavior

### 6.4 Scaling Approach
- The application uses a simple monolithic architecture
- Replit's autoscale deployment target handles scaling
- Database connection is made via Neon's serverless PostgreSQL

## 7. Development Considerations

### 7.1 Local Development
- `npm run dev` starts the development server
- Database schema can be updated with `npm run db:push`
- TypeScript type checking with `npm run check`

### 7.2 Environment Configuration
- Different configurations for development and production
- Database URL required via environment variables
- Frontend build is optimized for production

### 7.3 Future Extensibility
- Schema is designed to support product variations
- Subscription system allows for flexible delivery schedules
- Emergency delivery system provides on-demand service options