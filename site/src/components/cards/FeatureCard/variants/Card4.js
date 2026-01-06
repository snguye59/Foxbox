import styles from "../FeatureCard.module.css";
import Image from "next/image";
import { ArrowButton } from "src/components/buttons";

const Card4 = () => {
  return (
    <div
      className={`${styles.card} ${styles.small} ${styles.illustrationFirst} ${styles.card4}`}
    >
      <div className={styles.illustration}>
        <Image
          src="/images/animated-mockups/password-strength-improvement.svg"
          alt="password strength improvement"
          fill
        />
      </div>
      <div className={styles.texts}>
        <p>Proactive threat detection and prevention</p>
        <p>
          Foxbox Breachtower continuously monitors your accounts, generating
          vault health reports to identify and mitigate potential security
          risks.
        </p>
        <ArrowButton text="Learn more" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Card4;
