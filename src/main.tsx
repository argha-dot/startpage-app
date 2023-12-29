// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import App from "@/pages/home.tsx";
import store from "@/redux/store";
import ReloadPrompt from "@/components/reloadPrompt";

import "@/styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import GamesPage from "./pages/games";
import TwoZero48 from "./pages/games/2048";
import Flappy from "./pages/games/flappy";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <>
    <ReloadPrompt />

    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/2048" element={<TwoZero48 />} />
          <Route path="/games/flappy" element={<Flappy />} />
        </Routes>
      </Router>
    </Provider>
  </>,
  // </React.StrictMode>,
);
