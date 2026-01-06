import styles from "./VaultItemsFilterList.module.css";
import Image from "next/image";
import { useState } from "react";
import { SvgIcon } from "src/components/icons";

const VaultItemsFilterList = ({ children, title, isExpandable }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.list}>
      {isExpandable && (
        <button
          type="button"
          className={`
            ${styles.chevronButton} 
            ${isExpanded ? styles.expanded : ""}
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <SvgIcon icon="angle" size={12} />
          {title}
        </button>
      )}
      <div
        className={`
          ${styles.filterGroup} 
          ${isExpanded ? styles.show : styles.hide}
        `}
      >
        {children}
      </div>
    </div>
  );
};

const FilterButton = ({ data, isActive, onClick }) => {
  const { text, icon } = data;
  const { name, image } = icon;

  return (
    <button
      type="button"
      className={` 
        ${styles.filterButton} 
        ${isActive ? styles.active : ""}
      `}
      onClick={onClick}
    >
      <Image src={image} alt={name} width={24} height={24} />
      <p>{text}</p>
    </button>
  );
};

VaultItemsFilterList.FilterButton = FilterButton;
FilterButton.displayName = "FilterButton";

export default VaultItemsFilterList;
