import path from "path";
import fs from "fs";
import express, { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import './purge-cloudflare';
import App from "../client/App";
const PORT = process.env.PORT || 3010; // Changed to 3001 to avoid conflict with webpack dev server
const app = express();

const statsFile = path.resolve("./dist/client/loadable-stats.json");

app.get("/api/items", (_req: Request, res: Response) => {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));
  res.json(items);
});


// Serve static files from the client build directory
app.use((req, res, next) => {
  if (req.path.endsWith(".js") || req.path.endsWith(".css") || req.path.startsWith("/static") || req.path.includes("loadable-stats")) {
    express.static(path.resolve(__dirname, "../../dist/client"))(req, res, next);
  } else {
    next(); // Allow SSR to handle it
  }
});

app.get("*", (req: Request, res: Response) => {
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["shell"] });

  const jsx = extractor.collectChunks(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const appHtml = renderToString(jsx);
  const scriptTags = extractor.getScriptTags();

  const indexFile = path.resolve(__dirname, "../../dist/client/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html:", err);
      return res.status(500).send("Error loading page");
    }

    // Insert the rendered app into the HTML template
    const html = data
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace("<!--scripts-->", scriptTags);

    // Set proper content type and send the response
    res.setHeader("Content-Type", "text/html");
    return res.send(html);
  });
});

// Start the server
  app.listen(PORT, () => {
    console.log(`SSR server running on http://localhost:${PORT}`);
  });
