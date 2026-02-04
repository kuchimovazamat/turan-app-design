import { Navigation, MapPin, RefreshCw, Phone, ChevronLeft, Signal, Battery, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import YandexRouteMap from "@/components/YandexRouteMap";

const MapScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Yandex Maps Integration */}
      <div className="absolute inset-0">
        <YandexRouteMap routeIndex={0} apiKey="" />
      </div>

      {/* Backup fallback map design */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 hidden">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-primary/30"
              style={{ top: `${i * 5}%` }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-px bg-primary/30"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(205 74% 42%)" />
              <stop offset="100%" stopColor="hsl(152 92% 33%)" />
            </linearGradient>
          </defs>
          <path
            d="M 80 650 Q 150 500 200 400 Q 250 300 280 250 Q 310 200 350 150"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 4"
          />
        </svg>

        {/* Start point */}
        <div className="absolute bottom-32 left-16">
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-accent shadow-accent flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent-foreground" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium bg-card px-2 py-1 rounded-full shadow-card">Toshkent</span>
            </div>
          </div>
        </div>

        {/* Driver position */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-primary/20 animate-ping absolute" />
            <div className="w-14 h-14 rounded-full bg-primary shadow-primary flex items-center justify-center relative">
              <Navigation size={24} className="text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* End point */}
        <div className="absolute top-24 right-16">
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-success shadow-md flex items-center justify-center">
              <MapPin size={14} className="text-success-foreground" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium bg-card px-2 py-1 rounded-full shadow-card">Olot Gumruk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 safe-area-top px-4 pt-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-card shadow-card flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/15 text-success">
              <Signal size={14} />
              <span className="text-xs font-semibold">Online</span>
            </div>
          </div>

          <button className="w-12 h-12 rounded-2xl bg-card shadow-card flex items-center justify-center">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="absolute bottom-0 left-0 right-0 p-4 safe-area-bottom">
        <div className="bg-card rounded-3xl shadow-lg p-5">
          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-primary">
                <Navigation size={22} className="text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">Yo'lda</p>
                <p className="text-sm text-muted-foreground">Faol holat</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">342</p>
              <p className="text-xs text-muted-foreground">km qoldi</p>
            </div>
          </div>

          {/* Route Info */}
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl mb-4">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              <div className="w-0.5 h-6 bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm mb-2">Toshkent, O'zbekiston</p>
              <p className="font-medium text-sm">Olot, Gumruk Posti</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock size={14} />
              <span>~4s 30m</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-primary flex items-center justify-center gap-2">
              <Navigation size={18} />
              Yo'nalish
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-secondary rounded-xl font-semibold transition-all active:scale-95">
              <Phone size={18} />
              Operator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;