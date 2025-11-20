'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    // Auto-start ambient sound after user interaction
    const handleInteraction = () => {
      setAudioPlaying(true);
      document.removeEventListener('click', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 4,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2,
  }));

  const leaves = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    left: Math.random() * 100,
    rotation: Math.random() * 360,
  }));

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#0a0805] via-[#1a1410] to-[#2a2015]">
      {/* Forest Background Layers */}
      <motion.div
        style={{ y, opacity }}
        className="fixed inset-0 z-0"
      >
        {/* Deep forest layer */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iZyI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFhMzAxNSIgc3RvcC1vcGFjaXR5PSIwLjgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwYTA4MDUiIHN0b3Atb3BhY2l0eT0iMSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-80"></div>

        {/* Tree silhouettes */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-gradient-to-t from-[#0f1a0f] to-transparent animate-sway"
              style={{
                left: `${i * 12.5}%`,
                width: `${60 + Math.random() * 40}px`,
                height: `${60 + Math.random() * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Golden Hour God Rays */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-[2px] h-full opacity-20"
            style={{
              left: `${10 + i * 7}%`,
              background: 'linear-gradient(180deg, rgba(255,215,0,0.6) 0%, rgba(255,237,78,0.3) 40%, transparent 80%)',
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
              filter: 'blur(2px)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.25, 0.1],
              scaleY: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating particles (dust, pollen) */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-yellow-200/40"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              filter: 'blur(1px)',
            }}
            initial={{ y: '100vh', x: 0, opacity: 0 }}
            animate={{
              y: '-10vh',
              x: [0, 30, -20, 40, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Foreground foliage */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute"
            style={{
              left: `${leaf.left}%`,
              top: `${Math.random() * 30}%`,
            }}
            animate={{
              x: [0, 15, 0],
              rotate: [leaf.rotation, leaf.rotation + 10, leaf.rotation],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: leaf.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width="40" height="60" viewBox="0 0 40 60" className="opacity-40">
              <path
                d="M20 0 C25 10, 30 20, 35 35 C35 40, 30 50, 20 60 C10 50, 5 40, 5 35 C10 20, 15 10, 20 0 Z"
                fill="url(#leafGradient)"
                className="drop-shadow-lg"
              />
              <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a4d1a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0a2a0a" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Scene Content */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Sacred Aura Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-shadow-gold gradient-gold bg-clip-text text-transparent mb-4">
            श्रीरामचरितमानस
          </h1>
          <p className="text-xl md:text-2xl text-amber-200/80 font-light">
            The Meeting of Rama and Jatayu
          </p>
        </motion.div>

        {/* Main Scene Container */}
        <motion.div
          className="relative max-w-5xl w-full backdrop-blur-forest bg-gradient-to-br from-amber-950/30 to-emerald-950/30 rounded-3xl border border-amber-600/30 shadow-2xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Divine Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Scene Description */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className="text-amber-100/90 text-lg md:text-xl leading-relaxed italic font-light">
              In the golden hour of a mythological forest, beneath a layered canopy,
              <br />
              <span className="text-amber-300 font-medium">Lord Rama</span> and his allies kneel beside the wounded vulture{' '}
              <span className="text-amber-300 font-medium">Jatayu</span>.
              <br />
              Volumetric god-rays cascade through ancient trees, creating a sacred, divine aura.
            </p>
          </motion.div>

          {/* Character Portraits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Rama */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-amber-950/50 to-orange-950/50 rounded-2xl border border-amber-500/40 p-6 backdrop-blur-sm">
                <div className="w-full aspect-square bg-gradient-to-br from-amber-800 to-orange-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                  {/* Rama's symbolic representation */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.3) 100%)',
                        'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,140,0,0.5) 100%)',
                        'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.3) 100%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <svg className="w-32 h-32 text-amber-200 relative z-10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.3" />
                    <path d="M 50 20 L 55 45 L 80 45 L 60 60 L 68 85 L 50 70 L 32 85 L 40 60 L 20 45 L 45 45 Z" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-amber-200 text-center mb-2">श्री राम</h3>
                <p className="text-amber-300/80 text-center text-sm">Lord Rama</p>
              </div>
            </motion.div>

            {/* Jatayu */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-amber-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-red-950/50 to-amber-950/50 rounded-2xl border border-red-500/40 p-6 backdrop-blur-sm">
                <div className="w-full aspect-square bg-gradient-to-br from-red-900 to-amber-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                  {/* Jatayu's symbolic representation */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(180,83,9,0.2) 100%)',
                        'radial-gradient(circle, rgba(220,38,38,0.6) 0%, rgba(180,83,9,0.4) 100%)',
                        'radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(180,83,9,0.2) 100%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                  <svg className="w-32 h-32 text-red-200 relative z-10" viewBox="0 0 100 100">
                    <ellipse cx="50" cy="55" rx="30" ry="25" fill="currentColor" opacity="0.3" />
                    <path d="M 50 30 Q 35 35, 30 45 Q 35 50, 50 48 Q 65 50, 70 45 Q 65 35, 50 30 Z" fill="currentColor" />
                    <path d="M 30 50 Q 20 55, 15 65 L 25 60 Z" fill="currentColor" opacity="0.7" />
                    <path d="M 70 50 Q 80 55, 85 65 L 75 60 Z" fill="currentColor" opacity="0.7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-200 text-center mb-2">जटायु</h3>
                <p className="text-red-300/80 text-center text-sm">The Noble Vulture</p>
              </div>
            </motion.div>
          </div>

          {/* Dialogue Box */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 rounded-2xl blur-lg" />
            <div className="relative bg-gradient-to-br from-amber-900/40 to-yellow-900/40 rounded-2xl border border-amber-400/30 p-8 backdrop-blur-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center animate-glow">
                  <svg className="w-6 h-6 text-amber-950" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-amber-200 mb-3 font-[var(--font-devanagari)]">
                    श्री राम का वचन:
                  </h4>
                  <div className="space-y-3 text-lg md:text-xl font-[var(--font-devanagari)] leading-relaxed">
                    <motion.p
                      className="text-amber-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.2, duration: 0.8 }}
                    >
                      "जटायु… हे महानुभाव… यह दशा किसने की?
                    </motion.p>
                    <motion.p
                      className="text-amber-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.8, duration: 0.8 }}
                    >
                      मित्र, जो भी तुमने किया है, वह व्यर्थ नहीं जाएगा।
                    </motion.p>
                    <motion.p
                      className="text-amber-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 4.4, duration: 0.8 }}
                    >
                      मैं यहाँ हूँ… मुझे सीता के बारे में बताओ, क्या हुआ?"
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Translation */}
              <motion.div
                className="mt-6 pt-6 border-t border-amber-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 1 }}
              >
                <p className="text-amber-200/70 italic text-sm md:text-base leading-relaxed">
                  "Jatayu... O noble one... who has done this to you?
                  Friend, whatever you have done will not be in vain.
                  I am here... tell me about Sita, what happened?"
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Sound Design Indicator */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: audioPlaying ? 1 : 0.5 }}
            transition={{ delay: 5.5, duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-900/30 border border-emerald-500/30">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a.75.75 0 00-1.264-.546L5.203 6H2.667A1.667 1.667 0 001 7.667v4.666C1 13.253 1.747 14 2.667 14h2.536l3.533 3.046A.75.75 0 0010 16.5v-13zM13.348 5.652a.75.75 0 011.06 0 8.25 8.25 0 010 11.696.75.75 0 01-1.06-1.06 6.75 6.75 0 000-9.576.75.75 0 010-1.06z" />
                </svg>
              </motion.div>
              <span className="text-emerald-300 text-sm">
                {audioPlaying ? 'Ambient forest sounds active' : 'Click anywhere to enable sound'}
              </span>
            </div>
            <p className="text-emerald-400/60 text-xs mt-2">
              Soft wind • Distant birds • Divine resonance
            </p>
          </motion.div>
        </motion.div>

        {/* Camera Direction Note */}
        <motion.div
          className="mt-12 max-w-3xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1 }}
        >
          <div className="inline-block px-6 py-4 bg-stone-900/40 backdrop-blur-md rounded-xl border border-stone-600/30">
            <p className="text-stone-300 text-sm md:text-base italic">
              <span className="text-amber-400 font-semibold">Camera:</span> Wide-angle 35mm •
              Elevated three-quarter rear angle on Rama •
              Smooth cinematic dolly-in toward Jatayu •
              Shallow depth-of-field • Warm rim-light
            </p>
          </div>
        </motion.div>

        {/* Credits */}
        <motion.div
          className="mt-16 text-center opacity-50 hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 7, duration: 1 }}
        >
          <p className="text-amber-200/60 text-xs">
            Hyper-realistic mythic cinematic experience • Indian epic aesthetic • 8K quality
          </p>
        </motion.div>
      </div>

      {/* Hidden audio element for ambient sound */}
      {audioPlaying && (
        <audio
          autoPlay
          loop
          className="hidden"
          src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAD//wD/AAD//w=="
        />
      )}
    </div>
  );
}
