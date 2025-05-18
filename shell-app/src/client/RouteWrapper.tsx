// RouteWrapper.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

interface RouterWrapperProps {
  children: React.ReactNode;
  location?: string; // only for SSR, URL path
  context?: object; // only for SSR
}

const RouterWrapper: React.FC<RouterWrapperProps> = ({
  children,
  location,
  context,
}) => {
  if (typeof window === "undefined") {
    // Server-side rendering: use StaticRouter with location from request
    return <StaticRouter location={location ?? "/"}>{children}</StaticRouter>;
  } else {
    // Client-side rendering: use BrowserRouter
    return <BrowserRouter>{children}</BrowserRouter>;
  }
};

export default RouterWrapper;
