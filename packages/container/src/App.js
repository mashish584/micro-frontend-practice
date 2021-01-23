import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Router,
  Redirect,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Header from "./components/Header";

const AuthAppLazy = lazy(() => import("./components/AuthApp"));
const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

// using Router here instead of Browser history beacause it's
// complex to create history here
const history = createBrowserHistory();

const generateClassName = createGenerateClassName({
  productionPrefix: "container",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense
          fallback={
            <div>
              <h4 style={{ textAlign: "center" }}>Loading...</h4>
            </div>
          }
        >
          <Switch>
            <Route path="/auth">
              <AuthAppLazy
                isSignedIn={isSignedIn}
                onSignIn={() => {
                  setIsSignedIn(true);
                }}
              />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </Router>
    </StylesProvider>
  );
};
