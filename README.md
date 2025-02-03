    # 🛒 Smart Grocery Inventory Manager

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.io/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern, real-time grocery inventory management system built with React and Supabase.

![App Demo](demo.gif)


## 🎯 Overview

Smart Grocery Inventory Manager is a comprehensive solution designed to streamline grocery shopping and inventory management. It helps users maintain organized shopping lists, track grocery items, and manage their inventory efficiently with real-time updates.

## ✨ Features

### Core Functionality

- **📝 Multiple Shopping Lists**

  - Create and manage multiple lists
  - Share lists with family members
  - Real-time synchronization across devices

- **🏷️ Smart Organization**

  - Color-coded list categorization
  - Custom labels and tags
  - Priority-based item sorting

- **🔄 Inventory Tracking**
  - Recently deleted items recovery
  - Item quantity management
  - Low stock alerts

### User Experience

- **📱 Responsive Design**

  - Seamless experience across all devices
  - Touch-friendly interface
  - Offline capability

- **🔍 Smart Search**
  - Quick item lookup
  - Autocomplete suggestions
  - Search history

## 🛠️ Technology Stack

- **Frontend**

  - React 18 (Latest)
  - TypeScript
  - Styled Components
  - React Query

- **Backend**

  - Supabase
  - Real-time subscriptions
  - Authentication

- **Build & Development**
  - Vite
  - ESLint
  - Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/smart-grocery-manager.git
   cd smart-grocery-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Configure Supabase**

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── components/        # Reusable React components
│   ├── GroceryLists/
│   ├── CreateGroceryList/
│   └── RecentlyDeleted/
├── services/         # API and business logic
│   ├── Mutations/    # React Query mutations
│   └── api/         # API endpoints
├── ui/              # UI components
│   ├── Input/
│   ├── Modal/
│   └── Cards/
├── pages/           # Page components
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

## 📊 Database Schema

### Grocery Lists

```sql
CREATE TABLE grocery_lists (
  id SERIAL PRIMARY KEY,
  grocery_list_name VARCHAR NOT NULL,
  grocery_items TEXT[],
  recently_used TEXT[],
  color VARCHAR(7),
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add appropriate documentation
- Include tests for new features




