import styles from "./VaultItemsWidget.module.css";
import NoMatchPlaceholder from "./placeholders/NoMatchPlaceholder";
import EmptyVaultPlaceholder from "./placeholders/EmptyVaultPlaceholder";
import { useState, useEffect, useRef } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { itemSortCriteriaData } from "src/data/itemSortCriteriaData";
import { useFilteredSortedItems } from "src/hooks/useFilteredSortedItems";
import { SvgIcon } from "src/components/icons";
import { Divider } from "src/components/utils";
import { SearchInput } from "src/components/inputs";
import { VaultItemButton } from "src/components/buttons";
import { VaultItemOptionsMenu } from "src/components/menus";
import { VaultItemsNavigation } from "src/components/navigations";

const VaultItemsWidget = ({ vault, items, onFormOpen }) => {
  const menuRef = useRef();
  const buttonRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({
    filteredBy: "all",
  });
  const [selectedSort, setSelectedSort] = useState({
    sortedBy: "Name",
    sortedOrder: "A-Z ordering",
  });

  const filteredSortedItems = useFilteredSortedItems(
    items,
    searchQuery,
    selectedFilter,
    selectedSort
  );

  function handleSortSelect(value) {
    const selectedOption = itemSortCriteriaData.find(
      (option) => option.label === value.sortedBy
    );
    const newSortedOrder =
      selectedOption.label !== selectedSort.sortedBy
        ? selectedOption.sortDirections[0]
        : value.sortedOrder;
    setSelectedSort({
      sortedBy: value.sortedBy,
      sortedOrder: newSortedOrder,
    });
  }

  useOutsideClick([menuRef, buttonRef], () => setShowMenu(false));

  useEffect(() => {
    const categorySet = new Set();
    const tagSet = new Set();

    Object.values(items).forEach((item) => {
      if (item.isDeleted) return;

      categorySet.add(item.category);

      if (item.tags) {
        item.tags.forEach((tag) => tagSet.add(tag));
      }
    });

    const updatedCategories = Array.from(categorySet);
    const updatedTags = Array.from(tagSet).sort((a, b) => a.length - b.length);

    setCategories(updatedCategories);
    setTags(updatedTags);

    const { filteredBy, category, tag } = selectedFilter;
    if (
      (filteredBy === "category" && !updatedCategories.includes(category)) ||
      (filteredBy === "tag" && !updatedTags.includes(tag))
    ) {
      setSelectedFilter({ filteredBy: "all" });
    }
  }, [items]);

  return (
    <div className={styles.widget}>
      <VaultItemsNavigation
        vault={vault}
        categories={categories}
        tags={tags}
        currentSort={selectedSort}
        currentFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
        onSortSelect={handleSortSelect}
      />
      {showMenu && (
        <div ref={menuRef} className={styles.menu}>
          <VaultItemOptionsMenu
            onCategorySelect={(category) => {
              onFormOpen({ category });
              setShowMenu(false);
            }}
          />
        </div>
      )}
      <div className={styles.items}>
        <div className={styles.actions}>
          <SearchInput
            name="query"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          {vault.id !== "all-vaults" && (
            <button
              ref={buttonRef}
              className={styles.addButton}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <SvgIcon icon="plus" size={16} />
            </button>
          )}
        </div>
        <Divider direction="vertical" theme="light" />
        {filteredSortedItems.length === 0 ? (
          Object.keys(items).length === 0 ? (
            <EmptyVaultPlaceholder />
          ) : (
            <NoMatchPlaceholder />
          )
        ) : (
          <div className={styles.itemList}>
            {filteredSortedItems.map((item) => (
              <VaultItemButton
                key={item.id}
                data={item}
                onClick={() => {
                  onFormOpen(item);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultItemsWidget;
