import { 
  HelpCircle, 
  ChevronRight, 
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  FileText,
  Truck,
  Wallet,
  MapPin,
  Shield
} from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useState } from "react";

const faqCategories = [
  {
    id: "routes",
    icon: MapPin,
    title: "Yo'nalishlar",
    color: "bg-primary/10 text-primary",
    questions: [
      { q: "Yangi yo'nalish qanday qabul qilaman?", a: "Yangi yo'nalishlar dispetcher tomonidan tayinlanadi va siz bildirishnoma orqali xabar olasiz." },
      { q: "Yo'nalishni bekor qilish mumkinmi?", a: "Ha, lekin kamida 24 soat oldin operator bilan bog'lanish kerak." },
    ],
  },
  {
    id: "documents",
    icon: FileText,
    title: "Hujjatlar",
    color: "bg-accent/15 text-accent",
    questions: [
      { q: "Qanday hujjatlar kerak?", a: "CMR, gumruk deklaratsiyasi, haydovchilik guvohnomasi va texnik pasport." },
      { q: "Hujjatni qanday yuklash mumkin?", a: "Hujjatlar bo'limiga o'ting va '+' tugmasini bosing." },
    ],
  },
  {
    id: "payments",
    icon: Wallet,
    title: "To'lovlar",
    color: "bg-success/10 text-success",
    questions: [
      { q: "To'lov qachon amalga oshiriladi?", a: "Sayohat yakunlangandan so'ng 24-48 soat ichida." },
      { q: "Balansni qanday to'ldirish mumkin?", a: "To'lovlar bo'limida 'To'ldirish' tugmasini bosing." },
    ],
  },
  {
    id: "transport",
    icon: Truck,
    title: "Transport",
    color: "bg-secondary text-muted-foreground",
    questions: [
      { q: "Yangi transport qanday qo'shiladi?", a: "Profil > Transport vositalari > Qo'shish." },
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "Xavfsizlik",
    color: "bg-destructive/10 text-destructive",
    questions: [
      { q: "Parolni qanday o'zgartirish mumkin?", a: "Sozlamalar > Xavfsizlik > Parolni o'zgartirish." },
    ],
  },
];

const SupportScreen = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("routes");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader 
          title="Yordam markazi"
          showBack
        />

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Savolni qidirish..."
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="px-4 py-2">
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-card active:bg-secondary transition-colors">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone size={20} className="text-primary" />
              </div>
              <span className="text-xs font-medium">Qo'ng'iroq</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-card active:bg-secondary transition-colors">
              <div className="w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center">
                <MessageCircle size={20} className="text-success" />
              </div>
              <span className="text-xs font-medium">Chat</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl shadow-card active:bg-secondary transition-colors">
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center">
                <Mail size={20} className="text-accent" />
              </div>
              <span className="text-xs font-medium">Email</span>
            </button>
          </div>
        </div>

        {/* Working Hours */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 p-4 bg-success/10 rounded-2xl">
            <Clock size={20} className="text-success" />
            <div>
              <p className="font-medium text-success">24/7 qo'llab-quvvatlash</p>
              <p className="text-sm text-success/80">Har doim aloqadamiz</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-4 py-3">
          <h2 className="section-title mb-3">Ko'p so'raladigan savollar</h2>
          
          <div className="space-y-3">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div key={category.id} className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="w-full flex items-center gap-4 p-4"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${category.color}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{category.title}</p>
                      <p className="text-sm text-muted-foreground">{category.questions.length} ta savol</p>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  
                  {isExpanded && (
                    <div className="border-t border-border">
                      {category.questions.map((item, idx) => {
                        const questionKey = `${category.id}-${idx}`;
                        const isQuestionExpanded = expandedQuestion === questionKey;
                        
                        return (
                          <div key={idx} className="border-b border-border last:border-b-0">
                            <button
                              onClick={() => setExpandedQuestion(isQuestionExpanded ? null : questionKey)}
                              className="w-full flex items-center gap-3 p-4 text-left"
                            >
                              <HelpCircle size={16} className="text-primary flex-shrink-0" />
                              <p className="flex-1 text-sm font-medium">{item.q}</p>
                              <ChevronDown 
                                size={16} 
                                className={`text-muted-foreground transition-transform ${isQuestionExpanded ? "rotate-180" : ""}`}
                              />
                            </button>
                            {isQuestionExpanded && (
                              <div className="px-4 pb-4 pl-11">
                                <p className="text-sm text-muted-foreground">{item.a}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Still need help */}
        <div className="px-4 py-4">
          <div className="gradient-primary rounded-2xl p-5 text-primary-foreground shadow-primary">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <HelpCircle size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1">Hali ham yordam kerakmi?</p>
                <p className="text-sm opacity-80">Mutaxassislarimiz bilan bog'laning</p>
              </div>
            </div>
            <button className="w-full mt-4 py-3 bg-accent text-accent-foreground rounded-xl font-semibold flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Murojaat yuborish
            </button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default SupportScreen;