import { hydrate } from "preact/compat";

import { App } from "./app.js";

declare global {
  interface Window {
    __PROMISE__: Promise<string>;
  }
}

hydrate(<App promise={window.__PROMISE__} />, document.getElementById("app"));
