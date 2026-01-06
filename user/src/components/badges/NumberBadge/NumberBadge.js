import styles from "./NumberBadge.module.css";

const NumberBadge = ({ number }) => {
  return <div className={styles.badge}>{number}</div>;
};

export default NumberBadge;
