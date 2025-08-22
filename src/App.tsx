import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Generator from "./pages/generator";
import Motivation from "./pages/motivation";
import Chatbot from "./pages/chatbot";
import Guidance from "./pages/Guidance";
import Roadmap from "./pages/Roadmap";
import Dashboard1 from "./pages/Dashboard1";
import Contact from "./pages/Contact";
import { TestGenerator } from "./components/TestGenerator";
import Summary from "./pages/Summary";
import Forum from "./pages/Forum";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/layout/AppSidebar";
import { ThemeToggle } from "./components/layout/ThemeToggle";
const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen hero-gradient flex items-center justify-center">
  //       <div className="text-center space-y-4">
  //         <div className="w-16 h-16 mx-auto animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
  //         <p className="text-white text-lg">Loading StudyGine...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
         <SidebarProvider>
            <div className="min-h-screen flex w-full neural-lines">
              <AppSidebar />
              <main className="flex-1 relative">
                
                <div className="absolute top-6 right-6 z-40">
                  {/* <ThemeToggle /> */}
                </div>
          <Routes>
            <Route path="/" element={user ? <Dashboard1 /> : <Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Auth />} /> 
            <Route path="/generator" element={user ? <Generator /> : <Auth />} />
            <Route path="/Motivation" element={user ? <Motivation /> : <Auth />} />
            <Route path="/*" element={<Dashboard1 />} />
            <Route path="/Chatbot" element={user ? <Chatbot /> : <Auth />} />
            <Route path="/Guidance" element={user ? <Guidance /> : <Auth />} />
            <Route path="/Roadmap" element={user ? <Roadmap /> : <Auth />} />
            <Route path="/Summary" element={user ? <Summary /> : <Auth />} />
            <Route path="/Contact" element={user ? <Contact /> : <Auth />} />
            <Route path="/TestGenerator" element={user ? <TestGenerator /> : <Auth />} />
            <Route path="/Forum" element={user ? <Forum /> : <Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
              </main>
            </div>
          </SidebarProvider>

        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
