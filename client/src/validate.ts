export const remarkValidator = (_: any, value: any) => {
  if (!value?.length) {
    return Promise.reject(`问题${_.field}：至少选择一项！`);
  }

  if (
    value &&
    value.includes(-1) &&
    !value.some((c: any) => `${c}`.includes("$"))
  ) {
    return Promise.reject(`问题${_.field}：请注明其它选项描述！`);
  }
  return Promise.resolve();
};

export const requireValidator = (_: any, value: any) => {
  if (value === undefined) {
    return Promise.reject(`问题${_.field}：请做出选择！`);
  }

  if (value && value.includes("-1") && !value.includes("$")) {
    return Promise.reject(`问题${_.field}：请注明其它选项描述！`);
  }

  return Promise.resolve();
};

export const ageValidator = (_: any, value: any) => {
  if (value === undefined || value === "") {
    return Promise.reject(`问题${_.field}：请填写您的年龄！`);
  }
  if (+value > 150 || +value < 10) {
    return Promise.reject(`问题${_.field}：请填写10～150之间的年龄！`);
  }
  return Promise.resolve();
};

export const familyPopulationValidator = (_: any, value: any) => {
  if (value === undefined || value === "") {
    return Promise.reject(`问题${_.field}：请填写您的家庭人口数量！`);
  }
  if (+value > 20 || +value < 1) {
    return Promise.reject(`问题${_.field}：请填写1～20之间的家庭人口！`);
  }
  return Promise.resolve();
};
