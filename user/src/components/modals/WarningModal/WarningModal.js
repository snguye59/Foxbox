import styles from "./WarningModal.module.css";
import { ContextualBadge } from "src/components/badges";
import { CancelButton, SubmitButton } from "src/components/buttons";

const WarningModal = ({
  title,
  description,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className={styles.modal}>
      <ContextualBadge type="error" icon="circleExclamation" size="big" />
      <div className={styles.texts}>
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div className={styles.buttons}>
        <CancelButton text="Back" onClick={onCancel} />
        <SubmitButton
          text="Yes"
          type="button"
          isLoading={isLoading}
          background="error"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default WarningModal;
