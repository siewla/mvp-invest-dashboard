# Family Investment Dashboard

## Demo Recording

https://github.com/user-attachments/assets/8e9f6ad8-6c1a-4cd4-a12f-a2aa2597a06c

## Overview

This project is a prototype for a family investment dashboard designed to provide a child-friendly experience. It includes a view-only investment dashboard for children and a family group chat feature shared among parents, co-parents, and children.

## 🎯 Goal

Create a working prototype of a child’s investment dashboard that pulls mock investment data, displays it in a simple, engaging format, and includes a family group chat feature shared across parent, co-parent, and child user

### 👥 User Roles

- **Parent**: Full access to data (can add new family members, add/remove/topup/withdraw portfolio) and chat.
- **Child**: View-only dashboard to self portfolio with chat access.
- **Co-Parent**: View-only access to all portoflio and chat access.

### MVP Features

1. **Login Page**

   - Role selector for parent, child, and co-parent.
   - Dummy username field.
   - Routes to the appropriate view upon login.
     ![login page](./images/login.png)

2. **Child Dashboard (view-only)**

   - Displays total investment value.
   - Shows monthly change in investment.
   - Includes a simple growth chart using dummy data.
   - Lists the related brands with logos.
   - "Ask My Parent" button to open group chat.
     ![child-portfolio](./images/child-portfolio.png)
     ![child-investment](./images/child-investment.png)

3. **Parent Dashboard (full-access)**
   ![parent-portfolio](./images/parent-manage-portfolio.png)
   ![parent-portfolio](./images/parent-add-portfolio.png)
   ![parent-investment](./images/parent-investment.png)

4. **Co-Parent Dashboard (view-only)**
   ![coparent-portfolio](./images/coparent-portfolio.png)
   ![coparent-investment](./images/coparent-investment.png)

5. **Family Group Chat**
   - Shared chat view for all users.
   - Displays sender's role and timestamp.
   - Supports emojis.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Next.js
- **Mock Data**: JSON files or in-memory storage (local storage)
- **UI**: Tailwind CSS

## 📦 Folder Structure (Next.js)

```
MVP-INVEST-DASHBOARD
├── app
│   ├── api
│   │   ├── chat
│   │   │  └── route.ts
│   │   ├── family
│   │   │  └── route.ts
│   │   ├── investment
│   │   │  └── route.ts
│   │   └── portfolio
│   │      └── route.ts
│   ├── chat
│   │   └── page.tsx
│   ├── dashboard
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── AddFamilyMember.tsx
│   ├── ChatInterface.tsx
│   ├── Header.tsx
│   ├── InvestmentDashboard.tsx
│   ├── Investments.tsx
│   ├── LoginForm.tsx
│   └── Porfolios.tsx
├── lib
│   ├── context
│   │   └── AuthContext.tsx
│   │   └── FamilyContext.tsx
│   │   └── PortfolioContext.tsx
│   ├── mock-data
│   │   ├── chatMessages.json
│   │   ├── familyGroups.json
│   │   ├── investments.json
│   │   └── portfolio.json
│   ├── types
│   │   └── index.ts
│   └── apiService.ts
└── README.md
```

## 🚀 Setup Instructions

```
git clone https://github.com/siewla/mvp-invest-dashboard.git
cd mvp-invest-dashboard
npm i
npm run dev
```

### Deliverables

- ✅ Working codebase (frontend + backend)
- ✅ README with setup instructions
- ✅ GitHub repo (https://github.com/siewla/mvp-invest-dashboard#)
- ✅ Live demo link (https://mvp-invest-dashboard.vercel.app/)
