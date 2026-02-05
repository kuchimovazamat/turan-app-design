import { Eye, Download, Clock, CheckCircle, AlertCircle, MapPin, Bell } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo.jpg";

interface Order {
  id: string;
  orderNo: string;
  services: string[];
  startCity: string;
  endCity: string;
  checkpoints: string[];
  totalPrice: number;
  paymentStatus: "to'landi" | "kutilmoqda";
  processingStatus: "jarayonda" | "tugallandi" | "rad etildi";
  createdDate: string;
  documents?: {
    name: string;
    url: string;
  }[];
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNo: "#ORD-2026-001",
    services: ["КАЗ ЭПИ", "ПЛАТОН"],
    startCity: "Toshkent",
    endCity: "Bukhara",
    checkpoints: ["Dostyk Chegara", "Olot Nazorat Punkti"],
    totalPrice: 450000,
    paymentStatus: "to'landi",
    processingStatus: "tugallandi",
    createdDate: "3 Fevral, 14:30",
    documents: [
      {
        name: "КАЗ ЭПИ_Dokumentlar.pdf",
        url: "#",
      },
      {
        name: "ПЛАТОН_Dokumentlar.pdf",
        url: "#",
      },
    ],
  },
  {
    id: "2",
    orderNo: "#ORD-2026-002",
    services: ["УЗ ЭПИ"],
    startCity: "Samarkand",
    endCity: "Urgench",
    checkpoints: ["Qorday O'tishi"],
    totalPrice: 180000,
    paymentStatus: "to'landi",
    processingStatus: "jarayonda",
    createdDate: "2 Fevral, 10:15",
  },
  {
    id: "3",
    orderNo: "#ORD-2026-003",
    services: ["КАЗ очередь", "КАЗ страх"],
    startCity: "Fergana",
    endCity: "Namangan",
    checkpoints: ["Oq-Jol Darvozasi"],
    totalPrice: 400000,
    paymentStatus: "kutilmoqda",
    processingStatus: "jarayonda",
    createdDate: "1 Fevral, 09:45",
  },
  {
    id: "4",
    orderNo: "#ORD-2026-004",
    services: ["ПЛАТОН"],
    startCity: "Andijon",
    endCity: "Guliston",
    checkpoints: ["Xorgos Chegara"],
    totalPrice: 200000,
    paymentStatus: "to'landi",
    processingStatus: "tugallandi",
    createdDate: "31 Yanvar, 16:20",
    documents: [
      {
        name: "ПЛАТОН_Dokumentlar.pdf",
        url: "#",
      },
    ],
  },
];

