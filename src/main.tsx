import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "@/pages/app.tsx";
import store from "@/redux/store";
import ReloadPrompt from "@/components/reloadPrompt";

import "@/styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReloadPrompt />

    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
