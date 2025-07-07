import type { ProRenderFieldPropsType } from "@ant-design/pro-components";
import DepartmentSelect from "~/components/form/DepartmentSelect";
import DistrictSelect from "~/components/form/DistrictSelect";
import DistrictText from "~/components/form/DistrictText";
import PermissionGroupSelect from "~/components/form/PermissionGroupSelect";
import PermissionSelect from "~/components/form/PermissionSelect";
import RoleSelect from "~/components/form/RoleSelect";
import SystemDictSelect from "~/components/form/SystemDictSelect";
import SystemDictText from "~/components/form/SystemDictText";

export const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
  permission: {
    render: (value) => {
      return value.length;
    },
    renderFormItem: (_, { fieldProps }) => {
      return (
        <PermissionSelect scope={fieldProps.scope} fieldProps={fieldProps} />
      );
    },
  },
  permissionGroup: {
    render: (value) => {
      return value;
    },
    renderFormItem: (_, { fieldProps }) => {
      return (
        <PermissionGroupSelect
          tenant={fieldProps.tenant}
          scope={fieldProps.scope}
          fieldProps={fieldProps}
        />
      );
    },
  },
  department: {
    render: (value) => {
      return value.length;
    },
    renderFormItem: (_, { fieldProps }) => {
      return <DepartmentSelect fieldProps={fieldProps} />;
    },
  },
  role: {
    render: (value) => {
      return value.length;
    },
    renderFormItem: (_, { fieldProps }) => {
      return <RoleSelect fieldProps={fieldProps} />;
    },
  },
  systemDict: {
    render: (value, { fieldProps }) => {
      return <SystemDictText dict={fieldProps.dict} code={value} />;
    },
    renderFormItem: (value, { fieldProps }) => {
      return (
        <SystemDictSelect
          dict={fieldProps.dict}
          value={value}
          fieldProps={fieldProps}
        />
      );
    },
  },
  district: {
    render: (value) => {
      return <DistrictText value={value} />;
    },
    renderFormItem: (value, { fieldProps }) => {
      return <DistrictSelect value={value} fieldProps={fieldProps} />;
    },
  },
};
