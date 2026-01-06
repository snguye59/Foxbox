import styles from "./CancelButton.module.css";

const CancelButton = ({ text, onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default CancelButton;
