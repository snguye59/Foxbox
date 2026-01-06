import styles from "./ActivityMetricList.module.css";
import { activityMetricsData } from "src/data/activityMetricsData";

const ActivityMetricList = ({ type }) => {
  const metric = activityMetricsData.find((metric) => metric.type === type);

  return <div className={`${styles.list} ${styles[type]}`}>{metric.label}</div>;
};

export default ActivityMetricList;
