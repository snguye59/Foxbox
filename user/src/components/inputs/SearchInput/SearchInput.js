import styles from "./SearchInput.module.css";
import { SvgIcon } from "src/components/icons";

const SearchInput = ({
  name,
  value,
  placeholder,
  isBottomSquare,
  onChange,
}) => {
  return (
    <div
      className={`
        ${styles.input} 
        ${isBottomSquare ? styles.squareBottom : ""}
      `}
    >
      <label
        htmlFor={name}
        onClick={() => navigator.clipboard.writeText(value)}
      >
        <SvgIcon icon="magnifyingGlass" size={16} />
      </label>
      <input
        id={name}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        maxLength={1000}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
