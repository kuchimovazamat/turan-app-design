import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface MobileShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

const MobileShell = ({ children, hideNav = false }: MobileShellProps) => {
  return (
    <div className="app-shell">
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
      {!hideNav && <BottomNavigation />}
    </div>
  );
};

export default MobileShell;
