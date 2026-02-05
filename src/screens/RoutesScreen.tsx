import { 
  ChevronRight, 
  MapPin, 
  Navigation, 
  Search, 
  X,
  ChevronLeft,
  Check,
  Upload,
  ArrowRight,
  Map as MapIcon,
  AlertCircle,
  Wallet,
} from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  { id: 1, name: "КАЗ ЭПИ", requiredDocs: ["Deklaratsiya", "Passport", "SMER"], price: 250000 },
  { id: 2, name: "КАЗ очередь", requiredDocs: ["Deklaratsiya", "Passport"], price: 150000 },
  { id: 3, name: "УЗ ЭПИ", requiredDocs: ["Deklaratsiya", "Tex passport"], price: 180000 },
  { id: 4, name: "ПЛАТОН", requiredDocs: ["Passport", "Prava"], price: 200000 },
  { id: 5, name: "КАЗ страх", requiredDocs: ["Deklaratsiya", "Passport", "SMER"], price: 250000 },
];

const CITIES = [
  "Toshkent",
  "Andijon",
  "Bukhara",
  "Fergana",
  "Guliston",
  "Jizzax",
  "Namangan",
  "Navoi",
  "Samarkand",
  "Shakhrisabz",
  "Surkhandarya",
  "Syrdarya",
  "Urgench",
];

const CHECKPOINTS = [
  "Dostyk Chegara",
  "Olot Nazorat Punkti",
  "Qorday O'tishi",
  "Oq-Jol Darvozasi",
  "Xorgos Chegara",
];

const BORDER_POSTS = {
  "Dostyk Chegara": ["Dostyk Chegara Postasi", "Dostyk Bojxonasi", "Dostyk Terminali"],
  "Olot Nazorat Punkti": ["Olot Asosiy Darvozasi", "Olot Qo'shimcha Darvozasi", "Olot Nazorat Postasi"],
  "Qorday O'tishi": ["Qorday Shimoli Postasi", "Qorday Janubi Postasi", "Qorday Nazorat Markazi"],
  "Oq-Jol Darvozasi": ["Oq-Jol Asosiy Darvozasi", "Oq-Jol Muqobil Darvozasi", "Oq-Jol Terminali"],
  "Xorgos Chegara": ["Xorgos Chegara Postasi", "Xorgos Bojxonasi", "Xorgos Nazorat Markazi"],
};

const RoutesScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"servis" | "xarita">("servis");
  const [step, setStep] = useState<"services" | "route" | "map" | "selectServices" | "uploadDocs" | "payment">("services");
  
  // Wallet state
  const [walletBalance] = useState(4600000); // TG balance in som
  
  // Services tab state
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  
  // Route tab state
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [selectedCheckpoints, setSelectedCheckpoints] = useState<number[]>([]);
  const [selectedBorderPosts, setSelectedBorderPosts] = useState<Record<number, string>>({});
  const [expandedCheckpoint, setExpandedCheckpoint] = useState<number | null>(null);
  const [showStartDropdown, setShowStartDropdown] = useState(false);
  const [showEndDropdown, setShowEndDropdown] = useState(false);
  const [startSearch, setStartSearch] = useState("");
  const [endSearch, setEndSearch] = useState("");
  
  // Route services (for xarita tab flow)
  const [routeSelectedServices, setRouteSelectedServices] = useState<number[]>([]);
  const [routeUploadedDocs, setRouteUploadedDocs] = useState<Record<string, boolean>>({});

  // Filter cities based on search
  const filteredStartCities = CITIES.filter(city => 
    city.toLowerCase().includes(startSearch.toLowerCase()) && city !== endCity
  );
  const filteredEndCities = CITIES.filter(city => 
    city.toLowerCase().includes(endSearch.toLowerCase()) && city !== startCity
  );

  // Calculate total price
  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = SERVICES.find(s => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  // Check if all required docs are uploaded
  const getUniqueRequiredDocs = () => {
    const docs = new Set<string>();
    selectedServices.forEach(serviceId => {
      const service = SERVICES.find(s => s.id === serviceId);
      service?.requiredDocs.forEach(doc => docs.add(doc));
    });
    return Array.from(docs);
  };

  const getUniqueRequiredDocsForRoute = () => {
    const docs = new Set<string>();
    routeSelectedServices.forEach(serviceId => {
      const service = SERVICES.find(s => s.id === serviceId);
      service?.requiredDocs.forEach(doc => docs.add(doc));
    });
    return Array.from(docs);
  };

  const uniqueRequiredDocs = getUniqueRequiredDocs();
  const uniqueRouteRequiredDocs = getUniqueRequiredDocsForRoute();

  const allDocsUploaded = selectedServices.every(serviceId => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return false;
    return service.requiredDocs.every(doc => uploadedDocs[doc]);
  });

  const allRouteDocsUploaded = routeSelectedServices.every(serviceId => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return false;
    return service.requiredDocs.every(doc => routeUploadedDocs[doc]);
  });

  // Calculate total price for route services
  const routeTotalPrice = routeSelectedServices.reduce((sum, id) => {
    const service = SERVICES.find(s => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  const toggleService = (serviceId: number) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleRouteService = (serviceId: number) => {
    setRouteSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleCheckpoint = (checkpointId: number) => {
    setSelectedCheckpoints(prev =>
      prev.includes(checkpointId)
        ? prev.filter(id => id !== checkpointId)
        : [...prev, checkpointId]
    );
  };

  const handlePayment = () => {
    // Check if wallet has enough balance
    if (walletBalance < totalPrice) {
      // Insufficient balance - order will show "to'lov kutilmoqda" status
      console.log("Insufficient balance, creating pending order");
      navigate("/orders");
      return;
    }
    
    // Sufficient balance - process payment
    console.log("Payment processed successfully");
    navigate("/orders");
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        <div className="flex justify-center pt-6 pb-2">
          <ScreenHeader title="Buyurtma berish" onBack={() => navigate("/")} />
        </div>

        {/* Tab Bar */}
        <div className="px-4 py-4">
          <div className="inline-flex gap-2 bg-muted p-1 rounded-lg w-full">
            <button
              onClick={() => {
                setActiveTab("servis");
                setStep("services");
              }}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold transition-all duration-200 ${
                activeTab === "servis"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Servis
            </button>
            <button
              onClick={() => {
                setActiveTab("xarita");
                setStep("route");
              }}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold transition-all duration-200 ${
                activeTab === "xarita"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Xarita
            </button>
          </div>
        </div>

        {/* Services Tab */}
        {activeTab === "servis" && (
          <div className="px-4 py-4 pb-6">
            {step === "services" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                    Servis tanlang
                  </h3>
                  <div className="space-y-3">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className="w-full bg-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-shadow text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                              selectedServices.includes(service.id)
                                ? "bg-primary"
                                : "border-2 border-muted bg-card"
                            }`}
                          >
                            {selectedServices.includes(service.id) && (
                              <Check size={16} className="text-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {service.requiredDocs.length} dokumentlar talab qilinadi
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">{service.price.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">so'm</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedServices.length > 0 && (
                  <>
                    <div className="border-t border-border pt-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                        Dokumentlarni yuklang
                      </h3>
                      <div className="space-y-2">
                        {uniqueRequiredDocs.map((doc) => (
                          <button
                            key={doc}
                            onClick={() => {
                              setUploadedDocs(prev => ({
                                ...prev,
                                [doc]: !prev[doc]
                              }));
                            }}
                            className="w-full flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                          >
                            {uploadedDocs[doc] ? (
                              <div className="w-5 h-5 rounded-lg bg-success flex items-center justify-center flex-shrink-0">
                                <Check size={14} className="text-success-foreground" />
                              </div>
                            ) : (
                              <Upload size={18} className="text-muted-foreground" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                uploadedDocs[doc]
                                  ? "text-success"
                                  : "text-foreground"
                              }`}
                            >
                              {doc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="bg-card rounded-2xl p-4 shadow-card mb-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Servislar</span>
                            <span className="font-semibold text-foreground">{totalPrice.toLocaleString()} so'm</span>
                          </div>
                          <div className="border-t border-muted pt-3 flex items-center justify-between">
                            <span className="text-muted-foreground font-medium">Jami:</span>
                            <span className="text-2xl font-bold text-primary">
                              {totalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wallet Section */}
                      <div className={`rounded-2xl p-4 mb-4 ${
                        walletBalance >= totalPrice
                          ? "bg-success/10 border border-success/20"
                          : "bg-warning/10 border border-warning/20"
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <Wallet size={20} className={walletBalance >= totalPrice ? "text-success" : "text-warning"} />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">TG Balans</p>
                            <p className={`text-xs ${walletBalance >= totalPrice ? "text-success" : "text-warning"}`}>
                              {walletBalance.toLocaleString()} so'm
                            </p>
                          </div>
                        </div>
                        {walletBalance < totalPrice && (
                          <div className="flex items-start gap-2 mt-3 p-2 bg-warning/10 rounded-lg">
                            <AlertCircle size={14} className="text-warning mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-warning">
                              Hamyonda yetarli mablag' yo'q. Buyurtma "To'lov kutilmoqda" holati bilan yaratiladi.
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handlePayment}
                        disabled={!allDocsUploaded}
                        className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                          allDocsUploaded
                            ? "btn-primary"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        <Wallet size={18} />
                        TG bilan To'lash
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Map/Route Tab */}
        {activeTab === "xarita" && (
          <div className="px-4 py-4 pb-6">
            {step === "route" && (
              <div className="space-y-4">
                {/* Start City */}
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Boshlang'ich shahar
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowStartDropdown(!showStartDropdown)}
                      className="w-full bg-card rounded-xl p-3 text-left flex items-center justify-between border border-muted"
                    >
                      <span className={startCity ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {startCity || "Tanlang..."}
                      </span>
                      <ChevronRight size={18} className="text-muted-foreground" />
                    </button>
                    {showStartDropdown && (
                      <div className="absolute top-full mt-2 w-full bg-card border border-muted rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-card p-2 border-b border-muted">
                          <input
                            type="text"
                            placeholder="Qidiring..."
                            value={startSearch}
                            onChange={(e) => setStartSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-muted rounded-lg text-sm outline-none"
                            autoFocus
                          />
                        </div>
                        <div className="divide-y divide-muted">
                          {filteredStartCities.map((city) => (
                            <button
                              key={city}
                              onClick={() => {
                                setStartCity(city);
                                setShowStartDropdown(false);
                                setStartSearch("");
                              }}
                              className="w-full p-3 text-left hover:bg-muted transition-colors text-sm"
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* End City */}
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Tugallanish shahar
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowEndDropdown(!showEndDropdown)}
                      className="w-full bg-card rounded-xl p-3 text-left flex items-center justify-between border border-muted"
                    >
                      <span className={endCity ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {endCity || "Tanlang..."}
                      </span>
                      <ChevronRight size={18} className="text-muted-foreground" />
                    </button>
                    {showEndDropdown && (
                      <div className="absolute top-full mt-2 w-full bg-card border border-muted rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-card p-2 border-b border-muted">
                          <input
                            type="text"
                            placeholder="Qidiring..."
                            value={endSearch}
                            onChange={(e) => setEndSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-muted rounded-lg text-sm outline-none"
                            autoFocus
                          />
                        </div>
                        <div className="divide-y divide-muted">
                          {filteredEndCities.map((city) => (
                            <button
                              key={city}
                              onClick={() => {
                                setEndCity(city);
                                setShowEndDropdown(false);
                                setEndSearch("");
                              }}
                              className="w-full p-3 text-left hover:bg-muted transition-colors text-sm"
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {startCity && endCity && (
                  <>
                    {/* Checkpoints */}
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Chegara postini tanlang
                      </label>
                      <div className="space-y-3">
                        {CHECKPOINTS.map((checkpoint, index) => (
                          <div key={index}>
                            <button
                              onClick={() => {
                                toggleCheckpoint(index);
                                setExpandedCheckpoint(selectedCheckpoints.includes(index) ? null : index);
                              }}
                              className="w-full flex items-center gap-3 p-3 bg-card border border-muted rounded-xl hover:border-primary transition-colors"
                            >
                              <div
                                className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                                  selectedCheckpoints.includes(index)
                                    ? "bg-primary"
                                    : "border-2 border-muted bg-card"
                                }`}
                              >
                                {selectedCheckpoints.includes(index) && (
                                  <Check size={16} className="text-primary-foreground" />
                                )}
                              </div>
                              <span className="text-sm font-medium text-foreground flex-1 text-left">
                                {checkpoint}
                              </span>
                              {selectedCheckpoints.includes(index) && selectedBorderPosts[index] && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg">
                                  {selectedBorderPosts[index].split(" ").slice(0, 2).join(" ")}
                                </span>
                              )}
                            </button>

                            {/* Border Post Selection */}
                            {selectedCheckpoints.includes(index) && (
                              <div className="mt-2 ml-4 bg-muted/30 p-3 rounded-xl space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground mb-2">
                                  Chegara postini tanlang
                                </p>
                                {BORDER_POSTS[checkpoint].map((post) => (
                                  <button
                                    key={post}
                                    onClick={() => {
                                      setSelectedBorderPosts(prev => ({
                                        ...prev,
                                        [index]: post
                                      }));
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                      selectedBorderPosts[index] === post
                                        ? "bg-primary text-primary-foreground font-medium"
                                        : "bg-card border border-muted hover:border-primary text-foreground"
                                    }`}
                                  >
                                    {selectedBorderPosts[index] === post && (
                                      <span className="inline-block mr-2">✓</span>
                                    )}
                                    {post}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setStep("map")}
                      disabled={selectedCheckpoints.length === 0 || !selectedCheckpoints.every(cp => selectedBorderPosts[cp])}
                      className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        selectedCheckpoints.length === 0 || !selectedCheckpoints.every(cp => selectedBorderPosts[cp])
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "btn-primary"
                      }`}
                    >
                      <MapIcon size={18} />
                      Keyingi
                    </button>
                  </>
                )}
              </div>
            )}

            {step === "map" && (
              <div className="space-y-4">
                {/* Map Preview */}
                <div className="bg-muted rounded-2xl overflow-hidden h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={40} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Xarita ko'rinishi</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {startCity} → {endCity}
                    </p>
                  </div>
                </div>

                {/* Route Info */}
                <div className="bg-card rounded-2xl p-4 shadow-card">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Boshlang'ich</p>
                      <p className="font-semibold text-foreground">{startCity}</p>
                    </div>
                    <div className="border-t border-muted pt-3">
                      <p className="text-xs text-muted-foreground mb-2">Checkpointlar</p>
                      <div className="space-y-2">
                        {selectedCheckpoints.map((index) => (
                          <div key={index} className="bg-muted/50 p-2 rounded-lg">
                            <p className="text-sm font-medium text-foreground">{CHECKPOINTS[index]}</p>
                            <p className="text-xs text-muted-foreground">{selectedBorderPosts[index]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-muted pt-3">
                      <p className="text-xs text-muted-foreground mb-1">Tugallanish</p>
                      <p className="font-semibold text-foreground">{endCity}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("route")}
                    className="flex-1 bg-muted py-3 rounded-2xl font-semibold text-foreground"
                  >
                    Ortga
                  </button>
                  <button
                    onClick={() => setStep("selectServices")}
                    className="flex-1 btn-primary py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
                  >
                    Servis tanlash
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Select Services for Route */}
            {step === "selectServices" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-3">
                    Servislarni tanlang
                  </label>
                  <div className="space-y-3">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => toggleRouteService(service.id)}
                        className="w-full flex items-center gap-3 p-3 bg-card border border-muted rounded-xl hover:border-primary transition-colors"
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                            routeSelectedServices.includes(service.id)
                              ? "bg-primary"
                              : "border-2 border-muted bg-card"
                          }`}
                        >
                          {routeSelectedServices.includes(service.id) && (
                            <Check size={16} className="text-primary-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {service.requiredDocs.length} dokumentlar talab qilinadi
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">{service.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">TG</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {routeSelectedServices.length > 0 && (
                  <button
                    onClick={() => setStep("uploadDocs")}
                    className="w-full btn-primary py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
                  >
                    Keyingi: Hujjatlarni yuklash
                    <ArrowRight size={18} />
                  </button>
                )}

                <button
                  onClick={() => setStep("map")}
                  className="w-full bg-muted py-3 rounded-2xl font-semibold text-foreground"
                >
                  Ortga
                </button>
              </div>
            )}

            {/* Upload Documents for Route */}
            {step === "uploadDocs" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                    Dokumentlarni yuklang
                  </h3>
                  <div className="space-y-2">
                    {uniqueRouteRequiredDocs.map((doc) => (
                      <button
                        key={doc}
                        onClick={() => {
                          setRouteUploadedDocs(prev => ({
                            ...prev,
                            [doc]: !prev[doc]
                          }));
                        }}
                        className="w-full flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                      >
                        {routeUploadedDocs[doc] ? (
                          <div className="w-5 h-5 rounded-lg bg-success flex items-center justify-center flex-shrink-0">
                            <Check size={14} className="text-success-foreground" />
                          </div>
                        ) : (
                          <Upload size={18} className="text-muted-foreground" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            routeUploadedDocs[doc]
                              ? "text-success"
                              : "text-foreground"
                          }`}
                        >
                          {doc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {allRouteDocsUploaded && (
                  <div className="bg-card rounded-2xl p-4 shadow-card">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Servislar</span>
                        <span className="font-semibold text-foreground">{routeTotalPrice.toLocaleString()} TG</span>
                      </div>
                      <div className="border-t border-muted pt-3 flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">Jami:</span>
                        <span className="text-2xl font-bold text-primary">
                          {routeTotalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {allRouteDocsUploaded && (
                  <button
                    onClick={() => setStep("payment")}
                    className="w-full btn-primary py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
                  >
                    To'lovga o'tish
                    <ArrowRight size={18} />
                  </button>
                )}

                <button
                  onClick={() => setStep("selectServices")}
                  className="w-full bg-muted py-3 rounded-2xl font-semibold text-foreground"
                >
                  Ortga
                </button>
              </div>
            )}

            {/* Payment for Route */}
            {step === "payment" && (
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-4 shadow-card">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Buyurtma ma'lumoti</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Yo'nalish</p>
                      <p className="font-semibold text-foreground">{startCity} → {endCity}</p>
                    </div>
                    <div className="border-t border-muted pt-3">
                      <p className="text-xs text-muted-foreground mb-2">Servislar</p>
                      <div className="space-y-2">
                        {routeSelectedServices.map((serviceId) => {
                          const service = SERVICES.find(s => s.id === serviceId);
                          return (
                            <div key={serviceId} className="flex items-center justify-between">
                              <span className="text-sm text-foreground">{service?.name}</span>
                              <span className="text-sm font-medium text-primary">{service?.price.toLocaleString()} TG</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="border-t border-muted pt-3">
                      <p className="text-xs text-muted-foreground mb-1">Checkpointlar</p>
                      <div className="space-y-1">
                        {selectedCheckpoints.map((index) => (
                          <p key={index} className="text-sm text-foreground">
                            {CHECKPOINTS[index]} - {selectedBorderPosts[index]}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wallet Section */}
                <div className={`rounded-2xl p-4 mb-4 ${
                  walletBalance < routeTotalPrice
                    ? "bg-warning/10 border border-warning"
                    : "bg-success/10 border border-success"
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">TG daftar</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mavjud: {walletBalance.toLocaleString()} TG
                      </p>
                      {walletBalance < routeTotalPrice && (
                        <p className="text-xs text-warning mt-2">
                          ⚠️ Yetarli mablag' yo'q. To'lov kutilmoqda statusida buyurtma yaratiladi.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/orders");
                  }}
                  className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 ${
                    routeTotalPrice <= walletBalance
                      ? "btn-primary"
                      : "bg-warning text-warning-foreground"
                  }`}
                >
                  <Wallet size={18} />
                  {routeTotalPrice <= walletBalance ? "TG bilan To'lash" : "To'lov Kutilmoqda"}
                </button>

                <button
                  onClick={() => setStep("uploadDocs")}
                  className="w-full bg-muted py-3 rounded-2xl font-semibold text-foreground"
                >
                  Ortga
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </MobileShell>
  );
};

export default RoutesScreen;