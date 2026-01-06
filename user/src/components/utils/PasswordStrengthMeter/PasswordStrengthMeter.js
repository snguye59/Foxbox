import styles from "./PasswordStrengthMeter.module.css";

const PasswordStrengthMeter = ({ strength }) => {
  return (
    <div
      className={`
        ${styles.meter} 
        ${styles[strength]}
      `}
    ></div>
  );
};

export default PasswordStrengthMeter;
