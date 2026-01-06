import styles from "./CountryInput.module.css";
import Image from "next/image";
import { useState, useRef } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { SvgIcon } from "src/components/icons";
import { CountriesMenu } from "src/components/menus";

const CountryInput = ({ name, value, onChange }) => {
  const menuRef = useRef();
  const iconRef = useRef();
  const inputRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useOutsideClick([menuRef, iconRef], () => setShowMenu(false), [inputRef]);

  return (
    <div className={styles.input}>
      <label htmlFor={name}>Country</label>
      <div
        className={`
          ${styles.field} 
          ${showMenu ? styles.focus : ""}
        `}
      >
        <label htmlFor={name} className={styles.label}>
          <Image src={value.icon} alt={name} width={24} height={24} />
        </label>
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
        <button
          type="button"
          ref={iconRef}
          className={styles.button}
          onClick={() => setShowMenu(!showMenu)}
        >
          <SvgIcon icon="angle" size={12} />
        </button>
      </div>
      {showMenu && (
        <div ref={menuRef} className={styles.menu}>
          <CountriesMenu
            onCountrySelect={(value) => {
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

export default CountryInput;
