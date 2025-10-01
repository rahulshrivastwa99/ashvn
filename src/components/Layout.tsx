import React, { useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import Sidebar from "./Sidebar";
import NowPlayingBar from "./NowPlayingBar";
import { useTheme } from "../contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const sidebarWidth = "16rem";

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <div className="lg:hidden shadow-sm sticky top-0 z-30 px-4 py-3" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <Menu className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
            </button>
            <h1 className="text-lg font-semibold text-teal-600">Ashvaan</h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Sun className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
          </div>
        </div>

        <main className="p-6">{children}</main>
      </div>
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
