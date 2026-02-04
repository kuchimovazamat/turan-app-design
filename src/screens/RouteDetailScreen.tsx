import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileCheck, FileX, MapPin, Clock, Navigation, ChevronLeft } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";

const routesData = [
  {
    id: 1,
    from: "Dostyk",
    to: "Alashankou",
    distance: "487 km",
    distanceLeft: "342 km",
    status: "active",
    date: "25 Yanvar",
    documents: 3,
    documentsApproved: 2,
    progress: 70,
    vehicle: "01 A 123 AA",
    requiredDocuments: [
      { name: "Gumruk deklaratsiyasi", approved: true },
      { name: "Transport litsenziyasi", approved: true },
      { name: "Sug'urta sertifikati", approved: false },
    ],
    coordinates: {
      start: [48.2206, 51.1801],
      end: [42.9167, 84.6461],
      waypoints: [
        [48.4761, 57.1602],
        [45.5, 67.1],
        [43.6, 76.9],
      ]
    }
  },
  {
    id: 2,
    from: "Nur Joli",
    to: "Xorgos",
    distance: "654 km",
    distanceLeft: "654 km",
    status: "pending",
    date: "28 Yanvar",
    documents: 5,
    documentsApproved: 0,
    progress: 0,
    vehicle: "30 B 456 BB",
    requiredDocuments: [
      { name: "Gumruk deklaratsiyasi", approved: false },
      { name: "Transport litsenziyasi", approved: false },
      { name: "Sug'urta sertifikati", approved: false },
      { name: "Yo'l xavfsizligi sertifikati", approved: false },
      { name: "CMR vositasi", approved: false },
    ],
    coordinates: {
      start: [51.0278, 70.5031],
      end: [43.4389, 80.4308],
      waypoints: [
        [49.5, 72.8],
        [46.8, 75.2],
        [44.5, 77.5],
      ]
    }
  },
  {
    id: 3,
    from: "Atameken",
    to: "Guliston",
    distance: "412 km",
    distanceLeft: "0 km",
    status: "completed",
    date: "20 Yanvar",
    documents: 4,
    documentsApproved: 4,
    progress: 100,
    vehicle: "01 A 123 AA",
    requiredDocuments: [
      { name: "Gumruk deklaratsiyasi", approved: true },
      { name: "Transport litsenziyasi", approved: true },
      { name: "Sug'urta sertifikati", approved: true },
      { name: "Yo'l xavfsizligi sertifikati", approved: true },
    ],
    coordinates: {
      start: [45.9667, 67.1917],
      end: [40.5, 71.1633],
      waypoints: [
        [44.8, 68.5],
        [42.5, 69.8],
      ]
    }
  },
  {
    id: 4,
    from: "Qorday",
    to: "Oq-Jol",
    distance: "320 km",
    distanceLeft: "0 km",
    status: "completed",
    date: "18 Yanvar",
    documents: 3,
    documentsApproved: 3,
    progress: 100,
    vehicle: "30 B 456 BB",
    requiredDocuments: [
      { name: "Gumruk deklaratsiyasi", approved: true },
      { name: "Transport litsenziyasi", approved: true },
      { name: "Sug'urta sertifikati", approved: true },
    ],
    coordinates: {
      start: [44.8167, 67.5483],
      end: [42.75, 73.25],
      waypoints: [
        [43.8, 69.8],
        [43.2, 71.5],
      ]
    }
  },
  {
    id: 5,
    from: "Baxti",
    to: "Pokitu",
    distance: "215 km",
    distanceLeft: "0 km",
    status: "completed",
    date: "15 Yanvar",
    documents: 3,
    documentsApproved: 3,
    progress: 100,
    vehicle: "60 C 789 CC",
    requiredDocuments: [
      { name: "Gumruk deklaratsiyasi", approved: true },
      { name: "Transport litsenziyasi", approved: true },
      { name: "Sug'urta sertifikati", approved: true },
    ],
    coordinates: {
      start: [42.4, 65.8],
      end: [41.1, 74.1],
      waypoints: [
        [41.9, 69.2],
        [41.4, 71.8],
      ]
    }
  },
];

declare global {
  interface Window {
    ymaps: any;
  }
}

const RouteDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const route = routesData.find(r => r.id === parseInt(id || ""));

  useEffect(() => {
    // Load Yandex Maps
    if (!window.ymaps) {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=en_US&load=package.full";
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      script.onerror = () => {
        console.error("Failed to load Yandex Maps");
      };
      document.body.appendChild(script);
    } else {
      window.ymaps.ready(initMap);
    }
  }, []);

  const initMap = () => {
    if (!route || !window.ymaps) return;

    const mapContainer = document.getElementById("map-container");
    if (!mapContainer) return;

    const map = new window.ymaps.Map(mapContainer, {
      center: [
        (route.coordinates.start[0] + route.coordinates.end[0]) / 2,
        (route.coordinates.start[1] + route.coordinates.end[1]) / 2,
      ],
      zoom: 5,
      controls: ["zoomControl", "typeSelector"],
    });

    // Build complete route with all waypoints
    const allPoints = [
      route.coordinates.start,
      ...route.coordinates.waypoints,
      route.coordinates.end
    ];

    // Create MultiRoute for truck logistics routing
    const multiRoute = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: allPoints,
        params: {
          routingMode: 'truck', // Use truck routing mode for logistics
          avoidTrafficJams: false
        }
      },
      {
        boundsAutoApply: true,
        wayPointStartIconColor: '#10b981',
        wayPointStartIconFillColor: '#10b981',
        wayPointFinishIconColor: '#ef4444',
        wayPointFinishIconFillColor: '#ef4444',
        wayPointVisible: true,
        pinVisible: false,
        boundsAutoApplyMargin: 50,
        routeStrokeWidth: 8,
        routeStrokeColor: '#3b82f6',
        routeActiveStrokeWidth: 10,
        routeActiveStrokeColor: '#2563eb',
        opacity: 1.0,
      }
    );

    map.geoObjects.add(multiRoute);

    // Add custom start marker on top
    setTimeout(() => {
      const startMarker = new window.ymaps.Placemark(
        route.coordinates.start,
        { 
          balloonContent: `<strong>${route.from}</strong><br/>Boshlanish nuqtasi`,
          iconCaption: route.from
        },
        {
          preset: "islands#greenCircleDotIcon",
          iconColor: '#10b981',
          zIndex: 1500
        }
      );
      map.geoObjects.add(startMarker);

      // Add custom end marker on top
      const endMarker = new window.ymaps.Placemark(
        route.coordinates.end,
        { 
          balloonContent: `<strong>${route.to}</strong><br/>Tugash nuqtasi`,
          iconCaption: route.to
        },
        {
          preset: "islands#redCircleDotIcon",
          iconColor: '#ef4444',
          zIndex: 1500
        }
      );
      map.geoObjects.add(endMarker);
    }, 500);
  };

  if (!route) {
    return (
      <MobileShell>
        <div className="p-4 text-center text-muted-foreground">
          Yo'nalish topilmadi
        </div>
      </MobileShell>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary/10 text-primary";
      case "pending": return "bg-warning/10 text-warning";
      case "completed": return "bg-success/10 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Yo'lda";
      case "pending": return "Kutilmoqda";
      case "completed": return "Yakunlandi";
      default: return "Noma'lum";
    }
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader 
          title="Yo'nalish tafsiloti"
          showBack={true}
          onBack={() => navigate("/routes")}
        />

        {/* Route Header */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{route.date}</p>
              <h2 className="text-xl font-bold">{route.from} → {route.to}</h2>
            </div>
            <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusColor(route.status)}`}>
              {getStatusText(route.status)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Jami masofasi</p>
              <p className="font-bold">{route.distance}</p>
            </div>
            {route.status === "active" && (
              <div className="bg-secondary rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Qolgan</p>
                <p className="font-bold text-primary">{route.distanceLeft}</p>
              </div>
            )}
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Mashina</p>
              <p className="font-bold text-xs">{route.vehicle}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="px-4 py-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Marshrut xaritasi
          </h3>
          <div 
            id="map-container"
            className="w-full h-64 rounded-2xl bg-secondary border border-border overflow-hidden"
          />
        </div>

        {/* Progress */}
        {route.status === "active" && (
          <div className="px-4 pb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{route.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${route.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Required Documents */}
        <div className="px-4 pb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Zarur hujjatlar
          </h3>
          <div className="space-y-2.5">
            {route.requiredDocuments.map((doc, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
              >
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    doc.approved 
                      ? "bg-success/20 text-success" 
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {doc.approved ? (
                    <FileCheck size={16} />
                  ) : (
                    <FileX size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${doc.approved ? "text-foreground" : "text-muted-foreground"}`}>
                    {doc.name}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  doc.approved
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {doc.approved ? "Tasdiqlandi" : "Kutilmoqda"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default RouteDetailScreen;
