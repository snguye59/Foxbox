import styles from "./FaqCard.module.css";
import { SvgIcon } from "src/components/icons";

const FaqCard = ({ data }) => {
  const { question, answer, icon } = data;

  return (
    <div className={styles.card}>
      <div className={styles.question}>
        <h5>{question}</h5>
        <div className={styles.badge}>
          <div className={styles.iconBackground}>
            <SvgIcon icon={icon} />
          </div>
        </div>
      </div>
      <p className={styles.answer}>{answer}</p>
    </div>
  );
};

export default FaqCard;
