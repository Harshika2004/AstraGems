import React from 'react';
import { Sparkles, Gem } from 'lucide-react';

const NAVARATNA = [
  { emoji: '💎', name: 'Ruby', planet: 'Sun', benefit: 'Confidence, leadership, vitality' },
  { emoji: '🤍', name: 'Pearl', planet: 'Moon', benefit: 'Emotional balance, intuition, calm' },
  { emoji: '🔴', name: 'Red Coral', planet: 'Mars', benefit: 'Courage, energy, protection' },
  { emoji: '💚', name: 'Emerald', planet: 'Mercury', benefit: 'Intelligence, communication, growth' },
  { emoji: '💛', name: 'Yellow Sapphire', planet: 'Jupiter', benefit: 'Wisdom, wealth, fortune' },
  { emoji: '💍', name: 'Diamond', planet: 'Venus', benefit: 'Love, luxury, creativity' },
  { emoji: '💙', name: 'Blue Sapphire', planet: 'Saturn', benefit: 'Discipline, karma, focus' },
  { emoji: '🟤', name: 'Hessonite', planet: 'Rahu', benefit: 'Clarity, ambition, transformation' },
  { emoji: '🟢', name: "Cat's Eye", planet: 'Ketu', benefit: 'Spiritual growth, intuition, protection' },
];

const HOW_IT_WORKS = [
  {
    icon: '🌊',
    title: 'Vibrational Energy',
    desc: "Every gemstone carries a unique molecular structure that resonates at specific frequencies. When worn close to the skin, these vibrations interact with your body's energy field, promoting healing and balance."
  },
  {
    icon: '⭐',
    title: 'Planetary Alignment',
    desc: 'In Vedic astrology, each planet governs specific areas of life. Wearing the gemstone associated with a weak or malefic planet in your birth chart can strengthen its positive influence.'
  },
  {
    icon: '🔮',
    title: 'Chakra Activation',
    desc: 'Gemstones correspond to the 7 chakras of the human body. The right gemstone placed on the correct chakra can unblock energy pathways and restore physical and emotional wellbeing.'
  }
];

