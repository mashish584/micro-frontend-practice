import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory, createMemoryHistory } from "history";
import App from "./App";

const mount = (
  el,
  { defaultConfig, onNavigationChange, initialPath, onSignIn }
) => {
  const history =
    defaultConfig ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigationChange) {
    history.listen(onNavigationChange);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentChange: ({ pathname: nextpathname }) => {
      const { pathname } = history.location;

      if (pathname !== nextpathname) {
        history.push(nextpathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const rootElement = document.querySelector("#auth-root");

  if (rootElement) {
    mount(rootElement, {
      defaultConfig: createBrowserHistory(),
    });
  }
}

export { mount };
