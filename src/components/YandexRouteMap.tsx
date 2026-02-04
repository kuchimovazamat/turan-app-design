import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CHECKPOINT_ROUTES, KNOWN_COORDINATES } from '@/lib/checkpoints';

interface YandexRouteMapProps {
  routeIndex?: number; // Which route from the list to display
  apiKey?: string;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexRouteMap = ({ routeIndex = 0, apiKey = '' }: YandexRouteMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load Yandex Maps script
    const loadYandexMaps = () => {
      if (window.ymaps) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      script.onerror = () => {
        setError('Failed to load Yandex Maps');
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        // Get route data
        const route = CHECKPOINT_ROUTES[routeIndex] || CHECKPOINT_ROUTES[0];
        
        // Initialize map centered on Kazakhstan
        const map = new window.ymaps.Map(mapRef.current, {
          center: [48.0196, 66.9237], // Kazakhstan center
          zoom: 6,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl', 'typeSelector'],
        });

        mapInstanceRef.current = map;

        // Geocode point with fallback to known coordinates
        const geocodePoint = async (address: string): Promise<[number, number] | null> => {
          // Check if we have predefined coordinates
          if (KNOWN_COORDINATES[address]) {
            return KNOWN_COORDINATES[address];
          }

          try {
            const result = await window.ymaps.geocode(address, { results: 1 });
            const firstGeoObject = result.geoObjects.get(0);
            if (firstGeoObject) {
              return firstGeoObject.geometry.getCoordinates();
            }
          } catch (err) {
            console.error(`Failed to geocode ${address}:`, err);
          }
          return null;
        };

        const startCoords = await geocodePoint(route.start);
        const endCoords = await geocodePoint(route.end);

        if (!startCoords || !endCoords) {
          setError('Could not find checkpoint locations');
          setLoading(false);
          return;
        }

        // Create multi-route with professional styling
        const multiRoute = new window.ymaps.multiRouter.MultiRoute(
          {
            referencePoints: [startCoords, endCoords],
            params: {
              routingMode: 'auto',
              avoidTrafficJams: false,
            },
          },
          {
            boundsAutoApply: true,
            wayPointStartIconColor: '#089F5A',
            wayPointStartIconFillColor: '#089F5A',
            wayPointFinishIconColor: '#DC2626',
            wayPointFinishIconFillColor: '#DC2626',
            routeActiveStrokeWidth: 6,
            routeActiveStrokeColor: '#1C74BC',
            routeActiveStrokeStyle: 'solid',
          }
        );

        map.geoObjects.add(multiRoute);

        // Add start marker with custom styling
        const startPlacemark = new window.ymaps.Placemark(
          startCoords,
          {
            balloonContentHeader: `<strong>${route.start}</strong>`,
            balloonContentBody: route.description || 'Start checkpoint',
            balloonContentFooter: 'Entry point',
            iconCaption: route.start.split(',')[0],
          },
          {
            preset: 'islands#greenDotIconWithCaption',
            iconCaptionMaxWidth: '200',
          }
        );

        // Add end marker with custom styling
        const endPlacemark = new window.ymaps.Placemark(
          endCoords,
          {
            balloonContentHeader: `<strong>${route.end}</strong>`,
            balloonContentBody: route.description || 'End checkpoint',
            balloonContentFooter: 'Exit point',
            iconCaption: route.end.split(',')[0],
          },
          {
            preset: 'islands#redDotIconWithCaption',
            iconCaptionMaxWidth: '200',
          }
        );

        map.geoObjects.add(startPlacemark);
        map.geoObjects.add(endPlacemark);

        // Auto-fit bounds to show both points
        const bounds = map.geoObjects.getBounds();
        if (bounds) {
          map.setBounds(bounds, {
            checkZoomRange: true,
            zoomMargin: 50,
          });
        }

        setLoading(false);
      } catch (err) {
        console.error('Map initialization error:', err);
        setError('Failed to initialize map');
        setLoading(false);
      }
    };

    loadYandexMaps();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [routeIndex, apiKey]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading route...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-sm">
            <p className="text-sm text-destructive font-medium">{error}</p>
            <p className="text-xs text-muted-foreground mt-1">Check your API key or network connection</p>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default YandexRouteMap;
