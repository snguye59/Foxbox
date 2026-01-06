import styles from "./SecureInput.module.css";
import { useState, useRef } from "react";
import { SvgIcon } from "src/components/icons";

const SecureInput = ({
  name,
  label,
  value,
  isRequired,
  size,
  strength,
  minLength,
  maxLength,
  onBlur,
  onFocus,
  onChange,
}) => {
  const inputRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [showInput, setShowInput] = useState(false);

  function toggleShowInput() {
    const cursorPosition = inputRef.current.selectionStart;
    setShowInput(!showInput);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  }

  return (
    <div
      className={`
        ${styles.input} 
        ${isRequired ? styles.required : ""}
      `}
    >
      {label && (
        <label
          htmlFor={name}
          onClick={() => navigator.clipboard.writeText(value)}
        >
          {label}
        </label>
      )}
      <div
        className={`
          ${styles.field} 
          ${styles[size]}
          ${styles[strength]} 
          ${isHover ? styles.focus : ""}
        `}
      >
        <input
          id={name}
          name={name}
          type={showInput ? "text" : "password"}
          value={value || ""}
          ref={inputRef}
          required={isRequired}
          minLength={minLength}
          maxLength={maxLength}
          onBlur={(e) => {
            if (!isHover && onBlur) {
              onBlur(e);
            }
          }}
          onFocus={(e) => {
            if (onFocus) onFocus(e);
          }}
          onChange={onChange}
        />
        {value && (
          <button
            type="button"
            className={styles.button}
            onClick={toggleShowInput}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <SvgIcon icon={showInput ? "eyeSlash" : "eye"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SecureInput;
