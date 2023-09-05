import { message, Tabs, Alert } from "antd";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";

import { useNavigate } from "react-router-dom";

// import type { CSSProperties } from "react";
import { useState } from "react";

import { useSign } from "./hooks/services";

type LoginType = "phone" | "account";

// const iconStyles: CSSProperties = {
//   marginInlineStart: "16px",
//   color: "rgba(0, 0, 0, 0.2)",
//   fontSize: "24px",
//   verticalAlign: "middle",
//   cursor: "pointer",
// };

const LoginMessage = ({ content }: { content: string }) => {
  return (
    <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon
    />
  );
};

export default function UserLogin() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<"ok" | "error">();
  const [loginType, setLoginType] = useState<LoginType>("account");

  const { sign } = useSign();

  const onSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const res = await sign({ ...values, type: loginType });

      console.log(res);
      if (res.status === "ok") {
        message.success("登录成功！");
        // await fetchUserInfo();

        const urlParams = new URL(window.location.href).searchParams;
        navigate(urlParams.get("redirect") || "/adm");
        return;
      }
      console.log(res);
      // 如果失败去设置用户错误信息
      setLoginStatus(res.status);
    } catch (error) {
      console.log(error);
      message.error("登录失败，请重试！");
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <LoginForm
        // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Health Questionnaire Admin"
        // subTitle="全球最大的代码托管平台"
        // actions={
        //   <Space>
        //     其他登录方式
        //     <AlipayCircleOutlined style={iconStyles} />
        //     <TaobaoCircleOutlined style={iconStyles} />
        //     <WeiboCircleOutlined style={iconStyles} />
        //   </Space>
        // }
        onFinish={async (values) => await onSubmit(values)}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          items={[
            { key: "account", label: "账号密码登录" },
            { key: "phone", label: "手机号登录" },
          ]}
        />

        {loginStatus === "error" && loginType === "account" && (
          <LoginMessage content="账户或密码错误(admin/ant.design)" />
        )}

        {loginType === "account" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"用户名: admin or user"}
              rules={[{ required: true, message: "请输入用户名!" }]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码: ant.design"}
              rules={[{ required: true, message: "请输入密码！" }]}
            />
          </>
        )}
        {loginStatus === "error" && loginType === "phone" && (
          <LoginMessage content="验证码错误" />
        )}
        {loginType === "phone" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className={"prefixIcon"} />,
              }}
              name="mobile"
              placeholder={"手机号"}
              rules={[
                { required: true, message: "请输入手机号！" },
                { pattern: /^1\d{10}$/, message: "手机号格式错误！" },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              captchaProps={{ size: "large" }}
              placeholder={"请输入验证码"}
              captchaTextRender={(timing, count) => {
                if (timing) return `${count} ${"获取验证码"}`;

                return "获取验证码";
              }}
              name="captcha"
              rules={[{ required: true, message: "请输入验证码！" }]}
              onGetCaptcha={async () => {
                message.success("获取验证码成功！验证码为：1234");
              }}
            />
          </>
        )}
        <div style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginForm>
    </ProConfigProvider>
  );
}
