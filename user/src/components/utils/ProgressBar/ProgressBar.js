import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress }) => {
  return <div className={styles.bar}>
    <div className={styles.progress} style={{ width: progress }}></div>
  </div>;
};

export default ProgressBar;
