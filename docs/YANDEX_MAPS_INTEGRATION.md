# Yandex Maps Integration - Real Checkpoint Routes

## 🎯 Overview

Professional Yandex Maps integration for visualizing **real Kazakhstan customs checkpoint routes** with geocoding, routing, and interactive markers.

## 📁 Files Created

1. **`src/components/YandexRouteMap.tsx`** - Main map component
2. **`src/lib/checkpoints.ts`** - Checkpoint data and coordinates
3. **`src/screens/MapScreen.tsx`** - Updated to use Yandex Maps

## 🚀 Features

✅ **Real Checkpoint Data** - 20 actual Kazakhstan border crossings  
✅ **Automatic Geocoding** - Yandex API converts names to coordinates  
✅ **Smart Routing** - Draws real road routes between checkpoints  
✅ **Professional Markers** - Green (start), Red (end) with tooltips  
✅ **Auto-fit Bounds** - Map adjusts to show full route  
✅ **Error Handling** - Graceful fallbacks and loading states  
✅ **TypeScript** - Fully typed for safety  
✅ **Responsive** - Works on mobile and desktop

## 🔧 Setup

### 1. Get Yandex Maps API Key

1. Go to https://developer.tech.yandex.ru/
2. Create an account / login
3. Create a new API key for Maps JS API
4. Copy your API key

### 2. Add API Key to Component

In `src/screens/MapScreen.tsx`:

```tsx
<YandexRouteMap 
  routeIndex={0} 
  apiKey="YOUR_YANDEX_MAPS_API_KEY_HERE" 
/>
```

### 3. Optional: Environment Variable

Create `.env` file:
```
VITE_YANDEX_MAPS_API_KEY=your_api_key_here
```

Then use it:
```tsx
<YandexRouteMap 
  routeIndex={0} 
  apiKey={import.meta.env.VITE_YANDEX_MAPS_API_KEY} 
/>
```

## 📊 Available Routes

The component supports 20 real checkpoint routes (see `src/lib/checkpoints.ts`):

- **Route 0:** Baxti → Pokitu (Kazakhstan-Kyrgyzstan)
- **Route 1:** Dostyk → Alashankou (Kazakhstan-China, major rail)
- **Route 2:** Kaljat → Dulaty (Domestic)
- **Route 4:** Nur Joli → Xorgos (Kazakhstan-China)
- **Route 11:** Port Kuryk (Caspian Sea port)
- ... and 15 more

## 🎨 Customization

### Change Route

```tsx
<YandexRouteMap routeIndex={4} /> // Shows route 4: Nur Joli → Xorgos
```

### Styling

Colors defined in the component:
- Route line: `#1C74BC` (brand blue)
- Start marker: `#089F5A` (green)
- End marker: `#DC2626` (red)

### Adding More Checkpoints

Edit `src/lib/checkpoints.ts`:

```typescript
export const CHECKPOINT_ROUTES: CheckpointPair[] = [
  // ... existing routes
  { 
    id: 'route-21', 
    start: 'New Checkpoint, Kazakhstan', 
    end: 'Border Point, Country',
    description: 'Description here'
  },
];
```

## 🔄 Dynamic Routes from Backend

To fetch routes from an API:

```tsx
const [routes, setRoutes] = useState([]);

useEffect(() => {
  fetch('/api/routes')
    .then(res => res.json())
    .then(data => setRoutes(data));
}, []);

// Pass to map component with custom logic
```

## 🎯 Map Controls

The map includes:
- **Zoom** - +/- buttons
- **Fullscreen** - Expand to full screen
- **Geolocation** - Center on user location
- **Type selector** - Map/Satellite/Hybrid views

## 📱 Mobile Optimization

The component is fully responsive:
- Touch-friendly controls
- Optimized for 430px mobile frame
- Smooth panning and zooming

## 🐛 Troubleshooting

### Map doesn't load
- Check API key is valid
- Check network connection
- Open browser console for errors

### Checkpoints not found
- Geocoding may fail for some names
- Add coordinates to `KNOWN_COORDINATES` in `checkpoints.ts`

### Route not showing
- Yandex routing may not find path between distant points
- Try adding intermediate waypoints

## 💡 Production Tips

1. **Add API key to environment variables** - Never commit keys to git
2. **Rate limiting** - Cache geocoded coordinates
3. **Error boundaries** - Wrap component in error boundary
4. **Loading states** - Component already handles this
5. **Offline support** - Add fallback static map

## 🔗 Resources

- [Yandex Maps JS API Docs](https://tech.yandex.ru/maps/jsapi/)
- [Geocoding API](https://tech.yandex.ru/maps/geocoder/)
- [Routing API](https://tech.yandex.ru/maps/router/)

---

**Status:** ✅ Production-ready  
**Last Updated:** February 3, 2026  
**Author:** Senior Frontend Engineer
