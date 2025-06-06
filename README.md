# CampusJobs Authentication System

A comprehensive authentication system built with React.js, Vite, Redux, Material UI, and Axios for the CampusJobs platform - a specialized job aggregator for undergraduate students in India.

## 🚀 Features

### Authentication Module
- **Login & Registration** - Clean, responsive UI with form validation
- **Social Authentication** - Google OAuth integration with fallback
- **Password Recovery** - Email-based reset workflow with secure tokens
- **State Management** - Redux-based auth state with persistent sessions
- **UX Enhancements** - Loading states, toast notifications, responsive design

### Technology Stack
- **React.js** - Component-based UI framework
- **Vite** - Next generation frontend tooling
- **Redux Toolkit** - State management with async thunks
- **Material UI** - Modern component library with theming
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing

## 📦 Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd campusjobs-auth-system
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm run dev
\`\`\`

The application will open at `http://localhost:3000`

## 🏗️ Project Structure

\`\`\`
src/
├── components/          # Reusable components
│   ├── ProtectedRoute.jsx
│   ├── Toaster.jsx
│   └── MockDataDisplay.jsx
├── pages/              # Page components
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   └── ResetPasswordPage.jsx
│   ├── DashboardPage.jsx
│   └── HomePage.jsx
├── store/              # Redux store configuration
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── uiSlice.js
│   │   └── jobSlice.js
│   └── store.js
├── services/           # API services
│   └── authService.js
├── data/               # Mock data
│   └── mockData.js
├── theme/              # Material UI theme
│   └── theme.js
├── App.jsx
└── main.jsx
\`\`\`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

\`\`\`env
VITE_API_URL=http://localhost:3001/api
\`\`\`

### API Integration
The current implementation uses mock API calls. To integrate with a real backend:

1. Update the `authService.js` file with actual API endpoints
2. Configure Axios interceptors for token management
3. Update the Redux async thunks to handle real API responses

## 🎨 Customization

### Theme
Modify `src/theme/theme.js` to customize:
- Color palette
- Typography
- Component styles
- Breakpoints

### Components
All components use Material UI with custom styling. Key customizations:
- Primary color: `#2563eb` (Blue)
- Custom gradient backgrounds
- Responsive design patterns
- Consistent spacing and typography

## 🔐 Authentication Flow

1. **Registration**: User creates account with email/password or Google OAuth
2. **Login**: User authenticates with credentials
3. **Token Storage**: JWT tokens stored in localStorage
4. **Protected Routes**: Dashboard and other protected pages require authentication
5. **Password Reset**: Email-based password recovery workflow

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

### Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
