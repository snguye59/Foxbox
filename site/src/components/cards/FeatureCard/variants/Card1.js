import styles from "../FeatureCard.module.css";
import Image from "next/image";
import { ArrowButton } from "src/components/buttons";

const Card1 = () => {
  return (
    <div
      className={`${styles.card} ${styles.small} ${styles.textsFirst} ${styles.card1}`}
    >
      <div className={styles.texts}>
        <p>All information you need in one place</p>
        <p>
          Foxbox stores all your sensitive data in one secure location, ensuring
          robust security measures to keep your information safe.
        </p>
        <ArrowButton text="Learn more" onClick={() => {}} />
      </div>
      <div className={styles.illustration}>
        <Image
          src="/images/animated-mockups/login-form-carousel.svg"
          alt="login form carousel"
          fill
        />
      </div>
    </div>
  );
};

export default Card1;
