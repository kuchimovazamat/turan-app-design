import { 
  Bell, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Wallet, 
  AlertTriangle,
  Info,
  ChevronRight,
  Settings
} from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Hujjat tasdiqlandi",
    message: "CMR hujjati muvaffaqiyatli tasdiqlandi",
    time: "5 daqiqa oldin",
    read: false,
    icon: CheckCircle2,
  },
  {
    id: 2,
    type: "route",
    title: "Yangi yo'nalish",
    message: "Termiz - Toshkent yo'nalishi tayinlandi",
    time: "1 soat oldin",
    read: false,
    icon: MapPin,
  },
  {
    id: 3,
    type: "payment",
    title: "To'lov qabul qilindi",
    message: "Sayohat #2847 uchun 2,450,000 UZS o'tkazildi",
    time: "2 soat oldin",
    read: true,
    icon: Wallet,
  },
  {
    id: 4,
    type: "warning",
    title: "Hujjat eslatmasi",
    message: "Sug'urta polisi muddati 5 kundan keyin tugaydi",
    time: "3 soat oldin",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: 5,
    type: "document",
    title: "Hujjat yuklandi",
    message: "Gumruk deklaratsiyasi tekshirilmoqda",
    time: "Kecha",
    read: true,
    icon: FileText,
  },
  {
    id: 6,
    type: "info",
    title: "Tizim yangilandi",
    message: "Ilova 1.0.1 versiyasiga yangilandi",
    time: "2 kun oldin",
    read: true,
    icon: Info,
  },
];

const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    return !n.read;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success/10 text-success";
      case "route":
        return "bg-primary/10 text-primary";
      case "payment":
        return "bg-accent/15 text-accent";
      case "warning":
        return "bg-warning/15 text-warning";
      case "document":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader 
          title="Bildirishnomalar"
          showBack
          rightAction={
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary">
              <Settings size={20} className="text-foreground" />
            </button>
          }
        />

        {/* Header Stats */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-primary">
              <Bell size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold">{notifications.length}</p>
              <p className="text-sm text-muted-foreground">Jami bildirishnomalar</p>
            </div>
            {unreadCount > 0 && (
              <div className="text-right">
                <p className="text-xl font-bold text-accent">{unreadCount}</p>
                <p className="text-xs text-muted-foreground">yangi</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 py-2">
          <div className="flex gap-2">
            {[
              { key: "all", label: "Hammasi" },
              { key: "unread", label: `O'qilmagan (${unreadCount})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mark all as read */}
        {unreadCount > 0 && (
          <div className="px-4 py-2">
            <button className="text-sm text-primary font-medium">
              Hammasini o'qilgan deb belgilash
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="px-4 py-2 space-y-2">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <button
                key={notification.id}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-colors ${
                  notification.read 
                    ? "bg-card shadow-card active:bg-secondary" 
                    : "bg-primary/5 border border-primary/20 active:bg-primary/10"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold truncate">{notification.title}</p>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground flex-shrink-0 mt-1" />
              </button>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="text-muted-foreground" />
            </div>
            <p className="font-semibold mb-1">Yangi bildirishnomalar yo'q</p>
            <p className="text-sm text-muted-foreground">Barcha bildirishnomalar o'qilgan</p>
          </div>
        )}
      </div>
    </MobileShell>
  );
};

export default NotificationsScreen;