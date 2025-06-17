import type { ProRenderFieldPropsType } from "@ant-design/pro-components";
import DepartmentSelect from "~/components/form/DepartmentSelect";
import PermissionSelect from "~/components/form/PermissionSelect";
import RoleSelect from "~/components/form/RoleSelect";
import SystemDictSelect from "~/components/form/SystemDictSelect";

export const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
  permission: {
    render: (text) => {
      return text.length;
    },
    renderFormItem: (_, { fieldProps }) => {
      return <PermissionSelect fieldProps={fieldProps} />;
    },
  },
  department: {
    render: (text) => {
      return text.length;
    },
    renderFormItem: (_, { fieldProps }) => {
      return <DepartmentSelect fieldProps={fieldProps} />;
    },
  },
  role: {
    render: (text) => {
      return text.length;
    },
    renderFormItem: (_, { fieldProps }) => {
      return <RoleSelect fieldProps={fieldProps} />;
    },
  },
  systemDict: {
    render: (dict) => {
      return dict?.name;
    },
    renderFormItem: (value, { fieldProps }) => {
      return (
        <SystemDictSelect
          dict={fieldProps.dict}
          fieldProps={{
            ...fieldProps,
            value: value.code ? value.code : value,
          }}
        />
      );
    },
  },
};
