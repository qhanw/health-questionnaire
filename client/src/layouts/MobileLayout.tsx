import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { NoticeBar } from "antd-mobile";

export default function BaseLayout() {
  const isMobile = useMemo(
    () => /Mobi|Android|iPhone/i.test(navigator.userAgent),
    []
  );

  return (
    <>
      {!isMobile ? (
        <NoticeBar
          content="使用手机浏览，体验更佳！！！"
          color="alert"
          closeable
        />
      ) : null}
      <Outlet />
    </>
  );
}
