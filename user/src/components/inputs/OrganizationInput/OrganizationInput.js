import styles from "./OrganizationInput.module.css";
import { InputBadge } from "src/components/badges";

const OrganizationInput = ({ value }) => {
  return (
    <div className={styles.input}>
      <label>Organization</label>
      <div className={styles.field}>
        {value ? (
          <InputBadge value={value.name} avatar={value.avatar} />
        ) : (
          <InputBadge value="No Organization" />
        )}
      </div>
    </div>
  );
};

export default OrganizationInput;
