export const BoolStatus = {
  Y: {
    text: "是",
    status: "success",
  },
  N: {
    text: "否",
    status: "error",
  },
};

export const DisableValueEnum = {
  true: {
    text: "禁用",
    status: "error",
  },
  false: {
    text: "启用",
    status: "success",
  },
};

export const EnableValueEnum = {
  true: {
    text: "启用",
    status: "success",
  },
  false: {
    text: "禁用",
    status: "error",
  },
};

export const SecurityScope = {
  SYSTEM: {
    text: "系统端",
    status: "success",
  },
  TENANT: {
    text: "租户端",
    status: "error",
  },
  CLIENT: {
    text: "客户端",
    status: "default",
  },
};
