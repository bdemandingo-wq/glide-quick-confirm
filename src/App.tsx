import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";

// Lazy load non-critical routes
const BookingForm = lazy(() => import("./pages/BookingForm"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const CustomerPortal = lazy(() => import("./pages/CustomerPortal"));
const CleanerApplication = lazy(() => import("./pages/CleanerApplication"));
const NotFound = lazy(() => import("./pages/NotFound"));

// County landing pages
const BrowardCountyCleaning = lazy(() => import("./pages/BrowardCountyCleaning"));
const MiamiDadeCleaning = lazy(() => import("./pages/MiamiDadeCleaning"));
const PalmBeachCountyCleaning = lazy(() => import("./pages/PalmBeachCountyCleaning"));

// Blog posts
const BrowardCostGuide = lazy(() => import("./pages/blog/BrowardCostGuide"));
const MiamiPermitRules = lazy(() => import("./pages/blog/MiamiPermitRules"));
const PalmBeachSeasonalDiscounts = lazy(() => import("./pages/blog/PalmBeachSeasonalDiscounts"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/booking" element={<BookingForm />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/my-bookings" element={<CustomerPortal />} />
                <Route path="/apply" element={<CleanerApplication />} />
                
                {/* County Landing Pages */}
                <Route path="/broward-county-cleaning" element={<BrowardCountyCleaning />} />
                <Route path="/miami-dade-cleaning" element={<MiamiDadeCleaning />} />
                <Route path="/palm-beach-county-cleaning" element={<PalmBeachCountyCleaning />} />
                
                {/* Blog Posts */}
                <Route path="/blog/broward-cost-guide" element={<BrowardCostGuide />} />
                <Route path="/blog/miami-permit-rules" element={<MiamiPermitRules />} />
                <Route path="/blog/palm-beach-seasonal-discounts" element={<PalmBeachSeasonalDiscounts />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;