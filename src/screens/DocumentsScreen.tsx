import { 
  ChevronLeft, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Eye, 
  Plus,
  Image,
  File,
  AlertCircle
} from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const documents = [
  {
    id: 1,
    name: "CMR hujjati",
    type: "cmr",
    status: "approved",
    date: "25 Yanvar 2024",
    size: "2.4 MB",
    route: "Toshkent - Olot",
  },
  {
    id: 2,
    name: "Gumruk deklaratsiyasi",
    type: "declaration",
    status: "approved",
    date: "25 Yanvar 2024",
    size: "1.8 MB",
    route: "Toshkent - Olot",
  },
  {
    id: 3,
    name: "Haydovchilik guvohnomasi",
    type: "license",
    status: "approved",
    date: "20 Dekabr 2023",
    size: "1.2 MB",
    route: null,
  },
  {
    id: 4,
    name: "Texnik pasport",
    type: "passport",
    status: "pending",
    date: "24 Yanvar 2024",
    size: "3.1 MB",
    route: "Toshkent - Olot",
  },
  {
    id: 5,
    name: "Sug'urta polisi",
    type: "insurance",
    status: "rejected",
    date: "22 Yanvar 2024",
    size: "890 KB",
    route: null,
    reason: "Amal qilish muddati tugagan",
  },
];

const DocumentsScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "approved" | "pending">("all");

  const filteredDocs = documents.filter((doc) => {
    if (activeTab === "all") return true;
    if (activeTab === "approved") return doc.status === "approved";
    return doc.status === "pending" || doc.status === "rejected";
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="status-badge success">
            <CheckCircle2 size={12} />
            Tasdiqlangan
          </span>
        );
      case "pending":
        return (
          <span className="status-badge warning">
            <Clock size={12} />
            Tekshirilmoqda
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive/15 text-destructive">
            <XCircle size={12} />
            Rad etildi
          </span>
        );
      default:
        return null;
    }
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case "cmr":
        return <FileText size={22} className="text-primary" />;
      case "declaration":
        return <File size={22} className="text-accent" />;
      case "license":
        return <Image size={22} className="text-success" />;
      default:
        return <FileText size={22} className="text-muted-foreground" />;
    }
  };

  const approvedCount = documents.filter(d => d.status === "approved").length;
  const pendingCount = documents.filter(d => d.status === "pending" || d.status === "rejected").length;

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader 
          title="Hujjatlar"
          showBack
          rightAction={
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-accent">
              <Plus size={20} />
            </button>
          }
        />

        {/* Stats */}
        <div className="px-4 py-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl p-3 text-center shadow-card">
              <p className="text-2xl font-bold text-foreground">{documents.length}</p>
              <p className="text-xs text-muted-foreground">Jami</p>
            </div>
            <div className="bg-card rounded-2xl p-3 text-center shadow-card border-l-4 border-success">
              <p className="text-2xl font-bold text-success">{approvedCount}</p>
              <p className="text-xs text-muted-foreground">Tasdiqlangan</p>
            </div>
            <div className="bg-card rounded-2xl p-3 text-center shadow-card border-l-4 border-warning">
              <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Kutilmoqda</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 py-2">
          <div className="flex gap-2">
            {[
              { key: "all", label: "Hammasi" },
              { key: "approved", label: "Tasdiqlangan" },
              { key: "pending", label: "Kutilmoqda" },
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

        {/* Upload Banner */}
        <div className="px-4 py-3">
          <button className="w-full p-4 border-2 border-dashed border-primary/30 rounded-2xl bg-primary/5 flex items-center justify-center gap-3 active:bg-primary/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Upload size={22} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-primary">Yangi hujjat yuklash</p>
              <p className="text-sm text-muted-foreground">PDF, JPG, PNG (max 10MB)</p>
            </div>
          </button>
        </div>

        {/* Documents List */}
        <div className="px-4 py-2 space-y-3">
          {filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-card rounded-2xl overflow-hidden shadow-card"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    {getDocIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold truncate">{doc.name}</p>
                      {getStatusBadge(doc.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{doc.date}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{doc.size}</span>
                      {doc.route && (
                        <>
                          <span>•</span>
                          <span>{doc.route}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rejection reason */}
                {doc.status === "rejected" && doc.reason && (
                  <div className="mt-3 flex items-center gap-2 p-3 bg-destructive/10 rounded-xl">
                    <AlertCircle size={16} className="text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">{doc.reason}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-primary active:bg-secondary transition-colors">
                  <Eye size={16} />
                  Ko'rish
                </button>
                {doc.status === "rejected" && (
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-accent border-l border-border active:bg-secondary transition-colors">
                    <Upload size={16} />
                    Qayta yuklash
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
};

export default DocumentsScreen;