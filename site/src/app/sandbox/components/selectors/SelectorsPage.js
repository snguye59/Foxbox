"use client";

import styles from "../ComponentsPage.module.css";
import { PricingPlanSelector } from "src/components/selectors";

const SelectorsPage = () => {
  return (
    <div className={styles.wrapper}>
      <PricingPlanSelector plan="monthly" onPlanSelect={() => {}} />
    </div>
  );
};

export default SelectorsPage;
