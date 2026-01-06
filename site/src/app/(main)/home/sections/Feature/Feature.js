import styles from "./Feature.module.css";
import Image from "next/image";
import { FeatureCard } from "src/components/cards";
import { ExploreButton } from "src/components/buttons";

const Feature = () => {
  return (
    <div className={styles.section}>
      <div className={styles.wave}></div>
      <div className={styles.content}>
        <Image
          className={styles.grid}
          src="/images/app-illustrations/dot-grid.svg"
          alt="dot grid"
          width={160}
          height={160}
        />
        <div className={styles.texts}>
          <p className={styles.caption}>Premium features</p>
          <p className={styles.title}>A complete unified password manager</p>
          <p className={styles.description}>
            We bring together everything needed to save and secure your online
            accounts, making your life on the internet easier.
          </p>
          <ExploreButton
            text="Explore features"
            link="/"
            icon="bulb"
            theme="dark"
          />
        </div>
        <div className={styles.cards}>
          <div>
            <FeatureCard variant="1" />
            <FeatureCard variant="2" />
          </div>
          <div>
            <FeatureCard variant="3" />
          </div>
          <div>
            <FeatureCard variant="4" />
            <FeatureCard variant="5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
