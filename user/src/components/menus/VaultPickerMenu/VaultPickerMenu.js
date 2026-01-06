import styles from "./VaultPickerMenu.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SvgIcon } from "src/components/icons";
import { VaultIllustrationButton } from "src/components/buttons";

const VaultPickerMenu = ({ data, onClick }) => {
  const { vaultId = "all-vaults" } = useParams();

  return (
    <div className={styles.menu}>
      {Object.keys(data).map((key) => {
        const { id, name, size, link, illustration } = data[key];

        return (
          <Link
            key={id}
            href={link}
            className={` 
              ${styles.button} 
              ${id === vaultId ? styles.active : ""}
            `}
            onClick={onClick}
          >
            <SvgIcon icon="gripDots" size={12} />
            <VaultIllustrationButton data={illustration} size="big" />
            <div className={styles.texts}>
              <p>{name}</p>
              <p>{`${size} ${size > 1 ? "items" : "item"}`}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VaultPickerMenu;
