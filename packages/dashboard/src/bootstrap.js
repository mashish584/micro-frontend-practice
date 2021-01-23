import { createApp } from "vue";
import Dashboard from "./components/Dashboard";

const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

if (process.env.NODE_ENV === "development") {
  const rootElement = document.querySelector("#dashboard-root");

  if (rootElement) {
    mount(rootElement);
  }
}

export { mount };
