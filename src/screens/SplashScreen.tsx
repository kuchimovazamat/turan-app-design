import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo.jpg";
import { Truck, MapPin, FileCheck, ChevronRight, ChevronLeft } from "lucide-react";

const onboardingData = [
  {
    icon: Truck,
    title: "Transport boshqaruvi",
    description: "Barcha transport vositalaringizni bir joyda boshqaring. Real vaqt rejimida masofani kuzating.",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: MapPin,
    title: "Yo'nalishlar va xarita",
    description: "Chegara nazorat punktlari o'rtasida optimal marshrutlarni toping va kuzatib boring.",
    color: "bg-accent/15 text-accent"
  },
  {
    icon: FileCheck,
    title: "Hujjatlar va to'lovlar",
    description: "Gumruk hujjatlari va to'lovlarni osongina boshqaring. Barcha ma'lumotlar xavfsiz saqlanadi.",
    color: "bg-success/10 text-success"
  }
];

const SplashScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  // Show splash for 2 seconds then show onboarding
  if (showOnboarding === null) {
    setTimeout(() => setShowOnboarding(true), 2000);
    
    return (
      <div className="flex-1 min-h-screen">
        <div className="min-h-screen gradient-primary flex flex-col items-center justify-center p-8">{/* Logo */}
        <div className="animate-scale-in">
          <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-2xl mb-8">
            <img 
              src={logo} 
              alt="Turon Gumruk" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            TURON GUMRUK
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Haydovchi ilovasi
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce-soft" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce-soft" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce-soft" style={{ animationDelay: "300ms" }} />
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center">
          <p className="text-primary-foreground/60 text-sm">Since 2015</p>
          <p className="text-primary-foreground/40 text-xs mt-1">v1.0.0</p>
        </div>
        </div>
      </div>
    );
  }

  const currentOnboarding = onboardingData[currentStep];
  const Icon = currentOnboarding.icon;

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="min-h-screen bg-background flex flex-col">
      {/* Skip Button */}
      <div className="p-4 flex justify-end">
        <button 
          onClick={handleSkip}
          className="text-muted-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          O'tkazib yuborish
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Icon */}
        <div className={`w-40 h-40 rounded-3xl ${currentOnboarding.color} flex items-center justify-center mb-8 animate-scale-in shadow-lg`}>
          <Icon size={80} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 animate-fade-in">
          {currentOnboarding.title}
        </h2>

        {/* Description */}
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-sm animate-fade-in">
          {currentOnboarding.description}
        </p>

        {/* Dots Indicator */}
        <div className="flex gap-2 mb-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-6 flex items-center gap-4">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-secondary text-foreground"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <button
          onClick={handleNext}
          className={`flex-1 btn-primary py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 ${
            currentStep === 0 ? 'ml-0' : ''
          }`}
        >
          {currentStep === onboardingData.length - 1 ? "Boshlash" : "Keyingisi"}
          <ChevronRight size={20} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default SplashScreen;