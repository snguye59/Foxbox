import styles from "./TestimonialBlockAnimation.module.css";
import { testimonialsData } from "src/data/testimonialsData";
import { TestimonialCard } from "src/components/cards";

const TestimonialBlockAnimation = () => {
  const half = Math.ceil(testimonialsData.length / 2);
  const firstHalf = testimonialsData.slice(0, half);
  const secondHalf = testimonialsData.slice(half);

  return (
    <div className={styles.animation}>
      <div className={styles.row}>
        <div className={styles.cards}>
          {firstHalf.map((testimonial, index) => (
            <TestimonialCard key={index} data={testimonial} />
          ))}
        </div>
        <div className={styles.cards}>
          {firstHalf.map((testimonial, index) => (
            <TestimonialCard key={index + half} data={testimonial} />
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.cards}>
          {secondHalf.map((testimonial, index) => (
            <TestimonialCard key={index + half * 2} data={testimonial} />
          ))}
        </div>
        <div className={styles.cards}>
          {secondHalf.map((testimonial, index) => (
            <TestimonialCard key={index + half * 3} data={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialBlockAnimation;
