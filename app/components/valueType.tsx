import type { ProRenderFieldPropsType } from "@ant-design/pro-components";
import PermissionSelect from "~/components/form/PermissionSelect";

export const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
  permissions: {
    render: (text) => {
      return text.length;
    },
    renderFormItem: (_, { fieldProps }) => {
      return <PermissionSelect fieldProps={fieldProps} />;
    },
  },
};
