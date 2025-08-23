import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  MessageCircle,
  TrendingUp,
  Gamepad2,
  BookOpen,
  ScanFace,
  Brain,
  HelpCircle,
  Zap,
  Menu,
  X
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Responsive hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const navigationItems = [
  { 
    title: "Peronalised Learning", 
    url: "/Roadmap", 
    icon: BarChart3,
    gradient: "from-primary to-secondary-purple"
  },
  { 
    title: "AI POwered Insights", 
    url: "/Guidance", 
    icon: TrendingUp,
    gradient: "from-accent-teal to-primary"
  },
  { 
    title: "personalize study tips", 
    url: "/Motivation", 
    icon: Gamepad2,
    gradient: "from-primary to-accent-teal"
  },
  // { 
  //   title: "AI Sumarizer", 
  //   url: "/generator", 
  //   icon: BookOpen,
  //   gradient: "from-secondary-purple to-primary"
  // },
  // { 
  //   title: "Face Detection", 
  //   url: "/face-detection", 
  //   icon: ScanFace,
  //   gradient: "from-accent-teal to-secondary-purple"
  // },
  { 
    title: "Community Forum", 
    url: "/Forum", 
    icon: Brain,
    gradient: "from-primary to-accent-teal"
  },


  { 
    title: "TestGenerator", 
    url: "/TestGenerator", 
    icon: HelpCircle,
    gradient: "from-secondary-purple to-accent-teal"
  },
      { 
    title: "Summrizer", 
    url: "/Summary", 
    icon: MessageCircle,
    gradient: "from-secondary-purple to-accent-teal"
  },

    { 
    title: "Games", 
    url: "/Games", 
    icon: Zap,
    gradient: "from-accent-teal to-primary"
  },
    { 
    title: "courses", 
    url: "/courses", 
    icon: BookOpen,
    gradient: "from-accent-teal to-primary"
  },
   { 
    title: "Contact Us", 
    url: "/contact", 
    icon: ScanFace,
    gradient: "from-accent-teal to-primary"
  },
  
];

export function AppSidebar() {
  const { state, toggleSidebar, openMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const isMobile = useIsMobile();

  const isActive = (path: string) => currentPath === path;
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `relative overflow-hidden group smooth-transition ${
      isActive 
        ? "bg-gradient-to-r from-primary/20 to-secondary-purple/20 text-primary shadow-lg neural-glow" 
        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    }`;

  // Hamburger menu for mobile
  const Hamburger = (
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 shadow-lg"
      onClick={() => setOpenMobile(true)}
      aria-label="Open sidebar"
    >
      <Menu className="w-6 h-6 text-primary" />
    </button>
  );

  // Overlay for mobile sidebar
  const MobileSidebar = (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${openMobile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpenMobile(false)}
      />
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: openMobile ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 z-50 h-full w-64 bg-background shadow-2xl border-r border-sidebar-border"
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-poppins bg-gradient-to-r from-primary to-secondary-purple bg-clip-text text-transparent">
                BrainBin
              </h1>
              <p className="text-xs text-muted-foreground">AI Learning Hub</p>
            </div>
          </div>
          <button
            onClick={() => setOpenMobile(false)}
            className="p-2 rounded-lg hover:bg-sidebar-accent smooth-transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarGroupLabel className={`font-poppins text-muted-foreground`}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end={item.url === '/'}
                        className={getNavCls}
                        onClick={() => setOpenMobile(false)}
                      >
                        {({ isActive }) => (
                          <>
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} ${
                              isActive ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'
                            } smooth-transition`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-medium font-inter">{item.title}</span>
                            {isActive && (
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-accent-teal rounded-l-full" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </motion.div>
    </>
  );

  return (
    <>
      {isMobile && Hamburger}
      {isMobile && MobileSidebar}
      {!isMobile && (
        <motion.div
          initial={false}
          animate={{ 
            width: collapsed ? 80 : 280,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="relative"
        >
          <Sidebar
            className={`glass-strong border-r border-sidebar-border neural-lines ${
              collapsed ? "w-20" : "w-70"
            }`}
            collapsible="icon"
          >
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold font-poppins bg-gradient-to-r from-primary to-secondary-purple bg-clip-text text-transparent">
                        BrainBin
                      </h1>
                      <p className="text-xs text-muted-foreground">AI Learning Hub</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-sidebar-accent smooth-transition"
              >
                {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </button>
            </div>
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupLabel className={`${collapsed ? 'sr-only' : ''} font-poppins text-muted-foreground`}>
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            end={item.url === '/'}
                            className={getNavCls}
                          >
                            {({ isActive }) => (
                              <>
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} ${
                                  isActive ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'
                                } smooth-transition`}>
                                  <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <AnimatePresence>
                                  {!collapsed && (
                                    <motion.span
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                      transition={{ duration: 0.2 }}
                                      className="font-medium font-inter"
                                    >
                                      {item.title}
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-accent-teal rounded-l-full"
                                    transition={{ type: "spring", duration: 0.6 }}
                                  />
                                )}
                              </>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </motion.div>
      )}
    </>
  );
}
