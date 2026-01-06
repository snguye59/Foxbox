import styles from "./TypeWriterAnimation.module.css";
import { useState, useEffect } from "react";

const TypeWriterAnimation = ({
  texts,
  typingInterval,
  pauseTime,
  deletingInterval,
  transitioningTime,
}) => {
  const [index, setIndex] = useState(0);
  const [isBlinked, setIsBlinked] = useState(false);
  const [phase, setPhase] = useState("typing");
  const [animatedText, setAnimatedText] = useState(texts[0]);

  function findNextTypedSequence() {
    return texts[index].slice(0, animatedText.length + 1);
  }

  function findPrevTypedSequence() {
    return texts[index].slice(0, animatedText.length - 1);
  }

  useEffect(() => {
    switch (phase) {
      case "typing": {
        const nextTypedSequence = findNextTypedSequence();
        if (nextTypedSequence === animatedText) {
          setPhase("pausing");
          return;
        }
        const timeout = setTimeout(() => {
          setAnimatedText(nextTypedSequence);
        }, typingInterval);
        return () => clearTimeout(timeout);
      }

      case "pausing": {
        setIsBlinked(true);

        const timeout = setTimeout(() => {
          setPhase("deleting");
          setIsBlinked(false);
        }, pauseTime);
        return () => clearTimeout(timeout);
      }

      case "deleting": {
        if (!animatedText) {
          setPhase("transitioning");
          return;
        }
        const prevTypedSequence = findPrevTypedSequence();
        const timeout = setTimeout(() => {
          setAnimatedText(prevTypedSequence);
        }, deletingInterval);
        return () => clearTimeout(timeout);
      }

      case "transitioning": {
        const timeout = setTimeout(() => {
          const nextIndex = index + 1;
          setIndex(texts[nextIndex] ? nextIndex : 0);

          setPhase("typing");
        }, transitioningTime);
        return () => clearTimeout(timeout);
      }
    }
  }, [phase, animatedText]);

  return (
    <span
      className={`
        ${styles.animation} 
        ${isBlinked ? styles.blinkCursor : ""}
      `}
    >
      {animatedText}
    </span>
  );
};

export default TypeWriterAnimation;
