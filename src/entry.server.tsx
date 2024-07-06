import * as http from "node:http";

import { renderToPipeableStream } from "preact-render-to-string/stream-node";

import { App } from "./app.js";

const shell = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SSR</title>
</head>
<body>
  <script>
    window.__PROMISE__ = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello, world!");
      }, 1000);
    });
  </script>
  <div id="app"><!-- app --></div>
  <script async type="module" src="/entry.browser.js"></script>
</body>
</html>`;

export function handleRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const [start, end] = shell.split("<!-- app -->");
  res.write(start);

  const { abort, pipe } = renderToPipeableStream(
    <App
      promise={
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve("Hello, world!");
          }, 1000);
        })
      }
    />,
    {
      onShellReady() {
        pipe(res);
      },
      onAllReady() {
        res.write(end);
      },
      onError: console.error,
    }
  );

  setTimeout(abort, 2000);
}
