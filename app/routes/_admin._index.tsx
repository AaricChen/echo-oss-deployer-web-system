import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { Link } from "react-router";
import Icon from "~/components/icon";
import type { Route } from "./+types/_admin._index";

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <PageContainer title="首页">
      <Button>
        <Link to="/account">账户管理</Link>
      </Button>
    </PageContainer>
  );
}
