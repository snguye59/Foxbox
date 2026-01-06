import styles from "./VaultItemButton.module.css";
import Image from "next/image";
import { generateVaultItemInfo } from "src/helpers/vault";
import { itemCategories } from "src/data/vaultItemCategoriesData";

const VaultItemButton = ({ data, onClick }) => {
  const { name, category } = data;
  const info = generateVaultItemInfo(data);
  const icon = itemCategories.find((item) => item.type === category).icon;

  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <Image src={icon.image} alt={icon.name} width={42} height={42} />
      <div className={styles.texts}>
        <p>{name}</p>
        {info && <p>{info}</p>}
      </div>
    </button>
  );
};

export default VaultItemButton;
