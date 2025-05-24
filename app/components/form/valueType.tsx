import type { ProRenderFieldPropsType } from "@ant-design/pro-components";
import DepartmentSelect from "~/components/form/DepartmentSelect";
import PermissionSelect from "~/components/form/PermissionSelect";

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
};
