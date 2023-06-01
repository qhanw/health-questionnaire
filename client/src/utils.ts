const _serialize = (obj: any) => JSON.stringify(obj);

const _deserialize = (strVal: any) => {
  if (!strVal) return strVal;
  let val = "";
  try {
    val = JSON.parse(strVal);
  } catch (e) {
    val = strVal;
  }
  return val;
};

export const storage = {
  set: (name: string, data: any) => {
    sessionStorage.setItem(name, _serialize(data));
  },

  get: (name: string) => {
    return _deserialize(sessionStorage[name]);
  },
  clear: () => {
    sessionStorage.clear();
  },
};
