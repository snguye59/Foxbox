import styles from "./Testimonial.module.css";
import { useWindowWidth } from "src/hooks/useWindowWidth";
import { testimonialsData } from "src/data/testimonialsData";
import { ExploreButton } from "src/components/buttons";
import { TestimonialCard } from "src/components/cards";
import { TestimonialBlockAnimation } from "src/components/animations";

const Testimonial = () => {
  const { windowWidth } = useWindowWidth();

  return (
    <div className={styles.section}>
      <div className={styles.wave}></div>
      <div className={styles.content}>
        <div className={styles.texts}>
          <p className={styles.caption}>Trusted by organizations</p>
          <p className={styles.title}>What our users say</p>
          <p className={styles.description}>
            With remote work on the rise, many people use our app to secure
            their business and protect their data.
          </p>
          <ExploreButton
            text="More stories"
            link="/"
            icon="chatBubbles"
            theme="dark"
          />
        </div>
        {windowWidth <= 484 ? (
          <div className={styles.cards}>
            <TestimonialCard data={testimonialsData[1]} />
            <TestimonialCard data={testimonialsData[7]} />
          </div>
        ) : (
          <TestimonialBlockAnimation />
        )}
      </div>
    </div>
  );
};

export default Testimonial;
