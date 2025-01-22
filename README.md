# Smart Grocery List

A modern web application for managing your grocery shopping lists with real-time updates and an intuitive interface.

## Features

- Create and manage multiple shopping lists
- Customize lists with color labels
- Add and remove items from lists
- Recently deleted items tracking
- Real-time updates using Supabase
- Responsive design for all devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Styled Components
- **State Management**: React Query
- **Backend**: Supabase
- **Build Tool**: Vite
- **Authentication**: Supabase Auth

## Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
cd smart-grocery-list
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable React components
├── services/         # API and data management
│   ├── Mutations/    # React Query mutations
│   └── apiGroceryList.ts
├── ui/              # UI components and styled elements
├── pages/           # Page components
└── types/           # TypeScript type definitions
```

## Database Schema

### Grocery List Table
- `id`: number (primary key)
- `grocery_list_name`: string
- `grocery_items`: string (comma-separated)
- `recently_used`: string (comma-separated)
- `color`: string (hex color code)
- `user_id`: string (foreign key)
- `created_at`: timestamp

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
