import { Link } from "react-router";

export default function Accounts() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1">
      <h1 className="text-2xl font-bold">Accounts</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
