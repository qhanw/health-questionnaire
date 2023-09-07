import { useRequest } from "ahooks";
import { Toast } from "antd-mobile";
import axios from "axios";

export function useMutate() {
  const { data, run, loading } = useRequest(
    (data, fn) => axios.post("/api/sc-hq/qtn/create", data),
    {
      manual: true,
      debounceWait: 800,
      onSuccess: ({ data: res }: any, params) => {
        if (res.code === 0) {
          Toast.show({
            icon: "success",
            content: "问卷提交成功！",
            afterClose: () => {
              params[1]();
            },
          });
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
    (data) => axios.get("/user/getCode", data),
    {
      manual: true,

      onSuccess: (res: any, params: any) => {
        if (res?.code === 0) {
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
    (data, fn) => axios.post("/user/validate", data),
    {
      manual: true,
      onSuccess: (res: any, params) => {
        if (res.code === 0) {
          if (params[1]) params[1]();
        } else {
          Toast.show({ icon: "fail", content: res.msg || "验证失败！" });
        }
      },
    }
  );

  return { data, run, loading };
}
