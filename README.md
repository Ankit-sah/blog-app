# 📝 BlogApp - Modern Blogging Platform

A feature-rich, modern blog application built with Next.js 16, React 19, and TypeScript. Create, manage, and publish beautiful blog posts with a rich text editor, dark mode support, and an intuitive user interface.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Features

- **User Authentication** - Secure login and registration system
- **Rich Text Editor** - Create beautiful blog posts with Quill editor
- **Dashboard** - Comprehensive dashboard with post management
- **Post Management** - Create, read, update, and delete posts
- **Search & Filter** - Search posts by title, content, or tags
- **Tag System** - Organize posts with tags and filter by them
- **Dark Mode** - Complete dark mode support with system preference detection
- **Responsive Design** - Fully responsive design that works on all devices
- **Real-time Updates** - Instant UI updates with React Query

### 🎨 UI/UX Features

- **Modern Design** - Beautiful, clean, and modern interface
- **Smooth Animations** - Elegant transitions and animations
- **Loading States** - Proper loading indicators and skeleton screens
- **Error Handling** - Comprehensive error handling with user-friendly messages
- **Empty States** - Helpful empty states with actionable CTAs
- **Accessibility** - Built with accessibility in mind

### 📊 Dashboard Features

- **Post Statistics** - View total posts, monthly posts, and average read time
- **Pagination** - Load more posts with infinite scroll
- **Post Cards** - Beautiful card-based layout for posts
- **Quick Actions** - Edit and delete posts directly from the dashboard
- **Search** - Real-time search with debouncing
- **Tag Filters** - Filter posts by multiple tags

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
blog-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── dashboard/         # Dashboard page
│   ├── posts/             # Post management
│   │   ├── create/        # Create/Edit post
│   │   └── page.tsx       # Posts listing
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── forms/             # Form components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── PostForm.tsx
│   │   └── RichTextEditor.tsx
│   ├── ui/                # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── ThemeToggle.tsx
│   └── providers/         # Context providers
│       └── ThemeProvider.tsx
├── api/                   # API layer
│   ├── axiosInstance.ts   # Axios configuration
│   ├── endpoints.ts       # API endpoints
│   └── postApi.ts         # Post API functions
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts         # Authentication hook
│   └── usePosts.ts        # Posts management hook
├── stores/                # Zustand stores
│   ├── authStore.ts       # Authentication store
│   ├── postsStore.ts      # Posts store
│   └── themeStore.ts      # Theme store
├── types/                 # TypeScript types
│   └── index.ts
├── lib/                   # Utility functions
│   └── util.ts
└── utils/                 # Additional utilities
    └── constants/
        └── global.ts
```

## 🛠️ Tech Stack

### Core

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management

- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Server state management

### Forms & Validation

- **React Hook Form** - Form handling
- **Yup** - Schema validation
- **@hookform/resolvers** - Form resolvers

### UI Components

- **Lucide React** - Icon library
- **Quill** - Rich text editor
- **next-themes** - Theme management

### Styling

- **Tailwind CSS** - Utility-first CSS
- **tailwindcss-animate** - Animation utilities
- **@tailwindcss/typography** - Typography plugin
- **@tailwindcss/forms** - Form styling plugin

## 📖 Usage

### Authentication

1. **Register a new account**

   - Navigate to `/register`
   - Fill in your details
   - Create your account

2. **Login**
   - Navigate to `/login`
   - Use demo credentials: `demo@blog.com` / `password`
   - Or use your registered credentials

### Creating Posts

1. **Navigate to Dashboard**

   - After logging in, you'll be redirected to `/dashboard`

2. **Create a New Post**

   - Click the "New Post" button
   - Fill in the post details:
     - Title
     - Content (using rich text editor)
     - Tags (comma-separated)
   - Click "Publish" or "Save as Draft"

3. **Edit a Post**

   - From the dashboard, click "Edit" on any post
   - Make your changes
   - Save the post

4. **Delete a Post**
   - Click the delete button on any post
   - Confirm the deletion

### Searching and Filtering

1. **Search Posts**

   - Use the search bar in the dashboard
   - Search by title, content, or tags
   - Results update in real-time

2. **Filter by Tags**
   - Click on any tag badge to filter posts
   - Multiple tags can be selected
   - Click "Clear filters" to reset

### Dark Mode

- Toggle dark mode using the theme toggle button
- Theme preference is saved and persists across sessions
- Automatically detects system preference

## 🎨 Styling

The application uses Tailwind CSS for styling with a custom design system:

- **Colors** - Custom color palette with dark mode support
- **Typography** - Consistent typography scale
- **Spacing** - Consistent spacing system
- **Components** - Reusable UI components
- **Animations** - Smooth transitions and animations

### Customization

Edit `tailwind.config.js` and `app/globals.css` to customize:

- Color scheme
- Typography
- Spacing
- Border radius
- Animations

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Add other environment variables as needed
```

### API Endpoints

Configure API endpoints in `api/endpoints.ts`:

```typescript
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - Bear necessities for state management
- [React Query](https://tanstack.com/query) - Powerful data synchronization
- [Quill](https://quilljs.com/) - Your powerful rich text editor

## 📞 Support

For support, email sah.5ankit@gmail.com or open an issue in the repository.

---

Made with ❤️ using Next.js and Tailwind CSS
