import { useLocation, useNavigate } from "react-router-dom";
import { Truck, Wrench, Plus, ShoppingCart, User } from "lucide-react";

const navItems = [
  { path: "/", icon: Truck, label: "Garaj" },
  { path: "/home", icon: Wrench, label: "Servislar" },
  { path: "/routes", icon: Plus, label: "Add Order", isAddBtn: true },
  { path: "/orders", icon: ShoppingCart, label: "Zakazlar" },
  { path: "/profile", icon: User, label: "Profil" },
];

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const leftItems = navItems.slice(0, 2); // Garaj, Servislar
  const rightItems = navItems.slice(3, 5); // Zakazlar, Profil
  const centerItem = navItems[2]; // Add Order button

  return (
    <nav className="bottom-nav relative px-4 py-3">
      <div className="flex items-end justify-between">
        {/* Left container - Garaj & Servislar */}
        <div className="flex items-center gap-6 flex-1">
          {leftItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item flex flex-col items-center justify-center ${isActive ? "active" : ""}`}
              >
                <div className="nav-icon">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Center button - Add Order */}
        <button
          onClick={() => navigate(centerItem.path)}
          className="absolute left-1/2 transform -translate-x-1/2 -top-6 z-20"
        >
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110">
            <Plus size={32} strokeWidth={2.5} className="text-primary-foreground" />
          </div>
        </button>

        {/* Right container - Zakazlar & Profil */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          {rightItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item flex flex-col items-center justify-center ${isActive ? "active" : ""}`}
              >
                <div className="nav-icon">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
