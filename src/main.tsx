import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";

import App from "@/pages/home.tsx";
import store from "@/redux/store";
import ReloadPrompt from "@/components/reloadPrompt";

import "@/styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";

const GamesPage = lazy(() => import("./pages/games"));
const Flappy = lazy(() => import("./pages/games/flappy"));
const LineOff = lazy(() => import("./pages/games/lineoff"));
const TwentyFortyEight = lazy(() => import("./pages/games/2048"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <>
    <ReloadPrompt />

    <Provider store={store}>
      <Suspense fallback={"loading"}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/flappy" element={<Flappy />} />
            <Route path="/games/lineoff" element={<LineOff />} />
            <Route path="/games/2048" element={<TwentyFortyEight />} />
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  </>,
  // </React.StrictMode>,
);
