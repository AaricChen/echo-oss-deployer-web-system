import type { ProRenderFieldPropsType } from "@ant-design/pro-components";
import ImagePreview from "~/components/common/ImagePreview";
import DepartmentSelect from "~/components/form/DepartmentSelect";
import DepartmentText from "~/components/form/DepartmentText";
import DistrictSelect from "~/components/form/DistrictSelect";
import DistrictText from "~/components/form/DistrictText";
import ImageUpload from "~/components/form/ImageUpload";
import PermissionGroupSelect from "~/components/form/PermissionGroupSelect";
import PermissionSelect from "~/components/form/PermissionSelect";
import RoleSelect from "~/components/form/RoleSelect";
import RoleText from "~/components/form/RoleText";
import SystemDictSelect from "~/components/form/SystemDictSelect";
import SystemDictText from "~/components/form/SystemDictText";

/**
 * 定义公共表单字段组件
 */
export const commonTypes: Record<string, ProRenderFieldPropsType> = {
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
      if (Array.isArray(value)) {
        return value.length;
      }
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
      return <DepartmentText value={value} />;
    },
    renderFormItem: (_, { fieldProps }) => {
      return (
        <DepartmentSelect tenant={fieldProps.tenant} fieldProps={fieldProps} />
      );
    },
  },
  role: {
    render: (value) => {
      return <RoleText value={value} />;
    },
    renderFormItem: (_, { fieldProps }) => {
      return (
        <RoleSelect
          scope={fieldProps.scope}
          tenant={fieldProps.tenant}
          fieldProps={fieldProps}
        />
      );
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
  image: {
    render: (value, { fieldProps }) => {
      return <ImagePreview value={value} width={fieldProps.width} />;
    },
    renderFormItem: (value, { fieldProps }) => {
      return <ImageUpload value={value} {...fieldProps} />;
    },
  },
};
