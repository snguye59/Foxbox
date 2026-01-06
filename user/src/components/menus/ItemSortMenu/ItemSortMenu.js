import styles from "./ItemSortMenu.module.css";
import { itemSortCriteriaData } from "src/data/itemSortCriteriaData";
import { Divider } from "src/components/utils";
import { DropdownButton } from "src/components/buttons";

const ItemSortMenu = ({ size, value, onValueSelect }) => {
  const { sortedBy, sortedOrder } = value;
  const { sortDirections } = itemSortCriteriaData.find(
    (option) => option.label === sortedBy
  );

  return (
    <div className={styles.menu}>
      <p className={styles.title}>{size} items sorted by</p>
      <div className={styles.buttons}>
        <div>
          {itemSortCriteriaData.map((option) => {
            const { label } = option;

            return (
              <DropdownButton
                key={label}
                text={label}
                isActive={sortedBy === label}
                onClick={() => {
                  onValueSelect({ ...value, sortedBy: label });
                }}
              />
            );
          })}
        </div>
        <Divider direction="vertical" theme="light" />
        <div>
          {sortDirections.map((label) => {
            return (
              <DropdownButton
                key={label}
                text={label}
                isActive={sortedOrder === label}
                onClick={() => {
                  onValueSelect({ ...value, sortedOrder: label });
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemSortMenu;
