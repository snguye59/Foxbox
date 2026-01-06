import styles from "./TooltipButton.module.css";
import { useState } from "react";
import { SvgIcon } from "src/components/icons";

const TooltipButton = ({ icon, size, theme, position }) => {
  const [showArrow, setShowArrow] = useState(false);

  return (
    <button
      type="button"
      className={`
        ${styles.button} 
        ${styles[theme]}
        ${styles[position]}
        ${showArrow ? styles.showArrow : ""}
      `}
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
    >
      <SvgIcon icon={icon} size={size} />
    </button>
  );
};

export default TooltipButton;
