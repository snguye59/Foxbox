"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWindowWidth } from "src/hooks/useWindowWidth";
import {
  UserHeaderNavigation,
  UserSidebarNavigation,
} from "src/components/navigations";

const MainLayout = ({ children }) => {
  const pathname = usePathname();

  const { windowWidth } = useWindowWidth();
  const [sidebarVisibility, setSidebarVisibility] = useState({
    showNavigation: true,
    userToggled: false,
  });

  useEffect(() => {
    if (windowWidth <= 930 && !sidebarVisibility.userToggled) {
      setSidebarVisibility((prev) => ({ ...prev, showNavigation: false }));
    } else if (windowWidth > 930) {
      setSidebarVisibility({ showNavigation: true, userToggled: false });
    }
  }, [windowWidth, sidebarVisibility.userToggled]);

  useEffect(() => {
    if (windowWidth <= 930) {
      setSidebarVisibility({
        showNavigation: false,
        userToggled: false,
      });
    }
  }, [pathname]);

  return (
    <main>
      <UserHeaderNavigation onSidebarVisibilityToggle={setSidebarVisibility} />
      <UserSidebarNavigation
        showNavigation={sidebarVisibility.showNavigation}
      />
      {children}
    </main>
  );
};

export default MainLayout;
