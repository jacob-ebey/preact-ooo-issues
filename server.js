import * as http from "node:http";

import serve from "serve-handler";

import { handleRequest } from "./dist/server/entry.server.js";

const server = http.createServer(async (req, res) => {
  if (req.url?.endsWith(".js")) {
    await serve(req, res, {
      public: "dist/browser",
    });
    return;
  }
  await handleRequest(req, res);
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
