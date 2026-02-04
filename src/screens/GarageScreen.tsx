import { 
  Bell, 
  MessageCircle,
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Navigation,
  TrendingUp,
  Shield,
  Gauge
} from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import logo from "@/assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Mock truck data
const TRUCKS = [
  {
    id: 1,
    plateNumber: "01 A 123 AA",
    model: "Volvo FH16",
    status: "on-route",
    currentRoute: "Dostyk → Alashankou",
    routeProgress: 68,
    penalties: 2,
    penaltyAmount: 850000,
    documentsValid: true,
    paymentsStatus: "paid",
    image: "https://blog.truckscout24.com/de/wp-content/uploads/2013/10/Volvo-FH16-750-19-fotoshowImageNew-58e110e5-80060.jpg"
  },
  {
    id: 2,
    plateNumber: "30 B 456 BB",
    model: "Mercedes Actros",
    status: "idle",
    currentRoute: null,
    routeProgress: 0,
    penalties: 0,
    penaltyAmount: 0,
    documentsValid: true,
    paymentsStatus: "paid",
    image: "https://www.classtrucks.com/wp-content/uploads/2025/01/MercedesBenzDSC09312-Enhanced-NR-Edit-4-scaled-1.jpg"
  },
  {
    id: 3,
    plateNumber: "60 C 789 CC",
    model: "MAN TGX",
    status: "maintenance",
    currentRoute: null,
    routeProgress: 0,
    penalties: 1,
    penaltyAmount: 350000,
    documentsValid: false,
    paymentsStatus: "pending",
    image: "https://www.classtrucks.com/wp-content/uploads/2025/01/ManDSC00146-Edit-1-scaled-1.jpg"
  },
];

const GarageScreen = () => {
  const navigate = useNavigate();
  const [activeTruckIndex, setActiveTruckIndex] = useState(0);
  const activeTruck = TRUCKS[activeTruckIndex];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-route": return "bg-primary/15 text-primary";
      case "idle": return "bg-success/15 text-success";
      case "maintenance": return "bg-warning/15 text-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-route": return "Yo'lda";
      case "idle": return "Bo'sh";
      case "maintenance": return "Texnik xizmat";
      default: return "Noma'lum";
    }
  };

  const handlePrevTruck = () => {
    setActiveTruckIndex((prev) => (prev === 0 ? TRUCKS.length - 1 : prev - 1));
  };

  const handleNextTruck = () => {
    setActiveTruckIndex((prev) => (prev === TRUCKS.length - 1 ? 0 : prev + 1));
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        {/* Header with Chat */}
        <header className="px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Turon Gumruk" 
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <p className="text-muted-foreground text-sm">Garaj</p>
              <h1 className="text-lg font-bold">Alisher Karimov</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate("/messages")}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-card shadow-card"
            >
              <MessageCircle size={20} className="text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card" />
            </button>
            <button 
              onClick={() => navigate("/notifications")}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-card shadow-card"
            >
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card" />
            </button>
          </div>
        </header>

        {/* Truck Carousel */}
        <div className="px-4 py-4">
          <div 
            className="bg-card rounded-3xl p-5 shadow-card relative overflow-hidden touch-pan-x"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              e.currentTarget.dataset.startX = String(touch.clientX);
            }}
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              const startX = Number(e.currentTarget.dataset.startX || 0);
              const diff = startX - touch.clientX;
              
              if (Math.abs(diff) > 50) {
                if (diff > 0) {
                  handleNextTruck();
                } else {
                  handlePrevTruck();
                }
              }
            }}
          >
            <div className="flex flex-col items-center">
              {/* Truck Image */}
              <div className="w-full mb-4 flex justify-center">
                <img 
                  src={activeTruck.image} 
                  alt={activeTruck.model}
                  className="w-56 h-32 object-cover rounded-xl"
                />
              </div>

              {/* Truck Info Below Image */}
              <div className="text-center w-full">
                <p className="text-xs text-muted-foreground mb-1">{activeTruck.model}</p>
                <p className="text-sm font-bold text-foreground border border-muted rounded-lg px-3 py-2 inline-block">
                  {activeTruck.plateNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Truck indicator dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {TRUCKS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTruckIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeTruckIndex 
                    ? 'w-6 bg-primary' 
                    : 'w-1.5 bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Penalties Alert (if any) */}
        {activeTruck.penalties > 0 && (
          <div className="px-4 pb-3">
            <div className="bg-warning/10 border border-warning/20 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={20} className="text-warning" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Jarimalar mavjud</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activeTruck.penalties} ta jarima: {activeTruck.penaltyAmount.toLocaleString()} so'm
                  </p>
                  <button 
                    onClick={() => navigate("/payments")}
                    className="text-sm font-semibold text-warning hover:underline"
                  >
                    To'lash →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Road Tax Alert */}
        <div className="px-4 pb-3">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Navigation size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Yo'l puli to'lash kerak</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  450,000 so'm
                </p>
                <button 
                  onClick={() => navigate("/payments")}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  To'lash →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="px-4 pb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Tafsilotlar
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Insurance Card */}
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                <Shield size={20} className="text-foreground" />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-0.5">Sug'urta • OSAGO</h4>
              <p className="text-xs font-semibold text-foreground mb-3">10 месяцев, 19 дней</p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-success rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">22-дек. 2026</p>
            </div>

            {/* Technical Inspection Card */}
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                <Gauge size={20} className="text-foreground" />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-0.5">Texnik ko'rik</h4>
              <p className="text-xs font-semibold text-foreground mb-3">4 года, 10 месяцев, 29 дней</p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-success rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">01-янв. 2031</p>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default GarageScreen;
