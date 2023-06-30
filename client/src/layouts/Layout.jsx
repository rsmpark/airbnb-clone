import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function Layout() {
  return (
    <div className="py-6 px-9 flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto pt-8 max-w-7xl">
        <Outlet />
      </div>
    </div>
  );
}
