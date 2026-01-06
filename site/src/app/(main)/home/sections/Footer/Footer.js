import styles from "./Footer.module.css";
import Image from "next/image";
import { AppFooterNavigation } from "src/components/navigations";

const Footer = () => {
  return (
    <div className={styles.section}>
      <div className={styles.wave}></div>
      <div className={styles.content}>
        <Image
          className={styles.illustration}
          src="/images/animated-illustrations/paper-plane-journey.svg"
          alt="paper plane journey"
          width={689}
          height={210}
        />
        <AppFooterNavigation />
      </div>
    </div>
  );
};

export default Footer;
