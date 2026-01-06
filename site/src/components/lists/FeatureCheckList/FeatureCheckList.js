import styles from "./FeatureCheckList.module.css";
import { useState } from "react";
import { SvgIcon } from "src/components/icons";
import { InfoTooltip } from "src/components/tooltips";
import { TooltipButton } from "src/components/buttons";

const FeatureCheckList = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};

const KeyFeature = ({ data, tooltipPosition, theme }) => {
  const { name, description, isHighlighted } = data;
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className={`
        ${styles.feature} 
        ${styles[theme]} 
        ${isHighlighted ? styles.highlight : ""}
      `}
    >
      <div className={styles.icon}>
        <SvgIcon icon="circleCheck" />
      </div>
      {name}
      {description && (
        <div
          className={`${styles.button} ${styles[tooltipPosition]}`}
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        >
          {showDescription && (
            <div className={`${styles.tooltip} ${styles[tooltipPosition]}`}>
              <InfoTooltip data={{ description }} />
            </div>
          )}
          <TooltipButton
            icon="circleQuestion"
            size={20}
            theme={theme}
            position={tooltipPosition}
          />
        </div>
      )}
    </div>
  );
};

FeatureCheckList.KeyFeature = KeyFeature;
KeyFeature.displayName = "KeyFeature";

export default FeatureCheckList;
