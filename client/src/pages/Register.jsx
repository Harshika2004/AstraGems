import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, User, Mail, Lock, AlertCircle, ShieldAlert } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setSession, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Use correct API URL from environment variables or fallback
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const registerUrl = API.endsWith('/api') ? `${API}/auth/register` : `${API}/api/auth/register`;
      
      const res = await fetch(registerUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // On success: redirect to login page with success message state (do NOT auto-login silently)
      navigate('/login', { state: { message: 'Registration successful! Please login to begin your journey.' } });
    } catch (err) {
      console.error('Registration failed:', err);
      // Display the actual error message from server in the UI
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-10 opacity-10 animate-float hidden lg:block">
        <div className="w-16 h-16 bg-gradient-to-br from-mystic-gold to-mystic-amber rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-1/4 left-10 opacity-10 animate-float-delayed hidden lg:block">
        <div className="w-20 h-20 bg-gradient-to-br from-mystic-medium to-mystic-gold rounded-full blur-xl" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-mystic-gold/10 border border-mystic-gold/30 rounded-2xl shadow-glow-gold mb-4">
            <Sparkles className="h-8 w-8 text-mystic-gold animate-pulse-slow" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-mystic-white via-slate-200 to-mystic-gold bg-clip-text text-transparent glow-text-gold">
            Begin Your Ascension
          </h1>
          <p className="mt-2 text-sm text-mystic-silver">
            Create an account to align your spiritual gemstone path
          </p>
        </div>

        <div className="glass rounded-2xl shadow-2xl p-8 border border-mystic-gold/20">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-sm bg-red-950/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-2">
                Adept Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-mystic-deep/50 border border-mystic-medium/40 rounded-xl text-mystic-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-mystic-gold focus:border-mystic-gold focus:bg-mystic-deep/80 transition-all duration-200 text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  placeholder="•••••••• (Min 6 chars)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <span>Casting spiritual seal...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <span>Awaken Your Path</span>
                  <Sparkles className="h-4 w-4 ml-1 text-mystic-deep group-hover:scale-125 transition-transform duration-200" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-mystic-silver">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-mystic-gold hover:text-mystic-white transition-colors duration-200 underline decoration-mystic-gold/45 hover:decoration-mystic-white">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
