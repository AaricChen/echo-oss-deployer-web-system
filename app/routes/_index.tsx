import type { Route } from "./+types/_index";

export function clientLoader() {
  return {
    message: "Hello, world!",
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.message}</div>;
}
