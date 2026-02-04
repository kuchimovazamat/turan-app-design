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
} from "lucide-react";
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
            <p className="text-4xl font-bold mb-2">4,600,000</p>
            <p className="text-sm opacity-80 mb-4">so'm</p>
            <button className="w-full flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 py-2.5 rounded-xl font-semibold transition-colors">
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
    </MobileShell>
  );
};

export default ProfileScreen;