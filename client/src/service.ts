import { useRequest } from "ahooks";
import { Toast } from "antd-mobile";

export function useMutate() {
  const { data, run, loading } = useRequest(
    (data, fn) => ({
      url: "/pc/wenJuan/add",
      method: "post",
      body: JSON.stringify(data),
    }),
    {
      manual: true,
      debounceInterval: 800,
      onSuccess: (res, params) => {
        if (res.code === 1) {
          params[1]();
        } else {
          Toast.show({ icon: "fail", content: res.msg || "问卷提交失败！" });
        }
      },
    }
  );

  return { data, run, loading };
}

export function useGetCode() {
  const { data, run, loading } = useRequest(
    (data, fn?: () => void) => ({
      url: "/pc/wenJuan/getCode",
      method: "post",
      body: JSON.stringify(data),
    }),
    {
      manual: true,

      onSuccess: (res, params) => {
        if (res.code === 1) {
          if (params[1]) params[1]();
        } else {
          Toast.show({
            icon: "fail",
            content: res.msg || "验证码获取失败，请稍后再试！",
          });
        }
      },
    }
  );

  return { data, run, loading };
}

export function useValidateCode() {
  const { data, run, loading } = useRequest(
    (data, fn?: () => void) => ({
      url: "/pc/wenJuan/validate",
      method: "post",
      body: JSON.stringify(data),
    }),
    {
      manual: true,
      onSuccess: (res, params) => {
        if (res.code === 1) {
          if (params[1]) params[1]();
        } else {
          Toast.show({ icon: "fail", content: res.msg || "验证失败！" });
        }
      },
    }
  );

  return { data, run, loading };
}
