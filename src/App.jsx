import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FriendsAndProfile from './components/FriendsAndProfile';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/ChatWindow';


const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <ConditionalSidebar />
        <div className="main-content flex-1 p-4"> {/* Added padding for better layout */}
          <Routes>
            <Route path="/friends" element={<FriendsAndProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} /> 
            <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to /login */}
           
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Conditional component to render Sidebar based on route
const ConditionalSidebar = () => {
  const location = useLocation();

  // Hide Sidebar for Login and Register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;  // Don't show sidebar on login/register routes
  }

  return <Sidebar currentUserId={1} />; // Render Sidebar for other routes like /chat, /profile
};

export default App;
