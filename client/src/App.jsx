import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import './App.css';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mystic-deep">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-mystic-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-mystic-softGold text-xs">Aligning spiritual stars...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ error: 'Please login to continue' }} />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col text-mystic-white starfield relative">
          <Navbar />
          <main className="flex-grow z-10">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />

              {/* Protected Routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          {/* Subtle footer */}
          <footer className="w-full text-center py-6 border-t border-mystic-gold/10 text-[11px] text-mystic-silver z-10 glass">
            <p>© {new Date().getFullYear()} AstraGems. Harnessing planetary and gemstone alignments for inner peace.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
