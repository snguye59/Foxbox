import styles from "./TextAreaInput.module.css";

const TextAreaInput = ({
  name,
  label,
  value,
  placeholder,
  height,
  onChange,
}) => {
  return (
    <div className={styles.input}>
      <label
        htmlFor={name}
        onClick={() => navigator.clipboard.writeText(value)}
      >
        {label}
      </label>
      <div className={styles.field} style={{ height }}>
        <textarea
          id={name}
          name={name}
          value={value || ""}
          placeholder={placeholder}
          maxLength={1000}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextAreaInput;
