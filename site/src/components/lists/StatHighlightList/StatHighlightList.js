import styles from "./StatHighlightList.module.css";

const StatHighlightList = ({ title, description, theme }) => {
  return (
    <div className={`${styles.list} ${styles[theme]}`}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default StatHighlightList;
