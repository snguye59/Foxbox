"use client";

import styles from "../ComponentsPage.module.css";
import {
  Divider,
  RangeSlider,
  ProgressBar,
  FormPageIndicator,
  PasswordStrengthMeter,
} from "src/components/utils";

const UtilsPage = () => {
  return (
    <div className={styles.wrapper}>
      <FormPageIndicator page="one" />
      <Divider width="100%" height="1px" direction="horizontal" theme="dark" />
      <ProgressBar progress="15%" />
      <RangeSlider value={24} onChange={() => {}} />
      <PasswordStrengthMeter strength="strong" />
    </div>
  );
};

export default UtilsPage;
