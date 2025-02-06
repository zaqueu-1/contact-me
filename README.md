![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js& logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge& logo=typescript&logoColor=white)

# contact.me

A modern contact management application built with Next.js 13+. Originally started as a frontend challenge for a company, then it evolved into a full-stack portfolio project showcasing modern web development practices.


## 🚀 Features

- User authentication (register/login)
- Create, read, update and delete contacts
- Search contacts by name, email or creation date
- Responsive design
- Modern UI with dark theme
- Real-time feedback with toast notifications
- Loading states with skeleton screens
- Protected routes
- User-specific data isolation

## 🛠️ Technologies

### Frontend

- **Next.js 13+** - React framework with App Router
- **TypeScript** - Static typing
- **React Hook Form** - Form handling
- **CSS Modules** - Scoped styling
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **React Loading Skeleton** - Loading states
- **SweetAlert2** - Modal dialogs
- **Axios** - HTTP client

### Backend

- **Next.js API Routes** - Backend API
- **MongoDB** - Database
- **NextAuth.js** - Authentication
- **bcryptjs** - Password hashing

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13 App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── contacts/     # Contacts CRUD endpoints
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── page.tsx          # Main application page
├── components/           # React components
│   ├── contactsPanel/    # Contacts display
│   ├── navbar/          # Navigation bar
│   ├── pagination/      # Pagination component
│   └── skeleton/        # Loading states
├── libs/                # Utility libraries
└── types/              # TypeScript types
```

## 🔐 Authentication

The application uses NextAuth.js for authentication with the following features:

- JWT-based authentication
- Secure password hashing with bcrypt
- Protected API routes
- Automatic session handling
- Custom login/register pages

## 📡 API Routes

### Authentication

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Contacts

- `GET /api/contacts` - List user's contacts
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact

## 💾 Database Schema

### Users Collection

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string, // hashed
  createdAt: Date
}
```

### Contacts Collection

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  tel: string,
  createdBy: string, // user ID
  createdAt: Date
}
```

## 🚦 Getting Started

1. Clone the repository

```bash
git clone https://github.com/zaqueu-1/iprazos-front.git
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables Create a `.env` file with:

```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🎨 UI/UX Features

- Dark theme with modern glassmorphism effects
- Responsive design that works on mobile and desktop
- Interactive feedback on all user actions
- Smooth transitions and animations
- Loading states with skeleton screens
- Clean and intuitive interface

## 🔒 Security Features

- Passwords are hashed using bcrypt
- JWT-based session management
- Protected API routes
- Data isolation between users
- Input validation and sanitization
- Secure HTTP-only cookies
