import styles from "./IdleModal.module.css";
import { CancelButton, SubmitButton } from "src/components/buttons";

const IdleModal = ({ text, onSubmit, onCancel }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.texts}>
        <p>👋&nbsp;&nbsp;&nbsp;&nbsp;🦊&nbsp;&nbsp;&nbsp;&nbsp;🔥</p>
        <p>Stay with your account</p>
        <p>
          Your session will time out due to inactivity. Please select to stay
          signed in or log off.
        </p>
      </div>
      <div className={styles.buttons}>
        <CancelButton text="Log Off" onClick={onCancel} />
        <SubmitButton
          text={`Stay Active (0:${text})`}
          type="button"
          background="blue"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default IdleModal;
