import App from "./App";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}

loadableReady(() => {
  hydrateRoot(
    container,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
