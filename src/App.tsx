import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import FirmDashboard from "./pages/FirmDashboard";
import CorporateDashboard from "./pages/CorporateDashboard";
import AdminPanel from "./pages/AdminPanel";
import Marketplace from "./pages/Marketplace";
import RewardsShop from "./pages/RewardsShop";
import NotFound from "./pages/NotFound";
import ChatbotWidget from "./components/home/ChatbotWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/firm-dashboard" element={<FirmDashboard />} />
            <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/rewards" element={<RewardsShop />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
