import styles from "./Tutorial.module.css";
import Image from "next/image";
import { learningResourcesData } from "src/data/learningResourcesData";
import { TutorialCard } from "src/components/cards";
import { ExploreButton } from "src/components/buttons";

const Tutorial = () => {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Image
          className={styles.grid}
          src="/images/app-illustrations/dot-grid.svg"
          alt="dot grid"
          width={160}
          height={160}
        />
        <div className={styles.cards}>
          <TutorialCard data={learningResourcesData[0]} />
          <TutorialCard data={learningResourcesData[1]} />
        </div>
        <div className={styles.texts}>
          <p className={styles.caption}>30 hours of tutorials</p>
          <p className={styles.title}>Tutorials to help guide your learning</p>
          <p className={styles.description}>
            Beyond the app, learn from our concise but comprehensive
            cybersecurity tutorials to protect yourself against common threats
            and attacks.
          </p>
          <ExploreButton
            text="More tutorials"
            link="/"
            icon="book"
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
