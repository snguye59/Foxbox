import styles from "./PricingPlanSelector.module.css";

const PricingPlanSelector = ({ plan, onPlanSelect }) => {
  return (
    <div
      className={` 
        ${styles.button} 
        ${styles[plan]}
      `}
    >
      <div className={styles.texts}>
        <button
          type="button"
          className={styles.monthlyText}
          onClick={() => onPlanSelect("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          className={styles.annuallyText}
          onClick={() => onPlanSelect("annually")}
        >
          Annually
        </button>
      </div>
      <div className={styles.toggleSwitch}></div>
      <div className={styles.badge}>Save 50%</div>
    </div>
  );
};

export default PricingPlanSelector;
