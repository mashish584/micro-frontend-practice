import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Header from "./components/Header";

const AuthAppLazy = lazy(() => import("./components/AuthApp"));
const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container",
});

export default () => (
  <StylesProvider generateClassName={generateClassName}>
    <BrowserRouter>
      <Header />
      <Suspense
        fallback={
          <div>
            <h4 style={{ textAlign: "center" }}>Loading...</h4>
          </div>
        }
      >
        <Switch>
          <Route path="/auth" component={AuthAppLazy} />
          <Route path="/" component={MarketingAppLazy} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </StylesProvider>
);
