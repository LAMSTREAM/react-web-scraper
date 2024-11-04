import React from 'react';

import AppSideBar from "@/components/appSideBar";
import Header from "@/components/header";
import Main from "@/components/main";
import {SidebarProvider} from "@/components/ui/sidebar";
import {useIsMobile} from "@/hooks/use-mobile";
import {useSyncUserAndWebsites} from "@/hooks/use-sync-user-and-websites";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainWithWebsite from "@/components/mainWithWebsite";
import NotFoundPage from "@/components/notFound";

function App() {
  useSyncUserAndWebsites()
  const isMobile = useIsMobile()

  return (
    <Router>
      <div className="flex relative w-screen h-screen overflow-hidden z-0 transition-colors">
        <SidebarProvider defaultOpen={!isMobile}>
          {/* Sidebar */}
          <AppSideBar
            headerClassName={`h-[--header-height]`}
            footerClassName={`h-[--footer-height]`}
          />

          {/* Main content */}
          <div className={"w-full h-full"}>
            <Header className={`h-[--header-height]`}/>
            <Routes>
              <Route path={`/`} element={<Main/>} />
              <Route path={`/website/:id`} element={<MainWithWebsite />}/>
              <Route path={`/*`} element={<NotFoundPage />}/>
            </Routes>
          </div>
        </SidebarProvider>
      </div>
    </Router>
  );
}

export default App;
