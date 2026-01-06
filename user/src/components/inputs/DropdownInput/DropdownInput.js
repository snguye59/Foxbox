import styles from "./DropdownInput.module.css";
import { useState, useRef } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { SvgIcon } from "src/components/icons";
import { InputBadge } from "src/components/badges";
import { DropdownMenu } from "src/components/menus";

const DropdownInput = ({
  name,
  label,
  value,
  icon,
  placeholder,
  menuValues,
  onChange,
}) => {
  const menuRef = useRef();
  const iconRef = useRef();
  const inputRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useOutsideClick([menuRef, iconRef], () => setShowMenu(false), [inputRef]);

  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <div
        className={`
          ${styles.field} 
          ${showMenu ? styles.focus : ""}
        `}
      >
        {value ? (
          <InputBadge
            value={value}
            onDelete={() => {
              onChange({
                target: {
                  name,
                },
              });
              setShowMenu(true);
            }}
          />
        ) : (
          <>
            <label htmlFor={name} className={styles.label}>
              <SvgIcon icon={icon} />
            </label>
            <input
              id={name}
              placeholder={placeholder}
              ref={inputRef}
              onKeyDown={(e) => e.preventDefault()}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              onChange={() => {}}
            />
            <button
              type="button"
              ref={iconRef}
              className={styles.button}
              onClick={() => setShowMenu(!showMenu)}
            >
              <SvgIcon icon="angle" size={12} />
            </button>
          </>
        )}
      </div>
      {showMenu && (
        <div ref={menuRef} className={styles.menu}>
          <DropdownMenu
            title={label}
            values={menuValues}
            onValueSelect={(value) => {
              onChange({
                target: {
                  name,
                  value,
                },
              });
              setShowMenu(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
