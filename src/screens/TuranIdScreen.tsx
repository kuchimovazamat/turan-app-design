import { useNavigate } from "react-router-dom";
import { QrCode, Copy, Share2, Download, CheckCircle2 } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useState } from "react";

const TuranIdScreen = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const userId = "TG-2024-00127";
  const qrCodeData = `https://turangumruk.uz/send/${userId}`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader
          title="Turan Gumruk ID"
          showBack={true}
          onBack={() => navigate("/profile")}
        />

        {/* User ID Card */}
        <div className="px-4 py-6">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 shadow-primary text-primary-foreground relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-foreground blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-accent blur-2xl" />
            </div>

            <div className="relative">
              <p className="text-sm opacity-80 mb-2">Sizning ID raqamingiz</p>
              <h2 className="text-3xl font-bold mb-4">{userId}</h2>
              
              <button
                onClick={handleCopyId}
                className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 rounded-xl text-sm font-medium active:bg-primary-foreground/30 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={16} />
                    Nusxalandi
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    ID ni nusxalash
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="px-4 pb-4">
          <h2 className="section-title mb-3">QR kod</h2>
          <div className="bg-card rounded-3xl p-6 shadow-card">
            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="w-64 h-64 bg-white rounded-2xl p-4 shadow-lg flex items-center justify-center border-2 border-border">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <QrCode size={180} className="text-primary" strokeWidth={1} />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center mb-6">
              <h3 className="font-bold text-lg mb-2">Hujjatlarni qabul qilish</h3>
              <p className="text-muted-foreground text-sm">
                Boshqa logistika kompaniyalari bu QR kod orqali deklaratsiya va shartnomalarni yuborishlari mumkin
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 p-4 bg-primary text-primary-foreground rounded-2xl font-semibold active:bg-primary/90 transition-colors">
                <Share2 size={20} />
                QR kodni ulashish
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 p-4 bg-secondary text-foreground rounded-2xl font-semibold active:bg-secondary/80 transition-colors">
                <Download size={20} />
                QR kodni yuklab olish
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="px-4 pb-6">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <QrCode size={20} className="text-accent" />
              </div>
              <div className="flex-1 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-1">Qanday ishlaydi?</h3>
                <p className="mb-2">
                  Sizning Turan Gumruk ID raqamingiz Turon ERP tizimida noyob identifikatoringizdir. Boshqa logistika kompaniyalari bu ID orqali sizga deklaratsiyalarini, shartnomalar va boshqa rasmiy hujjatlarni to'g'ridan-to'g'ri yuborishlari mumkin.
                </p>
                <p>
                  QR kodni skanerlash yoki ID raqamni kiritish orqali hujjatlar avtomatik ravishda sizning Turon ERP hisobingizga qo'shiladi va tizimda qayd etiladi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default TuranIdScreen;
