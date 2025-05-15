import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { Link } from "react-router";

export default function Accounts() {
  return (
    <PageContainer title="账户管理">
      <Button>
        <Link to="/">回首页</Link>
      </Button>
    </PageContainer>
  );
}
