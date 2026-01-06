import styles from "./CalendarNavigationButton.module.css";
import { SvgIcon } from "src/components/icons";

const CalendarNavigationButton = ({ dateInterval, direction, onClick }) => {
  const icon = dateInterval === "month" ? "angle" : "doubleAngle";

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[direction]}`}
      onClick={onClick}
    >
      <SvgIcon icon={icon} size={12} />
    </button>
  );
};

export default CalendarNavigationButton;
