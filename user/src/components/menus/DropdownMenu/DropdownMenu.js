import styles from "./DropdownMenu.module.css";
import { Divider } from "src/components/utils";
import { DropdownButton } from "src/components/buttons";

const DropdownMenu = ({ title, values, onValueSelect }) => {
  return (
    <div className={styles.menu}>
      <p className={styles.title}>{title}</p>
      <Divider direction="vertical" theme="light" />
      <div className={styles.buttons}>
        {values.map((value) => (
          <DropdownButton
            key={value}
            text={value}
            onClick={() => onValueSelect(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