const OrdersScreen = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);

  const getPaymentStatusColor = (status: string) => {
    return status === "to'landi"
      ? "bg-success/10 text-success border-success"
      : "bg-warning/10 text-warning border-warning";
  };

  const getProcessingStatusColor = (status: string) => {
    switch (status) {
      case "tugallandi":
        return "bg-success/10 text-success border-success";
      case "jarayonda":
        return "bg-primary/10 text-primary border-primary";
      case "rad etildi":
        return "bg-destructive/10 text-destructive border-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProcessingStatusIcon = (status: string) => {
    switch (status) {
      case "tugallandi":
        return <CheckCircle size={18} />;
      case "jarayonda":
        return <Clock size={18} />;
      case "rad etildi":
        return <AlertCircle size={18} />;
      default:
        return null;
    }
  };

  const getProcessingStatusLabel = (status: string) => {
    switch (status) {
      case "tugallandi":
        return "Tugallandi";
      case "jarayonda":
        return "Jarayonda";
      case "rad etildi":
        return "Rad etildi";
      default:
        return status;
    }
  };

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
              <p className="text-muted-foreground text-sm">Zakazlar</p>
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

        <div className="px-4 py-3 space-y-3 pb-20">
          {mockOrders.map((order) => (
            <div key={order.id} className="space-y-0">
              {/* Order Card Header */}
              <button
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                className="w-full bg-card border border-muted rounded-2xl p-4 hover:border-primary transition-colors text-left"
              >
                {/* Order Number and Status */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{order.orderNo}</p>
                    <p className="text-xs text-muted-foreground mt-1">{order.createdDate}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* Payment Status Badge */}
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-lg border flex items-center gap-1 ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      <span>
                        {order.paymentStatus === "to'landi" ? "✓" : "⏳"}
                      </span>
                      {order.paymentStatus === "to'landi" ? "To'landi" : "Kutilmoqda"}
                    </div>
                    {/* Processing Status Badge */}
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-lg border flex items-center gap-1 ${getProcessingStatusColor(
                        order.processingStatus
                      )}`}
                    >
                      {getProcessingStatusIcon(order.processingStatus)}
                      {getProcessingStatusLabel(order.processingStatus)}
                    </div>
                  </div>
                </div>

                {/* Route Info */}
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>{order.startCity}</span>
                  <span className="text-xs">→</span>
                  <span>{order.endCity}</span>
                </div>

                {/* Services */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {order.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="pt-3 border-t border-muted flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Jami:</span>
                  <span className="text-lg font-bold text-primary">
                    {order.totalPrice.toLocaleString()} TG
                  </span>
                </div>
              </button>

              {/* Expanded Details */}
              {selectedOrder === order.id && (
                <div className="bg-muted/30 rounded-b-2xl border border-t-0 border-muted p-4 space-y-3">
                  {/* Checkpoints */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                      Chegara postlari
                    </p>
                    <div className="space-y-2">
                      {order.checkpoints.map((checkpoint, idx) => (
                        <div
                          key={idx}
                          className="bg-card p-2 rounded-lg text-xs text-foreground"
                        >
                          {checkpoint}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document Download Section - Only show if tugallandi */}
                  {order.processingStatus === "tugallandi" && order.documents && order.documents.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                        Tayyor dokumentlar
                      </p>
                      <div className="space-y-2">
                        {order.documents.map((doc, idx) => (
                          <div
                            key={idx}
                            className="bg-success/5 border border-success/30 p-3 rounded-lg flex items-center justify-between"
                          >
                            <span className="text-sm text-foreground font-medium flex-1 truncate">
                              {doc.name}
                            </span>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => setViewingDocument(doc.name)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                title="Ko'rish"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  // Download logic here
                                  const link = document.createElement("a");
                                  link.href = doc.url;
                                  link.download = doc.name;
                                  link.click();
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-success text-success-foreground hover:bg-success/90 transition-colors"
                                title="Yuklab olish"
                              >
                                <Download size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pending Payment Info */}
                  {order.paymentStatus === "kutilmoqda" && (
                    <div className="bg-warning/10 border border-warning rounded-lg p-3">
                      <p className="text-xs text-warning font-semibold mb-2">
                        ⚠️ To'lov Kutilmoqda
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Buyurtmanizni yakunlash uchun {order.totalPrice.toLocaleString()} TG to'lovni amalga oshiring.
                      </p>
                    </div>
                  )}

                  {/* Processing Status Info */}
                  {order.processingStatus === "jarayonda" && (
                    <div className="bg-primary/10 border border-primary rounded-lg p-3">
                      <p className="text-xs text-primary font-semibold mb-2">
                        ⏳ Jarayonda
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sizning buyurtmaniz qayta ishlash jarayonida. Dokumentlar tayyor bo'lganda, ularni yuklab olishingiz mumkin bo'ladi.
                      </p>
                    </div>
                  )}

                  {/* Rejected Status Info */}
                  {order.processingStatus === "rad etildi" && (
                    <div className="bg-destructive/10 border border-destructive rounded-lg p-3">
                      <p className="text-xs text-destructive font-semibold mb-2">
                        ✕ Rad etildi
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Buyurtma rad etildi. Tafsilotlar uchun qo'llab-quvvatlash bo'limi bilan bog'laning.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewingDocument(null)}
        >
          <div
            className="bg-card rounded-2xl p-6 max-w-md w-full max-h-96 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{viewingDocument}</h3>
              <button
                onClick={() => setViewingDocument(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="bg-muted rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">PDF Ko'rinishi</p>
                <p className="text-xs text-muted-foreground">
                  {viewingDocument}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
};

export default OrdersScreen;
