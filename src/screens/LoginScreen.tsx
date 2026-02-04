import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Shield, ChevronLeft, Lock, Check } from "lucide-react";
import logo from "@/assets/logo.jpg";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 9) {
      setStep("otp");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when complete
    if (newOtp.every((digit) => digit !== "")) {
      setIsVerifying(true);
      setTimeout(() => navigate("/"), 1000);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-24 px-6 text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative">
          {step === "otp" && (
            <button 
              onClick={() => setStep("phone")} 
              className="w-11 h-11 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-6 active:bg-primary-foreground/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl">
              <img src={logo} alt="Turon Gumruk" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">TURON GUMRUK</h1>
              <p className="text-primary-foreground/80">Haydovchi ilovasi</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {step === "phone" ? "Xush kelibsiz!" : "Tasdiqlash kodi"}
          </h2>
          <p className="text-primary-foreground/80 text-base">
            {step === "phone" 
              ? "Davom etish uchun telefon raqamingizni kiriting" 
              : `+998 ${phoneNumber} raqamiga yuborilgan kodni kiriting`}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex-1 px-4 -mt-14">
        <div className="bg-card rounded-3xl shadow-2xl p-6">
          {step === "phone" ? (
            <>
              <div className="mb-8">
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Telefon raqam
                </label>
                <div className="flex items-center gap-3 p-5 bg-secondary rounded-2xl border-2 border-transparent focus-within:border-primary transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={20} />
                    <span className="font-semibold">+998</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    placeholder="90 123 45 67"
                    className="flex-1 bg-transparent text-lg font-medium focus:outline-none placeholder:text-muted-foreground/50"
                    autoFocus
                  />
                </div>
              </div>

              <button
                onClick={handlePhoneSubmit}
                disabled={phoneNumber.length < 9}
                className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base"
              >
                Davom etish
                <ArrowRight size={20} />
              </button>

              {/* Security Note */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-primary/5 rounded-2xl">
                <Shield size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Xavfsiz kirish</p>
                  Ma'lumotlaringiz shifrlangan va maxfiy saqlanadi
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <label className="text-sm font-semibold text-foreground mb-4 block">
                  6 raqamli kodni kiriting
                </label>
                <div className="flex gap-3 justify-center mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="tel"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-16 text-center text-2xl font-bold bg-secondary rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary border-2 border-transparent focus:border-primary transition-all"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {isVerifying && (
                  <div className="flex items-center justify-center gap-2 text-success animate-fade-in">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                      <Check size={16} />
                    </div>
                    <span className="font-medium">Tekshirilmoqda...</span>
                  </div>
                )}
              </div>

              <button className="w-full text-center text-sm font-medium text-muted-foreground py-2">
                Kod kelmadimi? <span className="text-primary font-semibold">Qayta yuborish</span>
              </button>

              {/* Security Note */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-accent/5 rounded-2xl">
                <Lock size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Bir martalik kod</p>
                  Kod 5 daqiqa davomida amal qiladi
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Davom etish orqali siz{" "}
            <button className="text-primary font-medium">Foydalanish shartlari</button>
            {" "}va{" "}
            <button className="text-primary font-medium">Maxfiylik siyosati</button>
            ga rozilik bildirasiz
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginScreen;