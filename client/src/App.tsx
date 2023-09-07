import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import NoMatch from "./NoMatch";
import { storage } from "./utils";

const Home = lazy(() => import("./pages/Home"));
const PartOne = lazy(() => import("./pages/PartOne"));
const PartTwo = lazy(() => import("./pages/PartTwo"));
const PartThree = lazy(() => import("./pages/PartThree"));
const PartFour = lazy(() => import("./pages/PartFour"));
const Result = lazy(() => import("./pages/Result"));
const SMS = lazy(() => import("./pages/SMS"));

// admin
const Statistics = lazy(() => import("./pages/adm/Statistics"));
const UserLogin = lazy(() => import("./pages/adm/UserLogin"));
const MobileLayout = lazy(() => import("./layouts/MobileLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));

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

export default function App() {
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
          <Route element={<MobileLayout />}>
            {[
              { path: "/", component: Home },
              { path: "/sms", component: SMS },
              { path: "/part-1", auth: true, component: PartOne },
              { path: "/part-2", auth: true, component: PartTwo },
              { path: "/part-3", auth: true, component: PartThree },
              { path: "/part-4", auth: true, component: PartFour },
              // { path: "/404", component: E404 },
              { path: "/result", component: Result },

              // admin
              // { path: "/adm", component: Statistics },
              // { path: "/adm/user/login", component: UserLogin },
              // { path: "/adm/statistics", component: Statistics },
              // { path: "*", component: NoMatch },
            ].map((c) => (
              //<PrivateRoute key={c.path} exact={true} {...c} />
              <Route key={c.path} path={c.path} element={<c.component />} />
            ))}
          </Route>

          {/* admin */}
          <Route element={<AdminLayout />}>
            <Route path={"/adm/statistics"} element={<Statistics />} />
            <Route
              path={"/adm"}
              element={<Navigate to={"/adm/statistics"} />}
            />
          </Route>

          <Route path={"/adm/user/login"} element={<UserLogin />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
