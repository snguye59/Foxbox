import styles from "./Showcase.module.css";
import Image from "next/image";
import { useRef } from "react";
import { ExploreButton } from "src/components/buttons";

const Showcase = () => {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <Image
          className={styles.grid}
          src="/images/app-illustrations/dot-grid.svg"
          alt="dot grid"
          width={160}
          height={160}
        />
        <div className={styles.texts}>
          <p className={styles.caption}>Why join Foxbox</p>
          <p className={styles.title}>Enterprise-grade protection</p>
          <p className={styles.description}>
            Foxbox combines robust security features with user-friendly design,
            safeguarding both individuals and teams.
          </p>
          <ExploreButton
            text="Find out more"
            link="/"
            icon="lock"
            theme="light"
          />
        </div>
        <div className={styles.animation}>
          <Image
            src="/images/animated-illustrations/foxbox-core.svg"
            alt="foxbox core"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
