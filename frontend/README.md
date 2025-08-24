# FaceAI - Face Recognition App

A modern, production-ready React application for face registration and recognition using AI-powered facial analysis.

## 🚀 Features

- **User Authentication**: Secure JWT-based signup/login system
- **Face Registration**: Register multiple faces per user with camera or upload
- **Face Recognition**: AI-powered face identification with confidence scores
- **Face Management**: View and manage your registered face collection
- **Modern UI**: Beautiful, responsive design with dark theme and gradients
- **Real-time Camera**: Live webcam capture with visual feedback
- **Secure Storage**: JWT tokens stored in memory and localStorage for persistence

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: shadcn/ui + Custom Components
- **State Management**: React Query + Context API
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── FaceInput.tsx   # Camera/upload face capture
│   ├── FormField.tsx   # Form input component
│   ├── Layout.tsx      # App layout with navigation
│   ├── ProtectedRoute.tsx # Route protection
│   └── ResultCard.tsx  # Recognition result display
├── context/            # React contexts
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom React hooks
│   ├── useFaces.ts     # Face API operations
│   └── use-toast.ts    # Toast notifications
├── lib/                # Utilities and configuration
│   ├── api.ts          # Axios configuration
│   └── utils.ts        # Helper functions
├── pages/              # Route components
│   ├── DashboardPage.tsx   # Main dashboard
│   ├── FacesPage.tsx       # Face collection view
│   ├── LoginPage.tsx       # User login
│   ├── NotFound.tsx        # 404 error page
│   ├── RecognizePage.tsx   # Face recognition
│   ├── RegisterPage.tsx    # Face registration
│   └── SignupPage.tsx      # User registration
├── types/              # TypeScript definitions
│   └── index.ts        # API and data types
├── App.tsx             # Main app component
├── index.css           # Global styles and design system
└── main.tsx           # App entry point
```

## 🎨 Design System

The app uses a custom design system with:

- **Color Palette**: AI-themed dark colors with purple/cyan accents
- **Gradients**: Beautiful gradient backgrounds and effects
- **Typography**: Readable fonts with gradient text effects
- **Animations**: Smooth transitions and hover effects
- **Components**: Consistent, reusable UI components
- **Responsive**: Mobile-first design approach

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd face-recognition-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

## 📱 Usage

### Getting Started
1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your dashboard with your credentials
3. **Register Faces**: Add faces to your collection using camera or upload
4. **Recognize Faces**: Identify people using the recognition feature
5. **Manage Collection**: View and organize your registered faces

### Face Registration
- Use camera for real-time capture or upload existing images
- Provide a name to identify each person
- System provides tips for optimal face capture

### Face Recognition
- Capture or upload a face image
- System returns the best match with confidence score
- View detailed recognition results with match percentage

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Token Persistence**: Tokens stored securely for session management
- **Auto-logout**: Automatic logout on token expiration
- **Protected Routes**: Route-level authentication guards
- **Input Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management

## 🎯 API Integration

The frontend integrates with a Flask backend providing:

- `POST /signup` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout
- `POST /register` - Face registration
- `POST /recognise` - Face recognition
- `GET /faces` - List registered faces

## 🚀 Build & Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   Deploy the `dist` folder to your hosting platform

## 🔍 Development

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript for type safety
- Absolute imports with `@/` alias

### Key Features
- React Query for server state management
- Custom hooks for API operations
- Context API for global state
- Component composition for reusability
- Design system for consistency

## 📞 Support

For questions or issues:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure the backend API is running and accessible
4. Check network requests in browser dev tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.