import {
  Bell,
  ChevronRight,
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  Truck,
  User,
  CheckCircle2,
  Camera,
  Globe,
  Lock,
  Moon,
  ScanLine,
  Wallet,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import MobileShell from "@/components/layout/MobileShell";
import logo from "@/assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    icon: User,
    label: "Shaxsiy ma'lumotlar",
    description: "Ism, telefon, manzil",
    color: "bg-primary/10 text-primary",
    route: "/profile/personal",
  },
  {
    icon: FileText,
    label: "Mening hujjatlarim",
    description: "5 ta hujjat yuklangan",
    color: "bg-accent/15 text-accent",
    badge: "3 tasdiqlangan",
    route: "/documents",
  },
  {
    icon: ScanLine,
    label: "Turan Gumruk ID",
    description: "QR kod va ID raqam",
    color: "bg-success/10 text-success",
    route: "/profile/turan-id",
  },
  {
    icon: Bell,
    label: "Bildirishnomalar",
    description: "Push, SMS, Email",
    color: "bg-primary/10 text-primary",
    route: "/notifications",
  },
];

const settingsItems = [
  {
    icon: Globe,
    label: "Til",
    value: "O'zbekcha",
  },
  {
    icon: Moon,
    label: "Mavzu",
    value: "Yorug'",
  },
  {
    icon: Lock,
    label: "Xavfsizlik",
    value: "PIN kod",
  },
];

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(500);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handlePayment = (paymentType: string) => {
    setSelectedPayment(paymentType);
  };

  const handleConfirmPayment = () => {
    // Add 500 TG to wallet
    setWalletBalance(prev => prev + 500);
    // Close modal after a short delay
    setTimeout(() => {
      setShowPaymentModal(false);
      setSelectedPayment(null);
    }, 500);
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        {/* Profile Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img 
                src={logo} 
                alt="Profile" 
                className="w-20 h-20 rounded-2xl object-cover shadow-card"
              />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">Alisher Karimov</h1>
              <p className="text-muted-foreground mb-2">+998 90 123 45 67</p>
              <div className="flex items-center gap-2">
                <span className="status-badge success">
                  <CheckCircle2 size={12} />
                  Tasdiqlangan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="px-4 py-2">
          <div className="gradient-success rounded-2xl p-4 flex items-center gap-4 text-success-foreground shadow-md">
            <div className="w-12 h-12 rounded-xl bg-success-foreground/20 flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-0.5">Haydovchi tasdiqlangan</p>
              <p className="text-sm opacity-80">Barcha hujjatlar tekshirilgan</p>
            </div>
            <ChevronRight size={20} className="opacity-80" />
          </div>
        </div>

        {/* Wallet Section */}
        <div className="px-4 py-4">
          <h2 className="section-title mb-3">Hamyon</h2>
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 shadow-lg text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet size={20} />
                <span className="text-sm font-semibold opacity-90">TG Balans</span>
              </div>
              <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">
                Turan Gumruk
              </span>
            </div>
            <p className="text-4xl font-bold mb-2">{walletBalance.toLocaleString()}</p>
            <p className="text-sm opacity-80 mb-4">so'm</p>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 py-2.5 rounded-xl font-semibold transition-colors"
            >
              <Plus size={18} />
              To'ldirish
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-4">
          <h2 className="section-title mb-3">Hisobim</h2>
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.route && navigate(item.route)}
                className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card active:bg-secondary transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon size={22} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.badge ? (
                  <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight size={20} className="text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="px-4 py-2">
          <h2 className="section-title mb-3">Sozlamalar</h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {settingsItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 active:bg-secondary transition-colors border-b border-border last:border-b-0"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <item.icon size={20} className="text-muted-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{item.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="px-4 py-4">
          <button 
            onClick={() => navigate("/support")}
            className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card active:bg-secondary transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle size={22} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Yordam markazi</p>
              <p className="text-sm text-muted-foreground">FAQ va qo'llab-quvvatlash</p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Logout */}
        <div className="px-4 py-2">
          <button 
            onClick={() => navigate("/splash")}
            className="w-full flex items-center justify-center gap-3 p-4 bg-destructive/10 rounded-2xl text-destructive font-semibold active:bg-destructive/20 transition-colors"
          >
            <LogOut size={20} />
            Chiqish
          </button>
        </div>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Turon Gumruk v1.0.0</p>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-card rounded-3xl p-6 shadow-2xl animate-in scale-in-95" style={{ width: '364px', height: '364px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">To'lov usuli</h3>
              <button 
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPayment(null);
                }}
                className="p-1 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto" style={{ height: 'calc(364px - 160px)' }}>
              {/* Payme Option */}
              <button
                onClick={() => handlePayment('payme')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors border-2 ${
                  selectedPayment === 'payme'
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-blue-50 hover:bg-blue-100 border-blue-200'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-sm">Payme</p>
                  <p className="text-xs text-muted-foreground">To'lov tizimi</p>
                </div>
                {selectedPayment === 'payme' && (
                  <CheckCircle2 size={20} className="text-blue-500" />
                )}
              </button>

              {/* Click Option */}
              <button
                onClick={() => handlePayment('click')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors border-2 ${
                  selectedPayment === 'click'
                    ? 'bg-purple-100 border-purple-500'
                    : 'bg-purple-50 hover:bg-purple-100 border-purple-200'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-sm">Click</p>
                  <p className="text-xs text-muted-foreground">O'zbekiston</p>
                </div>
                {selectedPayment === 'click' && (
                  <CheckCircle2 size={20} className="text-purple-500" />
                )}
              </button>
            </div>

            {selectedPayment && (
              <button
                onClick={handleConfirmPayment}
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-xl transition-colors"
              >
                To'lov
              </button>
            )}

            <p className="text-center text-xs text-muted-foreground mt-2">
              +500 TG qo'shiladi
            </p>
          </div>
        </div>
      )}
    </MobileShell>
  );
};

export default ProfileScreen;