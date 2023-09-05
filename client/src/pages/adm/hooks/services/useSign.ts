import { useRequest } from "ahooks";
import axios from "axios";

export function useSign() {
  const {
    runAsync: sign,

    loading,
  } = useRequest(
    /** eslint-disable-next-line @typescript-eslint/no-unused-vars */
    async (d: API.LoginParams, fn?: () => void) => {
      const { data: res } = await axios.post("/api/sc-hq/user/login", d);
      return res;
    },
    { manual: true, onSuccess: () => {} }
  );

  return { sign, loading };
}
