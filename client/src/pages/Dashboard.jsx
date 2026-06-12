import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { 
  History, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Gem, 
  Compass, 
  AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/history');
      setHistoryList(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch recommendation history.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-mystic-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-mystic-silver text-sm">Retrieving your stellar vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center sm:text-left mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-mystic-white via-slate-200 to-mystic-gold bg-clip-text text-transparent glow-text-gold">
          Your Celestial Reading Vault
        </h1>
        <p className="mt-2 text-sm text-mystic-silver">
          Access all your previously saved gemstone recommendations and astrological alignments
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center space-x-2 p-4 bg-rose-500/10 border border-rose-500/35 text-rose-400 rounded-xl bg-red-950/20">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {historyList.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center border border-mystic-gold/20 max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-mystic-medium/40 border border-mystic-gold/20 rounded-full shadow-glow-gold mb-6">
            <History className="h-10 w-10 text-mystic-gold animate-pulse-slow" />
          </div>
          <h2 className="text-xl font-bold text-mystic-white mb-2">Vault is Empty</h2>
          <p className="text-sm text-mystic-silver mb-6">
            You haven't saved any gemstone recommendations yet. Ask the cosmos for a reading to start your vault.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-mystic-gold/30 text-sm font-bold rounded-xl text-mystic-deep bg-gradient-to-r from-mystic-gold to-mystic-amber shadow-glow-gold hover:shadow-glow-intense hover:from-mystic-gold/90 hover:to-mystic-amber/90 transition-all duration-300"
          >
            <Compass className="h-4 w-4" />
            <span>Generate First Reading</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {historyList.map((reading) => {
            const isExpanded = expandedId === reading._id;
            return (
              <div 
                key={reading._id}
                className={`glass rounded-2xl border transition-all duration-305 overflow-hidden ${
                  isExpanded ? 'border-mystic-gold/50 shadow-glow-gold bg-mystic-dark/60' : 'border-mystic-gold/15 hover:border-mystic-gold/30'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(reading._id)}
                  className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 gap-4 text-left focus:outline-none"
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <div className={`p-2 rounded-xl shrink-0 ${isExpanded ? 'bg-mystic-gold/15 border border-mystic-gold/25' : 'bg-mystic-medium/30 border border-mystic-gold/15'}`}>
                      <Gem className={`h-6 w-6 ${isExpanded ? 'text-mystic-gold' : 'text-mystic-silver'}`} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-mystic-white">{reading.name}</h3>
                        <span className="px-2.5 py-0.5 bg-mystic-medium/40 border border-mystic-gold/15 text-mystic-gold text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                          {reading.zodiac}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-mystic-silver mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(reading.createdAt)}
                        </span>
                        <span>•</span>
                        <span>{reading.challenges.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto shrink-0 border-t border-mystic-gold/10 sm:border-0 pt-4 sm:pt-0">
                    <span className="text-[10px] text-mystic-silver font-semibold sm:mr-3 uppercase tracking-wider">
                      {isExpanded ? 'Hide Details' : 'View Gemstones'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-mystic-gold" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-mystic-silver" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-mystic-gold/10 bg-mystic-deep/30">
                    {/* Brief details */}
                    <div className="py-4 text-xs text-mystic-silver flex flex-wrap gap-x-6 gap-y-2 border-b border-mystic-gold/10 mb-6">
                      <span><strong>Birthdate:</strong> {new Date(reading.birthdate).toLocaleDateString()}</span>
                      <span><strong>Zodiac Sign:</strong> {reading.zodiac}</span>
                      <span><strong>Focus Areas:</strong> {reading.challenges.join(', ')}</span>
                    </div>

                    {/* Compact Gemstone Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {reading.gemstones.map((gem, index) => (
                        <div key={index} className="p-5 rounded-xl border border-mystic-gold/15 bg-mystic-dark/40 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-extrabold text-sm text-mystic-white tracking-wide glow-text-gold">{gem.name}</h4>
                              <span className="text-[9px] uppercase tracking-wider text-mystic-gold bg-mystic-gold/10 px-2 py-0.5 rounded border border-mystic-gold/20 font-bold">
                                GEM #{index + 1}
                              </span>
                            </div>
                            <p className="text-[11px] text-mystic-silver italic mb-3">&ldquo;{gem.description}&rdquo;</p>
                            <p className="text-[11px] text-mystic-white leading-relaxed mb-3">
                              <strong>Properties:</strong> {gem.properties}
                            </p>
                            <p className="text-[11px] text-mystic-white leading-relaxed mb-3">
                              <strong>Wear Instructions:</strong> {gem.howToUse}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-mystic-gold/10">
                            <p className="text-[10px] text-mystic-silver leading-relaxed italic bg-mystic-deep/60 p-2 rounded">
                              <strong>Why for you:</strong> {gem.whyForYou}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
