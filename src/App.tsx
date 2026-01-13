import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Dashboard Components
import ProtectedRoute from "./components/dashboard/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import FarmsPage from "./pages/dashboard/FarmsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import PlaceholderPage from "./pages/dashboard/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="farms" element={<FarmsPage />} />
              <Route path="fields" element={<PlaceholderPage title="Fields" description="Visual field mapping and management" />} />
              <Route path="disease-detection" element={<PlaceholderPage title="Disease Detection" description="AI-powered cassava leaf disease detection" />} />
              <Route path="soil" element={<PlaceholderPage title="Soil Health" description="Monitor NPK, pH, and soil composition" />} />
              <Route path="ai-insights" element={<PlaceholderPage title="Crop Intelligence" description="AI-powered predictive analytics" />} />
              <Route path="weather" element={<PlaceholderPage title="Weather" description="Microclimate insights and forecasts" />} />
              <Route path="inventory" element={<PlaceholderPage title="Inventory" description="Stock management and tracking" />} />
              <Route path="scouting" element={<PlaceholderPage title="Scouting" description="Photo-based field evidence" />} />
              <Route path="reports" element={<PlaceholderPage title="Reports" description="Seasonal reporting and compliance" />} />
              <Route path="assistant" element={<PlaceholderPage title="AI Assistant" description="Expert agricultural advice" />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
