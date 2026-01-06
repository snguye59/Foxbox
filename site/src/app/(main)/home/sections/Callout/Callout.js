import styles from "./Callout.module.css";
import Image from "next/image";
import { CalloutCard } from "src/components/cards";

const Callout = () => {
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
        <div className={styles.texts}>
          <p className={styles.title}>Ready to start?</p>
          <p className={styles.description}>
            Foxbox is the safest way to remember your logins, passwords, credit
            cards, and more. Create an account with us today.
          </p>
        </div>
        <div className={styles.cards}>
          <CalloutCard variant="pricing" />
          <CalloutCard variant="scheduling" />
        </div>
      </div>
    </div>
  );
};

export default Callout;
