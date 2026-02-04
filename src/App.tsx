import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GarageScreen from "./screens/GarageScreen";
import HomeScreen from "./screens/HomeScreen";
import RoutesScreen from "./screens/RoutesScreen";
import RouteDetailScreen from "./screens/RouteDetailScreen";
import OrdersScreen from "./screens/OrdersScreen";
import PaymentsScreen from "./screens/PaymentsScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import TuranIdScreen from "./screens/TuranIdScreen";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import DocumentsScreen from "./screens/DocumentsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import SupportScreen from "./screens/SupportScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="app-wrapper">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<GarageScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/routes" element={<RoutesScreen />} />
            <Route path="/routes/:id" element={<RouteDetailScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="/payments" element={<PaymentsScreen />} />
            <Route path="/messages" element={<MessagesScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/personal" element={<PersonalInfoScreen />} />
            <Route path="/profile/turan-id" element={<TuranIdScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/documents" element={<DocumentsScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/support" element={<SupportScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;