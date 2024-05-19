import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./auth/UserContext";
import { LifeProvider } from "./SustainableLife/LifeContext/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <UserProvider>
        <LifeProvider>
          <App />
        </LifeProvider>
      </UserProvider>
    </CookiesProvider>
  </React.StrictMode>
);
