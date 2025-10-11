import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthGuard from "./components/AuthGuard";
import Router from "./components/Router";

// --- Step 2 Imports ---
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import NowPlayingBar from "./components/NowPlayingBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MusicPlayerProvider>
            {/* KEY CHANGE: 
              1. Removed hardcoded 'bg-gray-100' so the theme class on the <html> element 
                 (which your ThemeProvider handles) can control the background via CSS variables.
              2. Added 'app-container' for global theme-based styling via CSS.
            */}
            <div className="flex flex-col h-screen app-container">
              {/* This container will hold your pages and allow them to scroll */}
              <div className="flex-1 overflow-y-auto">
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <AuthGuard>
                  <Router />
                </AuthGuard>
              </div>

              {/* Place the NowPlayingBar at the bottom */}
              <NowPlayingBar />
            </div>
          </MusicPlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
