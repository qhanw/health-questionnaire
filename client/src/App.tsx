import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import NoMatch from "./NoMatch";
import { storage } from "./utils";

const Home = React.lazy(() => import("./Home"));
const PartOne = React.lazy(() => import("./PartOne"));
const PartTwo = React.lazy(() => import("./PartTwo"));
const PartThree = React.lazy(() => import("./PartThree"));
const PartFour = React.lazy(() => import("./PartFour"));
const Result = React.lazy(() => import("./Result"));
const SMS = React.lazy(() => import("./SMS"));

function PrivateRoute({ component: Component, auth, ...rest }: any) {
  let identity = storage.get("identity");
  return (
    <Route
      {...rest}
      // element={<Component/>}
      render={() =>
        auth ? (
          identity ? (
            <Component />
          ) : (
            <Navigate to="/sms" replace={true} />
          )
        ) : (
          <Component />
        )
      }
    />
  );
}

export default () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vw",
            height: "100vh",
          }}
        >
          <div className="ant-spin ant-spin-lg ant-spin-spinning">
            <span className="ant-spin-dot ant-spin-dot-spin">
              <i className="ant-spin-dot-item"></i>
              <i className="ant-spin-dot-item"></i>
              <i className="ant-spin-dot-item"></i>
              <i className="ant-spin-dot-item"></i>
            </span>
          </div>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          {[
            { path: "/", component: Home },
            { path: "/sms", component: SMS },
            { path: "/part-1", auth: true, component: PartOne },
            { path: "/part-2", auth: true, component: PartTwo },
            { path: "/part-3", auth: true, component: PartThree },
            { path: "/part-4", auth: true, component: PartFour },
            // { path: "/404", component: E404 },
            { path: "/result", component: Result },
          ].map((c) => (
            //<PrivateRoute key={c.path} exact={true} {...c} />
            <Route key={c.path} path={c.path} element={<c.component />} />
          ))}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
