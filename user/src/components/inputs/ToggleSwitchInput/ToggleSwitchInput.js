import styles from "./ToggleSwitchInput.module.css";

const ToggleSwitchInput = ({ name, value, size, onChange }) => {
  return (
    <div className={styles.toggle}>
      <input
        id={name}
        name={name}
        className={styles.input}
        type="checkbox"
        checked={value || false}
        onChange={onChange}
      />
      <label htmlFor={name} className={`${styles.switch} ${styles[size]}`} />
    </div>
  );
};

export default ToggleSwitchInput;
