# FlowCycle - Full Software Project Report

## Project Information
- **Project Title:** FlowCycle
- **Subtitle:** Sanitary Product Subscription & Emergency Delivery App
- **Submitted by:** Nishi Mewada
- **Course:** ITIS 4010 AI Driven Software Development
- **Instructor:** Prof. Fabio Nolasco
- **Date:** May 5th, 2025

## Table of Contents
1. [Title Page](#title-page)
2. [Table of Contents](#table-of-contents)
3. [Executive Summary](#executive-summary)
4. [Project Planning](#project-planning)
5. [Requirements Gathering](#requirements-gathering)
6. [User Personas](#user-personas)
7. [Definition of Purpose](#definition-of-purpose)
8. [Target Audience](#target-audience)
9. [Competitive Analysis](#competitive-analysis)
10. [Feature List](#feature-list)
11. [Functional Requirements](#functional-requirements)
12. [Non-Functional Requirements](#non-functional-requirements)
13. [Use Case Definitions](#use-case-definitions)
14. [System Architecture](#system-architecture)
15. [Technology Stack](#technology-stack)
16. [UI/UX Design Overview](#uiux-design-overview)
17. [Data Flow Diagram](#data-flow-diagram)
18. [Entity-Relationship Diagram](#entity-relationship-diagram)
19. [Microservices & API Gateway](#microservices--api-gateway)
20. [Security & Authentication](#security--authentication)
21. [Payment Integration](#payment-integration)
22. [Sample Code Structure](#sample-code-structure)
23. [Testing Plan](#testing-plan)
24. [DevOps & Deployment](#devops--deployment)
25. [CI/CD Pipeline](#cicd-pipeline)
26. [Documentation Strategy](#documentation-strategy)
27. [Legal & Compliance](#legal--compliance)
28. [Marketing Plan](#marketing-plan)
29. [Sustainability Considerations](#sustainability-considerations)
30. [User Flow Guide](#user-flow-guide)
31. [Appendices](#appendices)

## Executive Summary
FlowCycle is an AI-driven mobile and web platform designed to address menstrual care through a smart subscription model and emergency product delivery. It personalizes offerings based on menstrual cycle data and user preferences. Users can receive organic, eco-friendly sanitary products directly to their doorsteps with flexible scheduling and one-hour emergency delivery options. The app focuses on privacy, convenience, education, and sustainability—providing a seamless solution for everyday health and wellness.

## Project Planning
### Project Vision
To empower menstruators with convenient, affordable, and eco-friendly access to menstrual hygiene products.

### Project Scope
- Personalized cycle-based product recommendations
- Subscription management system
- Real-time emergency delivery
- Educational resources
- Secure user accounts
- Payment integration

### Milestones
- Week 1-2: Requirements & Research
- Week 3-6: UI/UX Design + Backend Architecture
- Week 7-14: Frontend/Backend Development
- Week 15-18: Testing & QA
- Week 19-20: Launch & Feedback Integration

## Requirements Gathering
### Methods Used
- Competitor analysis
- User interviews
- Surveys of menstruators
- Research on sustainable product preferences

### Key Findings
- High demand for eco-conscious alternatives
- Subscription convenience preferred
- Emergency delivery needed in urban areas
- Awareness gap about menstrual health

## User Personas
### Persona 1: Hermione (Age 28, Eco-conscious Professional)
- I Want convenience with sustainable options
- Needs: Organic pads/tampons, flexible delivery, app reminders

### Persona 2: Jake (Age 21, College Student)
- Needs affordable solutions and auto-renewal
- Needs: Budget-friendly bundles, referral discounts

### Persona 3: Amy (Age 35, Mom and Homemaker)
- Needs reliability and emergency support
- Needs: Fast delivery, low-maintenance subscriptions

## Definition of Purpose
To simplify menstrual product access through predictive, personalized, and sustainable delivery using smart logistics and cycle tracking. The app helps reduce plastic waste and stress related to menstruation logistics.

## Target Audience
- Women and menstruating individuals aged 18–45
- Urban users, students, working professionals
- Eco-conscious users
- Caregivers/moms managing household needs

## Competitive Analysis
### Competitors
- LOLA
- Cora
- Rael
- Amazon Subscribe & Save

### FlowCycle's Edge
- Emergency delivery in 1 hour
- Full personalization
- Local sourcing + eco-packaging
- Cycle sync with other apps

## Feature List
- Cycle-based product recommendations
- Auto-replenishment subscription
- Emergency one-hour delivery
- Eco-friendly product catalog
- Loyalty & referral rewards
- In-app reminders
- Secure payments
- Menstrual education center
- User profile & tracking dashboard
- Community forum (optional future phase)

## Functional Requirements
- User login/signup via email/social auth
- Product catalog with filters
- Order placement and checkout
- Subscription frequency configuration
- Cycle input and tracking
- Delivery address and timing preferences
- Order tracking system
- Emergency delivery logic

## Non-Functional Requirements
- Mobile-first responsive UI
- 99.9% uptime (reliable delivery service)
- GDPR-compliant user data handling
- End-to-end encryption for user data
- Scalable backend with caching
- Accessible UI/UX (WCAG compliance)
- Rapid delivery dispatch logic (geo-aware)

## Use Case Definitions
### Use Case: Place Emergency Order
**Actor:** User
**Steps:**
1. User logs in
2. Taps "Emergency Delivery"
3. Selects product type
4. Confirms address and payment
5. System assigns delivery within 1 hour

### Use Case: Start Subscription
**Actor:** User
**Steps:**
1. User selects products
2. Inputs cycle info
3. Chooses delivery frequency
4. Confirms order with payment
5. System auto-replenishes monthly

## System Architecture
- Microservices model
- API Gateway for routing
- Separate services: Auth, Payments, Orders, Notifications
- MongoDB for user/product data
- Redis for caching recommendations
- Firebase or Twilio for push/sms notifications

## Technology Stack
- **Frontend:** React, TailwindCSS, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (NoSQL)
- **Payments:** Stripe, Razorpay
- **Auth:** Firebase

## UI/UX Design Overview
### Main Screens
- Login / Signup
- Home: Recommended Products
- Cycle Tracking Input
- Product Catalog
- Cart & Checkout
- Subscription Settings
- Emergency Delivery Button
- Help & FAQ

### Design Principles
- Soft, calming colors
- Mobile-first design
- Simple 2-click access to core features
- Onboarding wizard for new users

## Data Flow Diagram
User → App Interface → API Gateway
- → Auth Service → User DB
- → Product Service → Product DB
- → Order Service → Delivery API
- → Payment Gateway → Stripe
- → Notification Service → Firebase/Twilio

## Entity-Relationship Diagram
### Entities
- User (UserID, Name, Email, CycleInfo, Address)
- Product (ProductID, Name, Type, Brand, EcoLabel)
- Order (OrderID, UserID, ProductID, Timestamp, Type)
- Subscription (SubID, UserID, Frequency, NextDelivery)
- Payment (PaymentID, OrderID, Amount, Status)

## Microservices & API Gateway
- Auth Service
- Subscription Service
- Recommendation Engine
- Order Processing Service
- Delivery Coordination API
- Content Management for Blog/Resources
- Messaging Service

## Security & Authentication
- OAuth 2.0 + JWT for secure login
- SSL encryption for all network calls
- Rate limiting & firewalls
- User role-based access control
- Secure password storage (bcrypt)

## Payment Integration
- Stripe/PayPal APIs for card and wallet support
- Razorpay (India-specific)
- One-time and recurring billing
- Webhooks for status confirmation
- Refund logic for failed deliveries

## Sample Code Structure
```text
src/
 ├── components/
 ├── pages/
 ├── services/
 │ ├── auth.js
 │ ├── orders.js
 ├── context/
 ├── utils/
 ├── App.jsx
 ├── index.js
```

API Example (Node.js + Express):
```javascript
app.post('/api/emergency-order', verifyToken, (req, res) => {
 const order = new Order({...});
 order.save();
 dispatchToCourier(order);
});
```

## Testing Plan
### Types of Testing
- Unit Testing (Jest)
- Integration Testing (Supertest)
- End-to-End Testing (Cypress)
- Manual QA rounds
- Load testing for delivery APIs
- UAT: 10 test users

## DevOps & Deployment
- Docker for containers
- GitHub Actions for CI
- AWS EC2 + S3 for hosting
- Auto-deploy on push to main
- Monitoring via Datadog
- Error tracking with Sentry

## CI/CD Pipeline
### Steps
1. Code pushed to GitHub
2. Unit tests & linting
3. Build React/Node apps
4. Docker image build
5. Deployment to staging
6. Manual approval → production

## Documentation Strategy
- README.md for overview
- API docs via Swagger
- Postman collections for testing
- In-code comments (JSDoc)
- User manual PDF
- Video tutorial (planned)

## Legal & Compliance
- GDPR compliance
- SSL certificate for all domains
- Data retention and erasure options
- Third-party audit readiness
- Privacy policy & TOS published

## Marketing Plan
### Pre-launch
- Teasers on Instagram, YouTube
- Eco-influencer campaigns
- Waitlist for early access

### Launch
- Referral discounts
- Bundle giveaways
- Launch webinar

### Post-launch
- SEO-optimized blog posts
- Email nurturing for subscribers
- Seasonal campaigns ("Period Positivity Week")

## Sustainability Considerations
- Biodegradable packaging
- Partner with eco-product suppliers
- Digital receipts (paperless)
- Promote menstrual cups & reusable options
- App carbon-footprint tracker (future roadmap)

## User Flow Guide
### 📘 FlowCycle – User Flow Guide
Welcome to FlowCycle! This guide will walk you through using the app from sign-up to product ordering.

#### 🔑 1. Account Creation & Login
- Launch the FlowCycle App (localhost:3000 if running locally)
- You'll land on the Login Page

**If you're new:**
- Click on "Sign Up"
- Enter your name, email, and password
- Submit the form. Your credentials are saved in localStorage
- You'll be automatically logged in and redirected to the Dashboard

**If you already have an account:**
- Enter your email and password on the Login Page
- On successful login, you're redirected to the Dashboard
- Invalid credentials will show an error

*All authentication is simulated using localStorage — no real backend required.*

#### 📋 2. Fill Menstrual Cycle Data
After login, you're taken to the Dashboard. If you're new, a Cycle Information Form will appear:
- Start Date of Your Cycle (e.g., 2025-05-01)
- Average Cycle Length (e.g., 28 days)
- Flow Type (Light, Medium, Heavy)

**After submitting:**
- Your data is saved using React Context & localStorage
- Personalized product suggestions appear below the form
- You can return anytime to edit the information

[Continue with remaining sections...]

## Appendices
- Gantt chart image
- Wireframe screenshots
- Mind map of services and flows
- Survey results
- References

## Project Deliverables
1. Complete code and files pushed to GitHub
   - GitHub link: https://github.com/buttercup2410/FlowCycle
2. A README.md file (AI-generated) that includes:
   - Project title and description
   - Functional documentation
   - Visuals or diagrams
3. A PDF named Final Project_prompts.pdf containing examples of the prompts used to build the project
4. A markdown file named Final Project_planning.md with all AI-generated non-code content
5. Link(s) to any live version of the product (if applicable)
   - Netlify link: [FlowCycle](https://flowcycle.netlify.app/)
