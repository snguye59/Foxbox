import styles from "./VaultIllustrationMenu.module.css";
import { Divider } from "src/components/utils";
import { vaultIllustrationsData } from "src/data/vaultIllustrationsData";
import { VaultIllustrationButton } from "src/components/buttons";

const VaultIllustrationMenu = ({ name, onItemSelect }) => {
  return (
    <div className={styles.menu}>
      <p className={styles.title}>Illustrations</p>
      <Divider direction="vertical" theme="light" />
      <div className={styles.illustrations}>
        {vaultIllustrationsData.map((illustrations) => {
          let { category } = illustrations;

          return (
            <VaultIllustrationMenu.VaultIllustrationsList
              key={category}
              data={illustrations}
              onItemSelect={(item) =>
                onItemSelect({
                  target: {
                    name,
                    value: item,
                  },
                })
              }
            />
          );
        })}
      </div>
    </div>
  );
};

const VaultIllustrationsList = ({ data, onItemSelect }) => {
  const { items, category } = data;

  return (
    <div className={styles.list}>
      <p>{category}</p>
      <div className={styles.buttons}>
        {items.map((item) => {
          return (
            <VaultIllustrationButton
              key={item.name}
              data={item}
              size="small"
              onClick={() => onItemSelect(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

VaultIllustrationMenu.VaultIllustrationsList = VaultIllustrationsList;
VaultIllustrationsList.displayName = "VaultIllustrationsList";

export default VaultIllustrationMenu;
