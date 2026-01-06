import styles from "./FirstForm.module.css";
import { useRef, useEffect } from "react";
import { getRandomVaultIllustration } from "src/helpers/vault";
import {
  TextInput,
  ToggleSwitchInput,
  OrganizationInput,
  VaultIllustrationInput,
} from "src/components/inputs";
import { SubmitButton } from "src/components/buttons";

const FirstForm = ({ data, onChange, onPageForward }) => {
  const nameRef = useRef();
  const {
    id,
    name,
    organization,
    illustration,
    activityTrack,
    passwordPrompt,
  } = data || {};

  useEffect(() => {
    if (!id) nameRef.current.focus();

    if (!illustration) {
      const illustration = getRandomVaultIllustration();

      onChange({
        target: {
          name: "illustration",
          value: illustration,
        },
      });
    }
  }, []);

  return (
    <div className={styles.sections}>
      <h5>{id ? "Modify vault" : "Create new vault"}</h5>
      <TextInput
        name="name"
        label="Name of the vault"
        value={name}
        placeholder="e.g. Personal Vault"
        forwardedRef={nameRef}
        isRequired
        maxLength={100}
        onChange={onChange}
      />
      <div className={styles.inputGroup}>
        <OrganizationInput organization={organization} />
        {illustration && (
          <VaultIllustrationInput
            name="illustration"
            value={illustration}
            onChange={onChange}
          />
        )}
      </div>
      <div className={styles.toggleSwitchInput}>
        <p>Activity track</p>
        <ToggleSwitchInput
          name="activityTrack"
          value={activityTrack}
          size="small"
          onChange={onChange}
        />
      </div>
      <div className={styles.toggleSwitchInput}>
        <div className={styles.texts}>
          <p>Master password re-prompt</p>
          <p>
            A vault activated with master password re-prompt can only be
            accessed by re-entering the master password.
          </p>
        </div>
        <ToggleSwitchInput
          name="passwordPrompt"
          value={passwordPrompt}
          size="small"
          onChange={onChange}
        />
      </div>
      <div className={styles.button}>
        <SubmitButton
          text="Next"
          type="button"
          background="blue"
          onClick={onPageForward}
        />
      </div>
    </div>
  );
};

export default FirstForm;
