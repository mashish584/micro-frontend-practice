import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Header from "./components/Header";

const AuthAppLazy = lazy(() => import("./components/AuthApp"));
const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
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
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </StylesProvider>
  );
};
