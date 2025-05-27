import { PageContainer } from "@ant-design/pro-components";
import { Card, Tabs } from "antd";
import UserInfoForm from "~/components/user/UserInfoForm";

export default function UserPage() {
  return (
    <PageContainer title="账户设置">
      <Card>
        <Tabs
          tabPosition="left"
          items={[
            {
              key: "info",
              label: "基本资料",
              children: <UserInfoForm />,
            },
            {
              key: "security",
              label: "安全设置",
            },
            {
              key: "notification",
              label: "通知设置",
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
}
