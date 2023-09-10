import { useRequest } from "ahooks";
import request from "@/utils/request";

export function useSign() {
  const {
    runAsync: sign,

    loading,
  } = useRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (d: API.LoginParams, fn?: () => void) => {
      const { data: res } = await request("/api/sc-hq/auth/login", {
        method: "post",
        data: d,
      });
      return res;
    },
    { manual: true, onSuccess: () => {} }
  );

  return { sign, loading };
}
