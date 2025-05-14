import { Button, Result } from "antd";
import { Link } from "react-router";
import type { Route } from "./+types/_admin._index";

export default function Other({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在."
        extra={
          <Button>
            <Link to="/">返回首页</Link>
          </Button>
        }
      />
    </div>
  );
}
