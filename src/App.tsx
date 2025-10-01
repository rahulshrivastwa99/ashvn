import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthGuard from "./components/AuthGuard";
import Router from "./components/Router";

// --- Step 2 Imports ---
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import NowPlayingBar from "./components/NowPlayingBar"; // You will create this in the next step

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {/* 1. Wrap your app with the MusicPlayerProvider */}
          <MusicPlayerProvider>
            {/* 2. Add a layout wrapper to position the page content and the player bar */}
            <div className="flex flex-col h-screen bg-gray-100">
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

              {/* 3. Place the NowPlayingBar at the bottom, outside of the router */}
              <NowPlayingBar />
            </div>
          </MusicPlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
