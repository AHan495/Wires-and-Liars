import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import "./styles/global.css";
import { AuthProvider } from "./auth/AuthContext.jsx";
import App from "./App.jsx";

Sentry.init({
  dsn: "https://ee0433dba04968e0445c9671b7b4f18e@o4511779530342400.ingest.us.sentry.io/4511779537420288",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: []
  },
  integrations: [Sentry.browserTracingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost:3000",
    /^https:\/\/api\.wiresandliars\.austinh\.app/,
  ],
  // Enable logs to be sent to Sentry
  enableLogs: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
