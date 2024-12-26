import React from "react";
import { useRouter } from "next/router";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();

  // Define routes where the layout should NOT be rendered
  const excludedRoutes = [, "/Admin", "/Admin/*"];

  // Check if the current route matches any excluded route
  const isExcluded = excludedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace("*", ".*")}$`); // Handle wildcards
    return regex.test(router.pathname);
  });

  if (isExcluded) {
    // Return only the page content, skipping the layout
    return <>{children}</>;
  }

  // Default layout for non-excluded routes
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
