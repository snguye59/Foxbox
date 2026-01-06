import styles from "./FormPageIndicator.module.css";

const FormPageIndicator = ({ page }) => {
  return (
    <div className={`${styles.indicator} ${styles[page]}`}>
      <span />
      <span />
    </div>
  );
};

export default FormPageIndicator;
