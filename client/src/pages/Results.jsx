import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { 
  Sparkles, 
  Gem, 
  BookOpen, 
  Eye, 
  HelpCircle, 
  ChevronLeft, 
  Save, 
  Check 
} from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const recommendation = location.state?.recommendation;
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If no recommendation data, redirect back home
    if (!recommendation) {
      navigate('/');
    }
  }, [recommendation, navigate]);

  if (!recommendation) {
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.put(`/recommend/${recommendation._id}/save`);
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to save to history.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Back link & Save action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-1 text-sm font-semibold text-mystic-silver hover:text-mystic-gold transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Consult the Stars Again</span>
        </Link>

        <div className="flex items-center space-x-3">
          {error && <span className="text-xs text-rose-400">{error}</span>}
          
          <button
            onClick={handleSave}
            disabled={saved || saving}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all duration-300 ${
              saved
                ? 'bg-emerald-550/10 border-emerald-500/30 text-emerald-400 shadow-glow-gold bg-emerald-950/20'
                : 'bg-mystic-medium/40 border-mystic-gold/25 text-mystic-white hover:border-mystic-gold hover:text-mystic-gold shadow-glow-gold hover:shadow-glow-intense'
            } disabled:cursor-not-allowed`}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-mystic-silver border-t-transparent rounded-full animate-spin" />
                <span>Storing reading...</span>
              </>
            ) : saved ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Saved to History!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save to History</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* User info banner */}
      <div className="glass rounded-2xl p-6 border border-mystic-gold/20 shadow-xl mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="border-r border-mystic-gold/10 pr-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-mystic-silver block mb-1">Adept Name</span>
            <span className="text-sm font-bold text-mystic-white">{recommendation.name}</span>
          </div>
          <div className="border-r border-mystic-gold/10 pr-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-mystic-silver block mb-1">Date of Birth</span>
            <span className="text-sm font-bold text-mystic-white">{formatDate(recommendation.birthdate)}</span>
          </div>
          <div className="border-r border-mystic-gold/10 pr-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-mystic-silver block mb-1">Zodiac Sign</span>
            <span className="text-sm font-bold text-mystic-gold glow-text-gold">{recommendation.zodiac}</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-mystic-silver block mb-1">Focus Intentions</span>
            <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
              {recommendation.challenges.map((c) => (
                <span 
                  key={c} 
                  className="px-2 py-0.5 bg-mystic-medium/40 border border-mystic-gold/15 text-mystic-silver text-[10px] font-semibold rounded-md uppercase"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gemstone grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {recommendation.gemstones.map((gem, index) => (
          <div 
            key={index} 
            className="flex flex-col glass-interactive rounded-2xl overflow-hidden shadow-2xl animate-float"
            style={{ animationDelay: `${index * 1.5}s` }}
          >
            {/* Gem Header */}
            <div className="p-6 pb-4 border-b border-mystic-gold/15 bg-gradient-to-b from-mystic-medium/20 to-transparent">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-mystic-gold/10 border border-mystic-gold/25 rounded-lg">
                  <Gem className="h-6 w-6 text-mystic-gold" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-mystic-gold bg-mystic-medium/40 px-2.5 py-1 rounded-full border border-mystic-gold/20">
                  GEM #{index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-mystic-white tracking-wide glow-text-gold">{gem.name}</h3>
              <p className="text-xs text-mystic-silver italic mt-1 font-medium">&ldquo;{gem.description}&rdquo;</p>
            </div>

            {/* Gem Content */}
            <div className="p-6 flex-1 space-y-6">
              {/* Properties */}
              <div>
                <div className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-mystic-gold" />
                  <span>Healing Properties</span>
                </div>
                <p className="text-mystic-white text-xs leading-relaxed">{gem.properties}</p>
              </div>

              {/* Wear guide */}
              <div>
                <div className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-mystic-silver mb-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-mystic-gold" />
                  <span>How to Wear & Use</span>
                </div>
                <p className="text-mystic-white text-xs leading-relaxed">{gem.howToUse}</p>
              </div>

              {/* Metaphysical reason */}
              <div className="pt-4 border-t border-mystic-gold/15">
                <div className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-mystic-gold mb-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Alignment for You</span>
                </div>
                <p className="text-mystic-silver text-xs leading-relaxed bg-mystic-deep/40 p-3 rounded-xl border border-mystic-gold/10">
                  {gem.whyForYou}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
