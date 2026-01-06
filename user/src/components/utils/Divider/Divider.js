import styles from "./Divider.module.css";

const Divider = ({ width, height, direction, theme }) => {
  return (
    <div
      className={`${styles.divider} ${styles[direction]} ${styles[theme]}`}
      style={{ width, height }}
    ></div>
  );
};

export default Divider;
