import { 
  Bell, 
  ChevronRight,
  Briefcase
} from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import logo from "@/assets/logo.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const SERVICES = [
  { id: 1, name: "КАЗ ЭПИ", requiredDocs: ["Deklaratsiya", "Passport", "SMER"] },
  { id: 2, name: "КАЗ очередь", requiredDocs: ["Deklaratsiya", "Passport"] },
  { id: 3, name: "УЗ ЭПИ", requiredDocs: ["Deklaratsiya", "Tex passport"] },
  { id: 4, name: "ПЛАТОН", requiredDocs: ["Passport", "Prava"] },
  { id: 5, name: "КАЗ страх", requiredDocs: ["Deklaratsiya", "Passport", "SMER"] },
  { id: 6, name: "РУС очередь", requiredDocs: ["Deklaratsiya", "Passport"] },
  { id: 7, name: "РУС страх", requiredDocs: ["Deklaratsiya", "Passport", "Presep tex passporti"] },
  { id: 8, name: "БАКАД", requiredDocs: ["Deklaratsiya", "Tex passport"] },
  { id: 9, name: "ОБЕСП", requiredDocs: ["Passport"] },
  { id: 10, name: "ОПЛАТА", requiredDocs: ["Passport", "Prava"] },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  return (
    <MobileShell>
      <div className="safe-area-top">
        {/* Header */}
        <header className="px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Turon Gumruk" 
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <p className="text-muted-foreground text-sm">Servislar</p>
              <h1 className="text-lg font-bold">Alisher Karimov</h1>
            </div>
          </div>
          <button 
            onClick={() => navigate("/notifications")}
            className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-card shadow-card"
          >
            <Bell size={22} className="text-foreground" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card" />
          </button>
        </header>

        {/* Services List */}
        <div className="px-4 py-4 pb-6">
          <div className="space-y-3">
            {SERVICES.map((service) => (
              <div key={service.id}>
                <button
                  onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                  className="w-full bg-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase size={22} className="text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.requiredDocs.length} dokumentlar talab qilinadi
                      </p>
                    </div>
                    <ChevronRight 
                      size={20} 
                      className={`text-muted-foreground transition-transform ${
                        expandedService === service.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedService === service.id && (
                  <div className="mt-2 bg-muted/50 rounded-2xl p-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground mb-3">Talab qilingan dokumentlar:</p>
                      {service.requiredDocs.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-foreground">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default HomeScreen;