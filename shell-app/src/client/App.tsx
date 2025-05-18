import { useEffect, useState, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
import withErrorBoundary from "./components/ErrorBoundary";
import BrokenComponent from "./components/BrokenComponent";
import Welcome from "./components/Welcome";
import "../styles/global.css";
import "../utils";

const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

// Disable SSR explicitly for loadable remote apps
const App1 = loadable(() => import("app1/App"), {
  ssr: false,
  fallback: <LoadingFallback />,
});

const App2 = loadable(() => import("app2/App"), {
  ssr: false,
  fallback: <LoadingFallback />,
});

const App = () => {
  return (
    <div className="app-wrapper">
      <nav className="main-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <h1>Shell App [Server Side Rendering]</h1>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/app1" className="nav-link">
              Remote App - 1
            </Link>
            <Link to="/app2" className="nav-link">
              Remote App - 2
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            {<Route path="/app1/*" element={<App1 />} />}
            {<Route path="/app2/*" element={<App2 />} />}
            <Route path="/testErrorBoundry" element={<BrokenComponent />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default withErrorBoundary(App);
