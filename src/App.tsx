
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandKitProvider } from "./components/branding/BrandKit";
import { LayoutWrapper } from "./components/layout/LayoutWrapper";
import Landing from "./pages/Landing";
import Console from "./pages/Console";
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
          <Routes>
            {/* Public landing page */}
            <Route path="/" element={<Landing />} />
            
            {/* Internal dashboard routes with sidebar */}
            <Route path="/console" element={<LayoutWrapper><Console /></LayoutWrapper>} />
            <Route path="/agents" element={<LayoutWrapper><Agents /></LayoutWrapper>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BrandKitProvider>
  </QueryClientProvider>
);

export default App;
