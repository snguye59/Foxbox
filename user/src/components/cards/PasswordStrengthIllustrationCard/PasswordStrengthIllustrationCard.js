import styles from "./PasswordStrengthIllustrationCard.module.css";
import Image from "next/image";
import { passwordStrengthIllustrationsData } from "src/data/passwordStrengthIllustrationsData";

const PasswordStrengthIllustrationCard = ({ length }) => {
  const { name, image, background } = passwordStrengthIllustrationsData[length];

  return (
    <div className={styles.card} style={{ background }}>
      <Image src={image} alt={name} width={180} height={180} />
    </div>
  );
};

export default PasswordStrengthIllustrationCard;
