import styles from "./DateButton.module.css";

const DateButton = ({ text, isToday, isActive, isDisabled, onClick }) => {
  return (
    <button
      type="button"
      className={` 
        ${styles.button} 
        ${isToday ? styles.currentDate : ""}
        ${isActive ? styles.active : ""}
        ${isDisabled ? styles.disabled : ""}
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DateButton;
