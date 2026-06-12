import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, AlertCircle, Compass } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is already logged in (token exists in localStorage) → skip login, go directly to home
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Read potential success messages or error messages from location state
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clean history state
      window.history.replaceState({}, document.title);
    }
    if (location.state?.error) {
      setError(location.state.error);
      // Clean history state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Decorative floating crystals/stars */}
      <div className="absolute top-1/4 left-10 opacity-10 animate-float hidden lg:block">
        <div className="w-16 h-16 bg-gradient-to-br from-mystic-gold to-mystic-amber rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-10 animate-float-delayed hidden lg:block">
        <div className="w-20 h-20 bg-gradient-to-br from-mystic-medium to-mystic-gold rounded-full blur-xl" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-mystic-gold/10 border border-mystic-gold/30 rounded-2xl shadow-glow-gold mb-4">
            <Compass className="h-8 w-8 text-mystic-gold animate-spin-slow" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-mystic-white via-slate-200 to-mystic-gold bg-clip-text text-transparent glow-text-gold">
            Welcome Back, Adept
          </h1>
          <p className="mt-2 text-sm text-mystic-silver">
            Sign in to access your personal celestial readings
          </p>
        </div>

        <div className="glass rounded-2xl shadow-2xl p-8 border border-mystic-gold/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {successMessage && (
              <div className="flex items-center space-x-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm bg-emerald-950/20">
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-sm bg-red-950/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-mystic-deep/50 border border-mystic-medium/40 rounded-xl text-mystic-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-mystic-gold focus:border-mystic-gold focus:bg-mystic-deep/80 transition-all duration-200 text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-mystic-deep/50 border border-mystic-medium/40 rounded-xl text-mystic-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-mystic-gold focus:border-mystic-gold focus:bg-mystic-deep/80 transition-all duration-200 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-mystic-gold/30 text-sm font-bold rounded-xl text-mystic-deep bg-gradient-to-r from-mystic-gold via-mystic-amber to-mystic-gold bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-glow-gold hover:shadow-glow-intense disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-mystic-deep border-t-transparent rounded-full animate-spin" />
                  <span>Aligning planets...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <span>Enter the Sanctuary</span>
                  <Sparkles className="h-4 w-4 ml-1 text-mystic-deep group-hover:scale-125 transition-transform duration-200" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-mystic-silver">
              New to AstraGems?{' '}
              <Link to="/register" className="font-semibold text-mystic-gold hover:text-mystic-white transition-colors duration-200 underline decoration-mystic-gold/45 hover:decoration-mystic-white">
                Begin your journey here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
