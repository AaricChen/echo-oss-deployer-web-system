import { PageContainer } from "@ant-design/pro-components";
import type { Route } from "./+types/_admin._index";

export default function Home({ loaderData }: Route.ComponentProps) {
  return <PageContainer title="首页"></PageContainer>;
}
