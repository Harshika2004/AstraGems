import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { 
  Sparkles, 
  User, 
  Calendar, 
  HelpCircle, 
  Heart, 
  Briefcase, 
  Activity, 
  Coins, 
  Compass, 
  ChevronRight 
} from 'lucide-react';

const ZODIAC_SIGNS = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire' },
  { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth' },
  { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air' },
  { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth' },
  { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air' },
  { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water' }
];

const CHALLENGES = [
  { id: 'health', label: 'Health & Vitality', icon: Activity, color: 'text-emerald-400', desc: 'Energy, physical healing, mental peace' },
  { id: 'wealth', label: 'Wealth & Prosperity', icon: Coins, color: 'text-mystic-amber', desc: 'Abundance, finance, opportunities' },
  { id: 'love', label: 'Love & Harmony', icon: Heart, color: 'text-mystic-gold', desc: 'Relationships, trust, self-compassion' },
  { id: 'career', label: 'Career & Growth', icon: Briefcase, color: 'text-emerald-300', desc: 'Focus, success, professional path' }
];

const LOADING_MESSAGES = [
  "Mapping planetary alignments...",
  "Analyzing zodiac energies...",
  "Consulting Vedic astrology matrices...",
  "Sifting through metaphysical crystal properties...",
  "Calculating gemstone resonance vectors...",
  "Channeling cosmic crystal grids..."
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [birthdate, setBirthdate] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [error, setError] = useState('');

  // Check for token on load and redirect if missing
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { error: 'Please login to continue' } });
    }
  }, [navigate]);

  // Sync user name when user context loads
  useEffect(() => {
    if (user && !name) {
      setName(user.name);
    }
  }, [user, name]);

  // Cycle through cosmic loading messages
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prevIdx) => (prevIdx + 1) % LOADING_MESSAGES.length);
      }, 2500);
    } else {
      setLoadingMsgIdx(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const toggleChallenge = (id) => {
    if (selectedChallenges.includes(id)) {
      setSelectedChallenges(selectedChallenges.filter(c => c !== id));
    } else {
      setSelectedChallenges([...selectedChallenges, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!birthdate) {
      setError('Please select your birthdate');
      return;
    }
    if (!zodiac) {
      setError('Please select your zodiac sign');
      return;
    }
    if (selectedChallenges.length === 0) {
      setError('Please select at least one life challenge');
      return;
    }

    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const recommendUrl = API.endsWith('/api') ? `${API}/recommend` : `${API}/api/recommend`;

      const res = await fetch(recommendUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name,
          birthdate,
          zodiac,
          challenges: selectedChallenges
        })
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to generate recommendations. Please try again.');
      }

      setLoading(false);
      // Navigate to results page passing the response data
      navigate('/results', { state: { recommendation: data } });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate recommendations. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Rotating background stars/circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[500px] h-[500px] border border-mystic-gold/15 rounded-full animate-spin-slow" />
          <div className="absolute w-[300px] h-[300px] border border-mystic-amber/15 rounded-full animate-spin-slow direction-reverse" />
        </div>

        <div className="z-10 text-center max-w-md">
          {/* Animated Spinner/Mandala */}
          <div className="relative inline-flex items-center justify-center p-8 bg-mystic-dark/60 rounded-full border border-mystic-gold/30 shadow-glow-gold mb-8 animate-float">
            <Compass className="h-16 w-16 text-mystic-gold animate-spin" style={{ animationDuration: '6s' }} />
            <div className="absolute inset-0 border-2 border-dashed border-mystic-gold/40 rounded-full animate-spin-slow" />
          </div>

          <h2 className="text-2xl font-bold tracking-wider text-mystic-white mb-2 glow-text-gold">
            Consulting the Cosmos
          </h2>
          
          {/* Pulsing loading message */}
          <div className="h-8 flex items-center justify-center">
            <p className="text-mystic-gold font-medium animate-pulse text-sm md:text-base">
              {LOADING_MESSAGES[loadingMsgIdx]}
            </p>
          </div>

          <div className="mt-8 flex justify-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-mystic-gold animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-mystic-amber animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-mystic-medium animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-mystic-white via-slate-200 to-mystic-gold bg-clip-text text-transparent glow-text-gold">
          Discover Your Cosmic Gemstones
        </h1>
        <p className="mt-3 text-mystic-silver max-w-xl mx-auto">
          Enter your birth details and the life areas you seek to optimize. Our celestial analyzer will recommend exactly 3 Vedic gemstones aligned to your path.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center space-x-2 p-4 bg-rose-500/10 border border-rose-500/35 text-rose-400 rounded-xl bg-red-950/20">
          <HelpCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 glass rounded-3xl p-8 border border-mystic-gold/20 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Astro Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-2">
              Full Name (for celestial reading)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-mystic-silver">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter reading name"
                className="block w-full pl-10 pr-3 py-2.5 bg-mystic-deep/50 border border-mystic-medium/40 rounded-xl text-mystic-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-mystic-gold focus:border-mystic-gold focus:bg-mystic-deep/80 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Birthdate */}
          <div>
            <label htmlFor="birthdate" className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-mystic-silver">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-mystic-deep/50 border border-mystic-medium/40 rounded-xl text-mystic-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-mystic-gold focus:border-mystic-gold focus:bg-mystic-deep/80 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Zodiac Dropdown */}
        <div>
          <label htmlFor="zodiac" className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-3">
            Your Zodiac Sign
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ZODIAC_SIGNS.map((sign) => {
              const selected = zodiac === sign.name;
              return (
                <button
                  key={sign.name}
                  type="button"
                  onClick={() => setZodiac(sign.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 ${
                    selected 
                      ? 'border-mystic-gold bg-mystic-medium/40 shadow-glow-gold' 
                      : 'border-mystic-gold/15 bg-mystic-dark/30 hover:border-mystic-gold/40'
                  }`}
                >
                  <span className={`font-semibold text-sm ${selected ? 'text-mystic-gold' : 'text-mystic-white'}`}>
                    {sign.name}
                  </span>
                  <span className="text-[10px] text-mystic-silver mt-0.5">{sign.dates}</span>
                  <span className="text-[9px] uppercase tracking-wider text-mystic-amber mt-1 font-semibold">{sign.element}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Challenges Multi-Select */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-3">
            Life Challenges & Intentions (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHALLENGES.map((ch) => {
              const active = selectedChallenges.includes(ch.id);
              const IconComp = ch.icon;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => toggleChallenge(ch.id)}
                  className={`flex items-start text-left p-4 rounded-xl border transition-all duration-300 ${
                    active 
                      ? 'border-mystic-gold bg-mystic-medium/40 shadow-glow-gold' 
                      : 'border-mystic-gold/15 bg-mystic-dark/30 hover:border-mystic-gold/40'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 ${active ? 'bg-mystic-gold/10' : 'bg-mystic-deep/60'}`}>
                    <IconComp className={`h-5 w-5 ${ch.color}`} />
                  </div>
                  <div className="flex-1">
                    <span className={`block font-semibold text-sm ${active ? 'text-mystic-gold' : 'text-mystic-white'}`}>
                      {ch.label}
                    </span>
                    <span className="text-[11px] text-mystic-silver mt-0.5 block">{ch.desc}</span>
                  </div>
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center mt-1 shrink-0 ${active ? 'border-mystic-gold bg-mystic-gold' : 'border-slate-500'}`}>
                    {active && <span className="h-2 w-2 rounded-full bg-mystic-deep" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 border border-mystic-gold/30 text-base font-bold rounded-xl text-mystic-deep bg-gradient-to-r from-mystic-gold via-mystic-amber to-mystic-gold bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-glow-gold hover:shadow-glow-intense group"
        >
          <span>Reveal Your Spiritual Gemstones</span>
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200 text-mystic-deep" />
        </button>
      </form>
    </div>
  );
};

export default Home;
