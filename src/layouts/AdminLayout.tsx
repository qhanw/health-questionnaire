import { Suspense } from "react";

import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { ProLayout } from "@ant-design/pro-components";

import { Input, Dropdown } from "antd";

import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";

import { useRequest } from "ahooks";
import request from "@/utils/request";
import { local } from "@/utils/utils";

import defaultProps from "./_defaultProps";

const settings: Partial<ProSettings> | undefined = {
  fixSiderbar: true,
  layout: "mix",
};

function useUserInfo() {
  const { data, loading } = useRequest(
    async () => {
      const token = local.get("token");
      if (!token) return undefined;

      const userinfo = local.get("userinfo");
      if (userinfo) return userinfo;

      const { data: res } = await request("/api/sc-hq/auth/profile");
      return res.data;
    },
    {
      onSuccess: (d) => {
        local.set("userinfo", d);
      },
    }
  );

  return { data, loading };
}

export default function BaseLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, data: userinfo } = useUserInfo();

  if (!userinfo && !loading) return <Navigate to="/adm/user/login" replace />;

  return (
    <ProLayout
      title="Health Questionnaire Admin"
      logo="https://qhan.wang/favicon.png"
      token={{
        bgLayout: "#fff",
        header: { colorBgHeader: "#fff" },
        sider: { colorMenuBackground: "#fff" },
        pageContainer: { colorBgPageContainer: "#fff" },
      }}
      {...defaultProps}
      location={location}
      menu={{ type: "group" }}
      avatarProps={{
        src: "https://qhan.wang/favicon.png",
        size: "small",
        title: "Qhan W",
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                    onClick: () => {
                      local.clear();
                      navigate("/adm/user/login");
                    },
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          props.layout !== "side" && document.body.clientWidth > 1400 ? (
            <div
              key="SearchOutlined"
              aria-hidden
              style={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: 24,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Input
                style={{
                  borderRadius: 4,
                  marginInlineEnd: 12,
                }}
                prefix={<SearchOutlined />}
                placeholder="搜索方案"
                bordered={false}
              />
              <PlusCircleFilled
                style={{
                  color: "var(--ant-primary-color)",
                  fontSize: 24,
                }}
              />
            </div>
          ) : undefined,
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <GithubFilled key="GithubFilled" />,
        ];
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <div style={{ textAlign: "center", paddingBlockStart: 12 }}>
            © 2021 Copyright by Qhan W
          </div>
        );
      }}
      onMenuHeaderClick={(e) => console.log(e)}
      menuItemRender={(item, dom) => (
        <a onClick={() => navigate(item.path || "/adm/welcome")}>{dom}</a>
      )}
      {...settings}
    >
      {/* reference: https://github.com/ant-design/pro-components/issues/6264 */}
      <Suspense>
        <Outlet />
      </Suspense>
    </ProLayout>
  );
}
