import styles from "./AccountForm.module.css";
import { useState } from "react";
import { SvgIcon } from "src/components/icons";
import { OverlayBackground } from "src/components/backgrounds";
import { PasswordGeneratorModal } from "src/components/modals";
import { TextInput, SecureInput, TextAreaInput } from "src/components/inputs";

const AccountForm = ({ data, onChange, onFormScroll }) => {
  const { website, username, password, notes } = data || {};
  const [showModal, setShowModal] = useState(false);

  function handleModalOpen() {
    setShowModal(true);
    onFormScroll(0);
  }

  function handleModalClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  return (
    <>
      {showModal && (
        <>
          <OverlayBackground position="absolute" />
          <div className={styles.modal} onClick={handleModalClose}>
            <PasswordGeneratorModal
              name="password"
              onChange={(e) => {
                onChange(e);
                handleModalClose();
              }}
              onCancel={handleModalClose}
            />
          </div>
        </>
      )}
      <TextInput
        name="website"
        label="Website"
        value={website}
        onChange={onChange}
      />
      <div className={styles.inputGroup}>
        <TextInput
          name="username"
          label="Username"
          value={username}
          onChange={onChange}
        />
        <div className={styles.password}>
          <button type="button" onClick={handleModalOpen}>
            <SvgIcon icon="key" />
          </button>
          <SecureInput
            name="password"
            label="Password"
            value={password}
            onChange={onChange}
          />
        </div>
      </div>
      <TextAreaInput
        name="notes"
        label="Notes"
        value={notes}
        height="130px"
        onChange={onChange}
      />
    </>
  );
};

export default AccountForm;
