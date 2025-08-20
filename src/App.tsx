import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CartSidebar from "./components/cart/CartSidebar";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import AIScan from "./pages/AIScan";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/ai-scan" element={<AIScan />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <CartSidebar />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
