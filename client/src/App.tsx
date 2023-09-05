import { Suspense, useMemo, lazy } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { NoticeBar } from "antd-mobile";
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
  const isMobile = useMemo(
    () => /Mobi|Android|iPhone/i.test(navigator.userAgent),
    []
  );
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
      {!isMobile ? (
        <NoticeBar
          content="使用手机浏览，体验更佳！！！"
          color="alert"
          closeable
        />
      ) : null}
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

            // admin
            { path: "/adm", component: Statistics },
            { path: "/adm/user/login", component: UserLogin },
            { path: "/adm/statistics", component: Statistics },
            { path: "*", component: NoMatch },
          ].map((c) => (
            //<PrivateRoute key={c.path} exact={true} {...c} />
            <Route key={c.path} path={c.path} element={<c.component />} />
          ))}
          {/* admin */}
          {/* 
          <Route path={"/adm"} element={<Statistics />} />

          <Route path={"/adm/user/login"} element={<UserLogin />} />
          <Route path={"/adm/statistics"} element={<Statistics />} />

          <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
