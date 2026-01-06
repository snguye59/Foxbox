import styles from "./Hero.module.css";
import { useState } from "react";
import { useWindowWidth } from "src/hooks/useWindowWidth";
import {
  TypeWriterAnimation,
  HomePageHeroAnimation,
} from "src/components/animations";
import { VideoPlayer } from "src/components/utils";
import { OverlayBackground } from "src/components/backgrounds";
import { ArrowButton, LaunchButton } from "src/components/buttons";

const Hero = () => {
  const { windowWidth } = useWindowWidth();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className={styles.section}>
      {showVideo && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.video} onClick={() => setShowVideo(false)}>
            <VideoPlayer
              link="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              width="1000px"
              showGradient
            />
          </div>
        </>
      )}
      <div className={styles.wave}></div>
      <div className={styles.content}>
        <div className={styles.texts}>
          <p className={styles.title}>
            Save
            <br /> and secure
            <br /> your {windowWidth < 400 && <br />}
            <TypeWriterAnimation
              texts={["passwords", "accounts", "documents", "identity"]}
              typingInterval={150}
              pauseTime={5000}
              deletingInterval={100}
              transitioningTime={500}
            />
          </p>
          <p className={styles.description}>
            Foxbox protects you and your family from cyber threats. Save, sort,
            and share all your data securely using a single online identity.
          </p>
          <div className={styles.buttons}>
            <LaunchButton text="Get started" link="/register" icon="fox" />
            <ArrowButton text="Learn more" onClick={() => setShowVideo(true)} />
          </div>
        </div>
        <div className={styles.animation}>
          <HomePageHeroAnimation />
        </div>
      </div>
    </div>
  );
};

export default Hero;
