import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  Globe,
  Flame,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { ServiceProvider } from '../../types';

interface ClergyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ServiceProvider | null;
  onStartBooking: (provider: ServiceProvider) => void;
}

export const ClergyProfileModal: React.FC<ClergyProfileModalProps> = ({
  isOpen,
  onClose,
  provider,
  onStartBooking,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  if (!isOpen || !provider) return null;

  const photos = provider.photos && provider.photos.length > 0
    ? provider.photos
    : provider.gallery && provider.gallery.length > 0
    ? provider.gallery
    : [provider.photo];

  const currentPhoto = photos[activePhotoIdx] || photos[0] || provider.photo;

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="glass-panel-elevated w-full max-w-2xl bg-[#0D071E]/95 rounded-3xl sm:rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-white/20 overflow-hidden flex flex-col max-h-[92vh] text-white"
      >
        {/* Top bar with close button */}
        <div className="relative p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                Verified Clergy Profile
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight font-serif">
                {provider.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close Profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 no-scrollbar">
          {/* PHOTO GALLERY SECTION */}
          <div className="space-y-3">
            <div className="relative aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-black/40 shadow-2xl group">
              <img
                src={currentPhoto}
                alt={`${provider.name} ceremony`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Navigation Arrows (if multiple photos) */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-pill bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-pill bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Top badges on hero photo */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-500/80 text-[#07030F] shadow-lg border border-amber-300">
                  {provider.religion}
                </span>
                {provider.badge && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white glass-pill border border-white/20 shadow-lg">
                    {provider.badge}
                  </span>
                )}
              </div>

              {/* Photo counter badge */}
              {photos.length > 1 && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white glass-pill border border-white/20 bg-black/60 shadow-md">
                  Photo {activePhotoIdx + 1} of {photos.length}
                </div>
              )}

              {/* Bottom caption on hero photo */}
              <div className="absolute bottom-3 left-3 right-20 text-left">
                <p className="text-xs font-semibold text-white truncate drop-shadow-md">
                  {activePhotoIdx === 0 && 'Sacred Hawan Yajna & Saraswati Puja Sanctum'}
                  {activePhotoIdx === 1 && 'Grand Mahayagya Gathering with Devotees & Families'}
                  {activePhotoIdx === 2 && 'Deity Altar Shringar & Traditional Jhula Seva'}
                  {activePhotoIdx === 3 && 'Temple Puja Blessings & Sacred Shloka Chanting'}
                  {activePhotoIdx >= 4 && 'Ceremonial Devotional Rituals'}
                </p>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {photos.map((ph, idx) => {
                  const isActive = idx === activePhotoIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-amber-400 shadow-[0_0_12px_#F59E0B] scale-105'
                          : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={ph}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CLERGY HIGHLIGHT HEADER */}
          <div className="p-4 rounded-2xl glass-card border border-white/15 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-xl font-bold text-white">
                    {provider.name}
                  </h3>
                  {provider.verified && (
                    <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      100% Verified Acharya
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/70 mt-0.5">{provider.title}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-white/50 uppercase block">Starting Fee</span>
                  <div className="text-lg font-black text-amber-300">
                    ₹{provider.startingPrice}
                    <span className="text-xs font-normal text-white/50"> / ritual</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                <span className="text-[10px] text-white/50 font-medium block">Experience</span>
                <span className="font-bold text-white text-sm flex items-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {provider.experienceYears} Years
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                <span className="text-[10px] text-white/50 font-medium block">Rating</span>
                <span className="font-bold text-amber-300 text-sm flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {provider.rating} ({provider.reviewCount})
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                <span className="text-[10px] text-white/50 font-medium block">Tradition</span>
                <span className="font-bold text-white text-sm flex items-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {provider.religion}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                <span className="text-[10px] text-white/50 font-medium block">Location</span>
                <span className="font-bold text-white text-xs flex items-center gap-1 mt-0.5 truncate" title={provider.location}>
                  <MapPin className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                  {provider.location.split('&')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* BIOGRAPHY & ABOUT */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>About Pandit Ji</span>
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/10">
              {provider.bio}
            </p>
          </div>

          {/* SPECIALTIES */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>Sacred Specialties & Ceremonies</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/90 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{spec}</span>
                </span>
              ))}
            </div>
          </div>

          {/* LANGUAGES SPOKEN */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>Languages for Chantings & Instructions</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {provider.languages.map((lang, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/15 border border-purple-400/30 text-purple-200 flex items-center gap-1.5"
                >
                  <Globe className="w-3 h-3 text-purple-300" />
                  <span>{lang}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 bg-white/[0.04] border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] text-white/50 block">Consecrated Booking</span>
            <span className="text-xs text-white/80 font-medium">Doorstep, Temple & Virtual Options</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onStartBooking(provider);
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-amber-500 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Ceremony with {provider.name.split(' ')[1] || provider.name}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