const ZODIAC_STONES = [
  { sign: 'Aries', symbol: '♈', stones: 'Red Coral & Ruby' },
  { sign: 'Taurus', symbol: '♉', stones: 'Diamond & Emerald' },
  { sign: 'Gemini', symbol: '♊', stones: 'Emerald & Pearl' },
  { sign: 'Cancer', symbol: '♋', stones: 'Pearl & Moonstone' },
  { sign: 'Leo', symbol: '♌', stones: 'Ruby & Peridot' },
  { sign: 'Virgo', symbol: '♍', stones: 'Emerald & Blue Sapphire' },
  { sign: 'Libra', symbol: '♎', stones: 'Diamond & Opal' },
  { sign: 'Scorpio', symbol: '♏', stones: 'Red Coral & Bloodstone' },
  { sign: 'Sagittarius', symbol: '♐', stones: 'Yellow Sapphire & Turquoise' },
  { sign: 'Capricorn', symbol: '♑', stones: 'Blue Sapphire & Garnet' },
  { sign: 'Aquarius', symbol: '♒', stones: 'Blue Sapphire & Amethyst' },
  { sign: 'Pisces', symbol: '♓', stones: 'Yellow Sapphire & Aquamarine' }
];

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fade-in">
      {/* Page Title */}
      <section className="text-center relative py-12 rounded-3xl border border-mystic-gold/20 bg-gradient-to-b from-mystic-medium/20 to-transparent shadow-glow-gold overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-mystic-gold/10 rounded-full blur-2xl pointer-events-none" />
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-mystic-white via-slate-200 to-mystic-gold bg-clip-text text-transparent glow-text-gold">
          AstroGem
        </h1>
        <p className="mt-3 text-sm md:text-base text-mystic-gold uppercase tracking-widest font-semibold">
          The Ancient Science of Gemstones & Astrology
        </p>
      </section>

      {/* SECTION 1: What is AstroGem? */}
      <section className="glass rounded-2xl border border-mystic-gold/20 p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-mystic-gold/35">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="p-4 bg-mystic-gold/10 rounded-full border border-mystic-gold/25 text-mystic-gold shrink-0">
            <Gem className="h-10 w-10 text-mystic-gold animate-pulse-slow" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-mystic-white tracking-wide">
              The Cosmic Connection
            </h2>
            <div className="text-sm text-mystic-silver leading-relaxed space-y-4 font-serif">
              <p>
                For thousands of years, ancient civilizations have believed in the 
                profound connection between celestial bodies and the healing power 
                of gemstones. AstroGem is the sacred practice of aligning your 
                astrological birth chart with the vibrational energy of gemstones 
                to restore balance, attract abundance, and protect your aura.
              </p>
              <p>
                From Vedic astrologers in ancient India to Egyptian pharaohs adorning 
                themselves with lapis lazuli and carnelian — gemstones have always 
                been more than mere ornaments. They are conduits of cosmic energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The 9 Planetary Gemstones (Navaratna) */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-mystic-white glow-text-gold tracking-wide">
            The 9 Planetary Gemstones
          </h2>
          <p className="text-xs text-mystic-gold uppercase tracking-widest mt-1.5 font-bold">
            Navaratna
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {NAVARATNA.map((gem) => (
            <div 
              key={gem.name} 
              className="glass rounded-2xl p-6 border border-mystic-gold/20 hover:border-mystic-gold/40 transition-all duration-300 shadow-xl group hover:shadow-glow-gold text-center flex flex-col items-center space-y-3"
            >
              <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] group-hover:scale-110 transition-transform duration-300">
                {gem.emoji}
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-mystic-gold tracking-wide">
                  {gem.name}
                </h3>
                <p className="text-[11px] text-mystic-silver font-semibold uppercase tracking-wider">
                  Planet: {gem.planet}
                </p>
              </div>
              <p className="text-xs text-mystic-white/95 leading-relaxed">
                {gem.benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: How Gemstones Work */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-mystic-white glow-text-gold tracking-wide">
            Vibrational Alignment
          </h2>
          <p className="text-xs text-mystic-gold uppercase tracking-widest mt-1.5 font-bold">
            How Gemstones Work
          </p>
        </div>

        <div className="space-y-6">
          {HOW_IT_WORKS.map((item) => (
            <div 
              key={item.title} 
              className="glass rounded-2xl p-6 sm:p-8 border border-mystic-gold/20 hover:border-mystic-gold/35 transition-all duration-300 hover:shadow-glow-gold flex flex-col sm:flex-row gap-5 items-start"
            >
              <span className="text-4xl shrink-0 p-3 bg-mystic-gold/5 rounded-2xl border border-mystic-gold/15">
                {item.icon}
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-mystic-gold tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-mystic-silver leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Zodiac & Their Power Stones */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-mystic-white glow-text-gold tracking-wide">
            Zodiac Alignments
          </h2>
          <p className="text-xs text-mystic-gold uppercase tracking-widest mt-1.5 font-bold">
            Power Stones
          </p>
        </div>

        <div className="glass rounded-2xl border border-mystic-gold/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-mystic-gold/10 border-b border-mystic-gold/20 text-xs font-bold uppercase tracking-wider text-mystic-gold">
                  <th className="py-4 px-6">Zodiac Sign</th>
                  <th className="py-4 px-6">Power Gemstones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mystic-gold/10 text-xs sm:text-sm text-mystic-silver">
                {ZODIAC_STONES.map((row) => (
                  <tr key={row.sign} className="hover:bg-mystic-gold/5 transition-colors duration-150">
                    <td className="py-3.5 px-6 font-bold text-mystic-white flex items-center space-x-2">
                      <span className="text-lg text-mystic-gold">{row.symbol}</span>
                      <span>{row.sign}</span>
                    </td>
                    <td className="py-3.5 px-6 font-medium text-mystic-white/95">
                      {row.stones}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: Quote Banner */}
      <section className="glass rounded-2xl border border-mystic-gold/30 p-8 shadow-glow-gold/20 text-center relative overflow-hidden bg-gradient-to-r from-mystic-medium/10 via-mystic-dark/45 to-mystic-medium/10">
        <div className="absolute inset-0 bg-radial-gradient opacity-15 pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <p className="text-lg sm:text-xl font-serif text-mystic-white leading-relaxed italic">
            "The cosmos is within us. We are made of star-stuff. Gemstones are the earth's memory of that cosmic origin."
          </p>
          <p className="text-xs sm:text-sm text-mystic-gold uppercase tracking-widest font-bold">
            — Ancient Vedic Wisdom
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
