import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import App from "@/pages/home.tsx";
import store from "@/redux/store";
import ReloadPrompt from "@/components/reloadPrompt";

import "@/styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import GamesPage from "./pages/games";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReloadPrompt />

    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/games" element={<GamesPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
