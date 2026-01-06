import styles from "./ProfileForm.module.css";
import { useState } from "react";
import {
  TextInput,
  DateInput,
  CountryInput,
  TextAreaInput,
  DropdownInput,
} from "src/components/inputs";
import { AvatarBadge } from "src/components/badges";
import { DatePickerModal } from "src/components/modals";
import { OverlayBackground } from "src/components/backgrounds";
import { CancelButton, SubmitButton } from "src/components/buttons";

const ProfileForm = ({ data, isLoading, onChange, onSubmit, onClose }) => {
  const { name, avatar, gender, birthday, country, summary } = data || {};

  const [showModal, setShowModal] = useState(false);

  function handleModalClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  return (
    <form className={styles.form}>
      {showModal && (
        <>
          <OverlayBackground position="absolute" />
          <div className={styles.modal} onClick={handleModalClose}>
            <DatePickerModal
              name="birthday"
              value={birthday}
              onChange={(e) => {
                onChange(e);
                setShowModal(false);
              }}
              onCancel={handleModalClose}
            />
          </div>
        </>
      )}
      <div className={styles.sections}>
        <h5>Edit profile</h5>
        <div className={styles.name}>
          <AvatarBadge data={avatar} size={86} />
          <TextInput
            name="name"
            label="Name"
            value={name}
            maxLength={100}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <DropdownInput
            name="gender"
            label="Gender"
            value={gender}
            icon="gender"
            placeholder="Select gender"
            menuValues={["Male", "Female", "Non-binary", "Other"]}
            onChange={onChange}
          />
          <DateInput
            name="birthday"
            label="Birthday"
            value={birthday}
            icon="cake"
            onShowModal={() => setShowModal(true)}
            onChange={onChange}
          />
        </div>
        <CountryInput name="country" value={country} onChange={onChange} />
        <TextAreaInput
          name="summary"
          label="Summary"
          value={summary}
          placeholder="Tell us about yourself (interests, experience, etc.)"
          height="125px"
          onChange={onChange}
        />
        <div className={styles.buttons}>
          <CancelButton text="Cancel" onClick={onClose} />
          <SubmitButton
            text="Update"
            type="submit"
            isLoading={isLoading}
            background="blue"
            onClick={onSubmit}
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
