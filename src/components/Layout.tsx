import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import NowPlayingBar from "./NowPlayingBar"; // Import the music bar component

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = "16rem"; // Corresponds to lg:pl-64 in Tailwind CSS

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {" "}
      {/* Add 'relative' for positioning the music bar */}
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-teal-600">Ashvaan</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
      {/* Fixed Music Bar */}
      <div
        className="fixed bottom-0 z-10 hidden lg:block"
        style={{
          left: sidebarWidth,
          width: `calc(100% - ${sidebarWidth})`,
        }}
      >
        <NowPlayingBar />
      </div>
    </div>
  );
}
