import styles from "./OverlayBackground.module.css";

const OverlayBackground = ({ position, isBlur }) => {
  return (
    <div
      style={{ position }}
      className={`
        ${styles.background}
        ${isBlur ? styles.blur : styles.darken}
      `}
    ></div>
  );
};

export default OverlayBackground;
