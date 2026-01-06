"use client";

import Link from "next/link";

const ComponentsPage = () => {
  const links = [
    { href: "/sandbox/components/animations", label: "Animations" },
    { href: "/sandbox/components/icons", label: "Icons" },
    { href: "/sandbox/components/badges", label: "Badges" },
    {
      href: "/sandbox/components/toast-notifications",
      label: "Toast Notifications",
    },
    { href: "/sandbox/components/tooltips", label: "Tooltips" },
    { href: "/sandbox/components/buttons", label: "Buttons" },
    { href: "/sandbox/components/selectors", label: "Selectors" },
    { href: "/sandbox/components/utils", label: "Utils" },
    { href: "/sandbox/components/lists", label: "Lists" },
    { href: "/sandbox/components/menus", label: "Menus" },
    { href: "/sandbox/components/cards", label: "Cards" },
    { href: "/sandbox/components/navigations", label: "Navigations" },
    { href: "/sandbox/components/backgrounds", label: "Backgrounds" },
  ];

  return (
    <>
      <nav>
        <ul>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ComponentsPage;
