import { Outlet } from "react-router";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ color: 'var(--fern)' }}>
      <Header />
      <Outlet />
    </div>
  );
}
