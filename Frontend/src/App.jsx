import './App.css'
import { Toaster } from 'sonner';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import Friends from './pages/Friends/Friends';
import Notifications from './pages/Notifications/Notifications';
import Settings from './pages/Settings/Settings';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Main from './pages/Main/Main';
import Group from './pages/Group/Group';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'chat',
        element: <ProtectedRoute><Chat /></ProtectedRoute>
      },
      {
        path: 'groups',
        element: <ProtectedRoute><Group /></ProtectedRoute>
      },
      {
        path: 'friends',
        element: <ProtectedRoute><Friends /></ProtectedRoute>
      },
      {
        path: 'notifications',
        element: <ProtectedRoute><Notifications /></ProtectedRoute>
      },
      {
        path: 'settings',
        element: <ProtectedRoute><Settings /></ProtectedRoute>
      }
    ]
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/profile/:userId',
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App
