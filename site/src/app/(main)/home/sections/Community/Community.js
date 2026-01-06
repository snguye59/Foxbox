import styles from "./Community.module.css";
import Image from "next/image";
import { ExploreButton } from "src/components/buttons";
import { StatHighlightList } from "src/components/lists";

const Community = () => {
  return (
    <div className={styles.section}>
      <div className={styles.wave}></div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.texts}>
            <p className={styles.caption}>Open source transparency</p>
            <p className={styles.title}>A project driven by the community</p>
            <p className={styles.description}>
              The development of Foxbox relies heavily on open- source
              technologies. One could say that Foxbox wouldn’t exist without the
              dev community, so we aim to give back and make the internet a more
              secure place.
            </p>
            <ExploreButton
              text="Foxbox on Github"
              link="/"
              icon="github"
              theme="dark"
            />
          </div>
          <div className={styles.stats}>
            <StatHighlightList
              title="100+"
              description="pre-launch signups from developers."
              theme="dark"
            />
            <StatHighlightList
              title="90%"
              description="of our features are community-inspired."
              theme="dark"
            />
          </div>
        </div>
        <Image
          className={styles.illustration}
          src="/images/animated-illustrations/code-elements.svg"
          alt="code elements"
          width={500}
          height={288}
        />
        <div className={styles.animation}>
          <Image
            src="/images/animated-mockups/global-community-network.svg"
            alt="code editor"
            width={640}
            height={640}
          />
        </div>
      </div>
    </div>
  );
};

export default Community;
