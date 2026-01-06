import styles from "./PasswordGeneratorModal.module.css";
import { useState, useEffect } from "react";
import { generateRandomPassword } from "src/helpers/password";
import { SvgIcon } from "src/components/icons";
import { RangeSlider } from "src/components/utils";
import { CheckboxInput } from "src/components/inputs";
import { CancelButton, SubmitButton } from "src/components/buttons";
import { PasswordStrengthIllustrationCard } from "src/components/cards";

const PasswordGeneratorModal = ({ name, onChange, onCancel }) => {
  const [password, setPassword] = useState();
  const [hiddenPassword, setHiddenPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [length, setLength] = useState(24);
  const [hasDigits, setHasDigits] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(true);
  const [hasLetters, setHasLetters] = useState(true);
  const [hasCapitals, setHasCapitals] = useState(false);

  function getNewPassword() {
    const newPassword = generateRandomPassword(
      length,
      hasDigits,
      hasSymbols,
      hasLetters,
      hasCapitals
    );
    setPassword(newPassword);
    setHiddenPassword(
      newPassword.substring(0, 3) +
        newPassword.substring(3).replace(/[\S]/g, "•")
    );
  }

  useEffect(() => {
    getNewPassword();
  }, [length, hasDigits, hasSymbols, hasLetters, hasCapitals]);

  return (
    <div className={styles.modal}>
      <PasswordStrengthIllustrationCard length={length} />
      <div className={styles.checkboxes}>
        <CheckboxInput
          name="digits"
          label="Digits"
          value={hasDigits}
          isDisabled={!hasSymbols && !hasLetters && !hasCapitals}
          onChange={() => setHasDigits(!hasDigits)}
        />
        <CheckboxInput
          name="symbols"
          label="Symbols"
          value={hasSymbols}
          isDisabled={!hasDigits && !hasLetters && !hasCapitals}
          onChange={() => setHasSymbols(!hasSymbols)}
        />
        <CheckboxInput
          name="letters"
          label="Letters"
          value={hasLetters}
          isDisabled={!hasDigits && !hasSymbols && !hasCapitals}
          onChange={() => setHasLetters(!hasLetters)}
        />
        <CheckboxInput
          name="capitals"
          label="Capitals"
          value={hasCapitals}
          isDisabled={!hasDigits && !hasSymbols && !hasLetters}
          onChange={() => setHasCapitals(!hasCapitals)}
        />
      </div>
      <RangeSlider
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <div className={styles.passwordBackground}>
        <p
          className={`
            ${styles.passwordText} 
            ${length === 32 ? styles.caption : ""}
            ${length === 40 ? styles.tiny : ""}
          `}
        >
          {showPassword ? password : hiddenPassword}
        </p>
      </div>
      <div className={styles.actions}>
        <div className={styles.utilityButtons}>
          <PasswordGeneratorModal.SquareButton
            icon="rotate"
            onClick={getNewPassword}
          />
          <PasswordGeneratorModal.SquareButton
            icon={showPassword ? "eyeSlash" : "eye"}
            onClick={() => setShowPassword(!showPassword)}
          />
          <PasswordGeneratorModal.SquareButton
            icon="documents"
            onClick={() => navigator.clipboard.writeText(password)}
          />
        </div>
        <div className={styles.submitButtons}>
          <CancelButton text="Nah" onClick={onCancel} />
          <SubmitButton
            text="Use"
            type="button"
            background="blue"
            onClick={() =>
              onChange({
                target: {
                  name,
                  value: password,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

const SquareButton = ({ icon, onClick }) => {
  return (
    <button type="button" className={styles.squareButton} onClick={onClick}>
      <SvgIcon icon={icon} />
    </button>
  );
};

PasswordGeneratorModal.SquareButton = SquareButton;
SquareButton.displayName = "SquareButton";

export default PasswordGeneratorModal;
