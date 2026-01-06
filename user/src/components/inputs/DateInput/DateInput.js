import styles from "./DateInput.module.css";
import { SvgIcon } from "src/components/icons";
import { InputBadge } from "src/components/badges";

const DateInput = ({ name, label, value, icon, onShowModal, onChange }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name} onClick={onShowModal}>
        {label}
      </label>
      <div className={styles.field}>
        {value ? (
          <InputBadge
            value={value}
            onDelete={() =>
              onChange({
                target: {
                  name,
                },
              })
            }
          />
        ) : (
          <input
            id={name}
            name={name}
            onClick={onShowModal}
            onKeyDown={(e) => e.preventDefault()}
            onChange={() => {}}
          />
        )}
        <button type="button" className={styles.button} onClick={onShowModal}>
          <SvgIcon icon={icon} />
        </button>
      </div>
    </div>
  );
};

export default DateInput;
