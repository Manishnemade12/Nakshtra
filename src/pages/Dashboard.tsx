// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { ChatBot } from "@/components/layout/ChatBot";
// import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { AppSidebar } from "@/components/layout/AppSidebar";
// import { ThemeProvider } from "@/contexts/ThemeContext";
// import Dashboard1 from "./Dashboard1";
// import Chat from "./Chat";
// import Stats from "./Stats";
// import Games from "./Games";
// import Courses from "./Courses";
// import FaceDetection from "./FaceDetection";
// import Meditation from "./Meditation";
// import Quiz from "./Quiz";
// import Motivation from "./Motivation1";
// import NotFound from "./NotFound";

// const queryClient = new QueryClient();

// const Dashboard = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <SidebarProvider>
//             <div className="min-h-screen flex w-full neural-lines">
//               <AppSidebar />
//               <main className="flex-1 relative">
//                 {/* Theme Toggle */}
//                 <div className="absolute top-6 right-6 z-40">
//                   <ThemeToggle />
//                 </div>
                
//                 <Routes>
//                   <Route path="/" element={<Dashboard1 />} />
//                   <Route path="/chat" element={<Chat />} />
//                   <Route path="/stats" element={<Stats />} />
//                   <Route path="/games" element={<Games />} />
//                   <Route path="/courses" element={<Courses />} />
//                   <Route path="/face-detection" element={<FaceDetection />} />
//                   <Route path="/meditation" element={<Meditation />} />
//                   <Route path="/quiz" element={<Quiz />} />
//                   <Route path="/motivation" element={<Motivation />} />
//                   <Route path="*" element={<NotFound />} />
//                 </Routes>
                
//                 {/* Floating ChatBot */}
//                 <ChatBot />
//               </main>
//             </div>
//           </SidebarProvider>
//         </BrowserRouter>
//       </TooltipProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default Dashboard;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatBot } from "@/components/layout/ChatBot";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Routes, Route } from "react-router-dom";   // ✅ BrowserRouter hata diya

import Dashboard1 from "./Dashboard1";
import Chat from "./Chat";
import Stats from "./Stats";
import Games from "./Games";
import Courses from "./Courses";
import FaceDetection from "./FaceDetection";
import Meditation from "./Meditation";
import Quiz from "./Quiz";
import Motivation from "./Motivation1";
import NotFound from "./NotFound";

const queryClient = new QueryClient();

const Dashboard = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <div className="min-h-screen flex w-full neural-lines">
            <AppSidebar />
            <main className="flex-1 relative">
              {/* Theme Toggle */}
              <div className="absolute top-6 right-6 z-40">
                <ThemeToggle />
              </div>
              
              <Routes>
                <Route path="/" element={<Dashboard1 />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/games" element={<Games />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/face-detection" element={<FaceDetection />} />
                <Route path="/meditation" element={<Meditation />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/motivation" element={<Motivation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Floating ChatBot */}
              <ChatBot />
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default Dashboard;
