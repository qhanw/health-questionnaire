import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default {
  route: {
    path: "/adm",
    routes: [
      {
        path: "/adm/welcome",
        name: "欢迎",
        icon: <SmileFilled />,
        component: "./Welcome",
      },
      {
        path: "/adm/statistics",
        name: "问卷列表",
        icon: <UnorderedListOutlined />,
        component: "./Welcome",
      },
      {
        path: "/admin",
        name: "管理页",
        icon: <CrownFilled />,
        access: "canAdmin",
        component: "./Admin",
        routes: [
          {
            path: "/admin/sub-page1",
            name: "一级页面",
            icon: "https://qhan.wang/favicon.png",
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page2",
            name: "二级页面",
            icon: <CrownFilled />,
            component: "./Welcome",
          },
        ],
      },
      {
        path: "https://qhan.wang",
        name: "Qhan W",
        icon: <ChromeFilled />,
      },
    ],
  },
  location: { pathname: "/" },
};
