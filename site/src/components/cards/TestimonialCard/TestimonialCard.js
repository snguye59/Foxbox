import styles from "./TestimonialCard.module.css";
import { AvatarBadge } from "src/components/badges";

const TestimonialCard = ({ data }) => {
  const { avatar, profession, description } = data;

  return (
    <div className={styles.card}>
      <AvatarBadge data={avatar} size={40} />
      <div className={styles.texts}>
        <p>{avatar.name}</p>
        <p>{profession}</p>
        <p>{`"${description}"`}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
