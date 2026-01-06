"use client";

import styles from "../ComponentsPage.module.css";
import {
  TypeWriterAnimation,
  HomePageHeroAnimation,
  TestimonialBlockAnimation,
} from "src/components/animations";

const AnimationsPage = () => {
  return (
    <div className={styles.wrapper}>
      <TypeWriterAnimation
        texts={[
          "What will become of me from now on?",
          "After some time, I stopped thinking about that.",
          "Maybe I forgot...",
          "how to think at all.",
          "Nothing changes anymore.",
          "This world that belongs only to me",
          "each and everyday, continues on.",
          "But I'm not lonely.",
          "It doesn't bother me at all.",
        ]}
        typingInterval={100}
        pauseTime={3000}
        deletingInterval={50}
        transitioningTime={500}
      />
      <TestimonialBlockAnimation />
      <HomePageHeroAnimation />
    </div>
  );
};

export default AnimationsPage;
