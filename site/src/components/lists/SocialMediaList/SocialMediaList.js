import styles from "./SocialMediaList.module.css";
import Link from "next/link";
import Image from "next/image";
import { socialMediaLinksData } from "src/data/socialMediaLinksData";

const SocialMediaList = () => {
  return (
    <div className={styles.list}>
      {socialMediaLinksData.map((data) => {
        const { name, link, image } = data;

        return (
          <Link key={name} href={link}>
            <Image src={image} alt={name} width={32} height={32} />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialMediaList;
