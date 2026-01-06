import styles from "./VaultItemOptionsMenu.module.css";
import Image from "next/image";
import { itemCategories } from "src/data/vaultItemCategoriesData";

const VaultItemOptionsMenu = ({ onCategorySelect }) => {
  return (
    <div className={styles.menu}>
      {itemCategories.map((category) => {
        const { text, type, icon } = category;
        const { name, image } = icon;

        return (
          <button
            type="button"
            key={text}
            className={styles.button}
            onClick={() => onCategorySelect(type)}
          >
            <Image src={image} alt={name} width={24} height={24} />
            {text}
          </button>
        );
      })}
    </div>
  );
};

export default VaultItemOptionsMenu;
