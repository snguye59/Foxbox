import { useState, useEffect } from "react";

export function useScrollVisibility(position) {
  const [showComponent, setShowComponent] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  function showAtTop() {
    setShowComponent(window.scrollY < 50);
  }
  function showOnUpScroll() {
    const currentScrollY = window.scrollY;
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;

    if (
      currentScrollY <= maxScrollY &&
      currentScrollY > 0 &&
      Math.abs(currentScrollY - lastScrollY) > 20
    ) {
      setShowComponent(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    }
  }

  useEffect(() => {
    function handleScroll() {
      switch (position) {
        case "top":
          showAtTop();
          break;
        case "upscroll":
          showOnUpScroll();
          break;
        default:
          break;
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return showComponent;
}
