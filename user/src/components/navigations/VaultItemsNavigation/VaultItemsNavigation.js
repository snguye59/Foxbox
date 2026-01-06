import styles from "./VaultItemsNavigation.module.css";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  itemCategories,
  generalCategories,
} from "src/data/vaultItemCategoriesData";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { SvgIcon } from "src/components/icons";
import { ItemSortMenu } from "src/components/menus";
import { VaultItemsFilterList } from "src/components/lists";
import { VaultIllustrationButton } from "src/components/buttons";

const VaultItemsNavigation = ({
  vault,
  categories,
  tags,
  currentSort,
  currentFilter,
  onSortSelect,
  onFilterSelect,
}) => {
  const menuRef = useRef();
  const buttonRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const { id, name, size, link, illustration } = vault;

  useOutsideClick([menuRef, buttonRef], () => setShowMenu(false));

  return (
    <div className={styles.navigation}>
      {showMenu && (
        <div ref={menuRef} className={styles.menu}>
          <ItemSortMenu
            size={size}
            value={currentSort}
            onValueSelect={onSortSelect}
          />
        </div>
      )}
      <div className={styles.header}>
        <Link href={link} className={styles.vaultLink}>
          <VaultIllustrationButton data={illustration} size="big" />
          <p>{id === "all-vaults" ? "All Vaults" : name}</p>
        </Link>
        <button
          type="button"
          ref={buttonRef}
          className={` 
            ${styles.sortButton} 
            ${showMenu ? styles.active : ""}
          `}
          onClick={() => setShowMenu(!showMenu)}
        >
          <SvgIcon icon="arrowSort" size={22} />
        </button>
      </div>
      <div className={styles.primaryNavigation}>
        <VaultItemsFilterList>
          {generalCategories.map((category) => {
            const { type } = category;

            return (
              <VaultItemsFilterList.FilterButton
                key={type}
                data={category}
                isActive={currentFilter.filteredBy === type}
                onClick={() => {
                  onFilterSelect({ filteredBy: type });
                }}
              />
            );
          })}
        </VaultItemsFilterList>
        <VaultItemsFilterList title="Category" isExpandable>
          {itemCategories
            .filter((category) => categories.includes(category.type))
            .map((category) => {
              const { type } = category;

              return (
                <VaultItemsFilterList.FilterButton
                  key={type}
                  data={category}
                  isActive={
                    currentFilter.filteredBy === "category" &&
                    currentFilter.category === type
                  }
                  onClick={() => {
                    onFilterSelect({
                      filteredBy: "category",
                      category: type,
                    });
                  }}
                />
              );
            })}
        </VaultItemsFilterList>
        <VaultItemsFilterList title="Tags" isExpandable>
          {tags.map((tag) => {
            return (
              <VaultItemsFilterList.FilterButton
                key={tag}
                data={{
                  text: tag,
                  icon: {
                    name: "Tag",
                    image: "/images/colored-icons/tag.svg",
                  },
                }}
                isActive={
                  currentFilter.filteredBy === "tag" &&
                  currentFilter.tag === tag
                }
                onClick={() => {
                  onFilterSelect({
                    filteredBy: "tag",
                    tag,
                  });
                }}
              />
            );
          })}
        </VaultItemsFilterList>
      </div>
    </div>
  );
};

export default VaultItemsNavigation;
