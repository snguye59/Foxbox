import styles from "./VaultIllustrationInput.module.css";
import { useState, useRef } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { VaultIllustrationMenu } from "src/components/menus";
import { VaultIllustrationButton } from "src/components/buttons";

const VaultIllustrationInput = ({ name, value, onChange }) => {
  const menuRef = useRef();
  const inputRef = useRef();
  const buttonRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useOutsideClick([menuRef, buttonRef], () => setShowMenu(false), [inputRef]);

  return (
    <div className={styles.input}>
      <label htmlFor={name}>Vault illustration</label>
      <div
        className={`
          ${styles.field} 
          ${showMenu ? styles.focus : ""}
        `}
      >
        <input
          id={name}
          value={value.name}
          ref={inputRef}
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          onChange={() => {}}
        />
        <div ref={buttonRef} className={styles.button}>
          <VaultIllustrationButton
            data={value}
            size="small"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
      {showMenu && (
        <div ref={menuRef} className={styles.menu}>
          <VaultIllustrationMenu
            name={name}
            onItemSelect={(item) => {
              onChange(item);
              setShowMenu(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VaultIllustrationInput;
