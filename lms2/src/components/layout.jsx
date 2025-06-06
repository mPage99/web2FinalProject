import Header from "./header";
import Footer from "./footer";
// Outlet is a placeholder for the 'current' route being rendered
import { Outlet } from "react-router-dom";

export default function Layout({ title, logo }) {
  return (
    <div>
      <Header title={title} logo={logo} />
      <Outlet />
      <Footer />
    </div>
  );
}
