
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandKitProvider } from "./components/branding/BrandKit";
import { LayoutWrapper } from "./components/layout/LayoutWrapper";
import Index from "./pages/Index";
import Timeline from "./pages/Timeline";
import Agents from "./pages/Agents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandKitProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/agents" element={<Agents />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </BrandKitProvider>
  </QueryClientProvider>
);

export default App;
