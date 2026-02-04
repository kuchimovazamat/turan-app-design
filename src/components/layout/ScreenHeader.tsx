import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: ReactNode;
}

const ScreenHeader = ({ title, showBack = false, onBack, rightAction }: ScreenHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="app-header safe-area-top">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => (onBack ? onBack() : navigate(-1))}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary active:bg-secondary/80 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
};

export default ScreenHeader;
