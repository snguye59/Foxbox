import styles from "./InfoTooltip.module.css";

const InfoTooltip = ({ data }) => {
  const { title, description } = data;

  return (
    <div className={styles.tooltip}>
      {title && <p className={styles.title}>{title}</p>}
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default InfoTooltip;
