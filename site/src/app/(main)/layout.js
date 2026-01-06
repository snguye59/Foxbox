"use client";

import styles from "./Main.module.css";
import Image from "next/image";
import FontFaceObserver from "fontfaceobserver";
import { useState, useEffect } from "react";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { AppHeaderNavigation } from "src/components/navigations";

const MainLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { handleErrorDisplay } = useErrorDisplay();

  useEffect(() => {
    const sfProDisplay = new FontFaceObserver("SF-Pro-Display");
    const sfProText = new FontFaceObserver("SF-Pro-Text");
    const firaCode = new FontFaceObserver("FiraCode");

    Promise.all([
      sfProDisplay.load(null, 10000),
      sfProText.load(null, 10000),
      firaCode.load(null, 10000),
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        handleErrorDisplay("Font is not available after waiting 10 seconds");
        setIsLoading(false);
      });
  }, []);

  return (
    <main className={styles.layout}>
      {isLoading ? (
        <div className={styles.loader}>
          <Image
            src="/images/animated-illustrations/fox-in-box.svg"
            alt="fox in box"
            width={280}
            height={328}
            priority
          />
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <AppHeaderNavigation />
          </div>
          {children}
        </>
      )}
    </main>
  );
};

export default MainLayout;
