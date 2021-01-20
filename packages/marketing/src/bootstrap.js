import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Create Mount function
const mount = (el, { onNavigate, defaultRouting }) => {
  const history = defaultRouting || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentChange: ({ pathname: nextpathname }) => {
      const { pathname } = history.location;
      if (pathname !== nextpathname) {
        history.push(nextpathname);
      }
    },
  };
};

//Check if we're in development mode to render the application in isolation
if (process.env.NODE_ENV === "development") {
  const rootElement = document.querySelector("#marketing-root");

  if (rootElement) {
    mount(rootElement, {
      defaultRouting: createBrowserHistory(),
    });
  }
}

//Make mount function available for container
export { mount };
