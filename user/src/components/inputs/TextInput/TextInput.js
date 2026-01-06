import styles from "./TextInput.module.css";
import Image from "next/image";
import { useState } from "react";
import { InfoTooltip } from "src/components/tooltips";
import { TooltipButton } from "src/components/buttons";

const TextInput = ({
  name,
  label,
  type,
  info,
  value,
  placeholder,
  forwardedRef,
  showBongo,
  isRequired,
  isError,
  size,
  minLength,
  maxLength,
  onChange,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [image, setImage] = useState(
    "/images/app-illustrations/bongo-cat/left-paw-bongo.svg"
  );

  return (
    <div className={styles.input}>
      {label && (
        <div
          className={`
          ${styles.label} 
          ${isRequired ? styles.required : ""}
        `}
        >
          <label
            htmlFor={name}
            onClick={() => navigator.clipboard.writeText(value)}
          >
            {label}
          </label>
          {info && (
            <div
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            >
              {showInfo && (
                <div className={styles.tooltip}>
                  <InfoTooltip data={info} />
                </div>
              )}
              <TooltipButton
                icon="squareInfo"
                size={16}
                theme="light"
                position="top"
              />
            </div>
          )}
        </div>
      )}
      <div
        className={`
          ${styles.field} 
          ${styles[size]}
          ${isError ? styles.error : ""}
        `}
      >
        <input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          placeholder={placeholder}
          ref={forwardedRef}
          required={isRequired}
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e) => {
            onChange(e);
            setImage((prev) =>
              prev === "/images/app-illustrations/bongo-cat/left-paw-bongo.svg"
                ? "/images/app-illustrations/bongo-cat/right-paw-bongo.svg"
                : "/images/app-illustrations/bongo-cat/left-paw-bongo.svg"
            );
          }}
        />
      </div>
      {showBongo && (
        <Image
          className={styles.bongo}
          src={image}
          alt="bongo cat"
          width={48}
          height={48}
          priority
        />
      )}
    </div>
  );
};

export default TextInput;
