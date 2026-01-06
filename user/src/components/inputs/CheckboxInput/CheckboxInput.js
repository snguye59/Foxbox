import styles from "./CheckboxInput.module.css";
import { SvgIcon } from "src/components/icons";

const CheckboxInput = ({ name, label, value, isDisabled, onChange }) => {
  return (
    <div className={styles.checkbox}>
      <div className={styles.box}>
        <input
          id={name}
          name={name}
          className={styles.input}
          type="checkbox"
          checked={value || false}
          disabled={isDisabled}
          onChange={onChange}
        />
        <label
          htmlFor={name}
          className={`
            ${styles.check} 
            ${value ? styles.checked : ""}
          `}
        >
          <SvgIcon icon="check" size={12} />
        </label>
      </div>
      {label && (
        <label
          htmlFor={name}
          className={`
            ${styles.label} 
            ${value ? styles.selected : ""}
          `}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckboxInput;
