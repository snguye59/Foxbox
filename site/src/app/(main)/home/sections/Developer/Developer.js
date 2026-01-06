import styles from "./Developer.module.css";
import Image from "next/image";
import { ExploreButton } from "src/components/buttons";
import { StatHighlightList } from "src/components/lists";

const Developer = () => {
  return (
    <div className={styles.section}>
      <div className={styles.wave}></div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.texts}>
            <p className={styles.caption}>Developer&apos;s experience</p>
            <p className={styles.title}>APIs workflow built for developers</p>
            <p className={styles.description}>
              Our APIs are engineered for scalability and availability, offering
              robust performance and uptime. Open your favorite editor and
              connect to our main server with a single line of code.
            </p>
            <ExploreButton
              text="Read the docs"
              link="/"
              icon="cube"
              theme="dark"
            />
          </div>
          <div className={styles.stats}>
            <StatHighlightList
              title="100%"
              description="of APIs requests are secured using Foxbox."
              theme="dark"
            />
            <StatHighlightList
              title="200+"
              description="endpoints for extensive config options."
              theme="dark"
            />
          </div>
        </div>
        <Image
          className={styles.illustration}
          src="/images/animated-illustrations/paper-plane-journey.svg"
          alt="paper plane journey"
          width={689}
          height={210}
        />
        <div className={styles.animation}>
          <Image
            src="/images/animated-mockups/code-editor.svg"
            alt="code editor"
            width={586}
            height={528}
          />
        </div>
      </div>
    </div>
  );
};

export default Developer;
