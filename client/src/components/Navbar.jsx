import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, History, Compass, LogOut, LogIn, UserPlus, Info } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-mystic-gold/15 glass backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-gradient-to-br from-mystic-gold to-mystic-amber rounded-lg shadow-glow-gold group-hover:shadow-glow-intense transition-all duration-300">
              <Sparkles className="h-5 w-5 text-mystic-deep animate-pulse-slow" />
            </div>
            <span className="font-sans font-extrabold text-xl tracking-wider bg-gradient-to-r from-mystic-white via-slate-200 to-mystic-gold bg-clip-text text-transparent glow-text-gold transition-all duration-300 group-hover:text-mystic-gold">
              AstraGems
            </span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/')
                      ? 'text-mystic-gold bg-mystic-medium/40 shadow-glow-gold border border-mystic-gold/20'
                      : 'text-mystic-silver hover:text-mystic-white hover:bg-mystic-medium/20'
                  }`}
                >
                  <Compass className="h-4 w-4" />
                  <span className="hidden sm:inline">Recommendations</span>
                </Link>

                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/dashboard')
                      ? 'text-mystic-gold bg-mystic-medium/40 shadow-glow-gold border border-mystic-gold/20'
                      : 'text-mystic-silver hover:text-mystic-white hover:bg-mystic-medium/20'
                  }`}
                >
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">My History</span>
                </Link>

                <Link
                  to="/about"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/about')
                      ? 'text-mystic-gold bg-mystic-medium/40 shadow-glow-gold border border-mystic-gold/20'
                      : 'text-mystic-silver hover:text-mystic-white hover:bg-mystic-medium/20'
                  }`}
                >
                  <Info className="h-4 w-4" />
                  <span className="hidden sm:inline">About</span>
                </Link>

                {/* User Profile Info */}
                <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full border border-mystic-gold/15 bg-mystic-dark/40 text-mystic-silver text-xs">
                  <div className="h-2 w-2 rounded-full bg-mystic-gold animate-pulse" />
                  <span>{user?.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-rose-450 text-rose-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/about')
                      ? 'text-mystic-gold bg-mystic-medium/40 shadow-glow-gold border border-mystic-gold/20'
                      : 'text-mystic-silver hover:text-mystic-white hover:bg-mystic-medium/20'
                  }`}
                >
                  <Info className="h-4 w-4" />
                  <span>About</span>
                </Link>

                <Link
                  to="/login"
                  className={`flex items-center space-x-1 px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/login')
                      ? 'text-mystic-gold bg-mystic-medium/40 border border-mystic-gold/20'
                      : 'text-mystic-silver hover:text-mystic-white'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-mystic-gold to-mystic-amber text-mystic-deep shadow-glow-gold border border-mystic-gold/30 hover:shadow-glow-intense hover:from-mystic-gold/90 hover:to-mystic-amber/90 transition-all duration-300"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
