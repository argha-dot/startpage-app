import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages/app.tsx";
import "@/styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import ReloadPrompt from "@/components/reloadPrompt";
import { Provider } from "react-redux";
import store from "@/redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReloadPrompt />

    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
