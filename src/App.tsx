import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Games from "./pages/Games";

const queryClient = new QueryClient();

const AppContent = ({ user }: { user: User | null }) => {
  const location = useLocation();

  // Sidebar sirf un routes pe dikhega jaha allowed hai
  const hideSidebarRoutes = ["/", "/auth"]; // 👈 yaha jis route pe sidebar nahi chahiye vo add karo
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowSidebar ? (
        <SidebarProvider>
          <div className="min-h-screen flex w-full neural-lines">
            <AppSidebar />
            <main className="flex-1 relative">
              <div className="absolute top-6 right-6 z-40">
                {/* <ThemeToggle /> */}
              </div>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={user ? <Dashboard1 /> : <Index />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Auth />} />
                <Route path="/generator" element={user ? <Generator /> : <Auth />} />
                <Route path="/Motivation" element={user ? <Motivation /> : <Auth />} />
                <Route path="/Chatbot" element={user ? <Chatbot /> : <Auth />} />
                <Route path="/Guidance" element={user ? <Guidance /> : <Auth />} />
                <Route path="/Roadmap" element={user ? <Roadmap /> : <Auth />} />
                <Route path="/Summary" element={user ? <Summary /> : <Auth />} />
                <Route path="/Contact" element={user ? <Contact /> : <Auth />} />
                <Route path="/TestGenerator" element={user ? <TestGenerator /> : <Auth />} />
                <Route path="/Forum" element={user ? <Forum /> : <Auth />} />
                <Route path="/Games" element={user ? <Games /> : <Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={user ? <Dashboard /> : <Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent user={user} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
