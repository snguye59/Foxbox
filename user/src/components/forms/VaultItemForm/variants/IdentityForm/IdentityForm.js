import styles from "./IdentityForm.module.css";
import {
  TextInput,
  DateInput,
  SecureInput,
  DropdownInput,
  TextAreaInput,
} from "src/components/inputs";
import { useState } from "react";
import { DatePickerModal } from "src/components/modals";
import { OverlayBackground } from "src/components/backgrounds";

const IdentityForm = ({ data, onChange, onFormScroll }) => {
  const {
    title,
    birthday,
    firstName,
    middleName,
    lastName,
    username,
    company,
    ssn,
    passportNumber,
    licenseNumber,
    email,
    phoneNumber,
    address1,
    address2,
    city,
    state,
    country,
    zip,
    notes,
  } = data || {};
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
            <DatePickerModal
              name="birthday"
              value={birthday}
              onChange={(e) => {
                onChange(e);
                handleModalClose();
              }}
              onCancel={handleModalClose}
            />
          </div>
        </>
      )}
      <div className={styles.inputGroup}>
        <DropdownInput
          name="title"
          label="Title"
          value={title}
          icon="identity"
          placeholder="Select title"
          menuValues={["Mr", "Mrs", "Ms", "Dr"]}
          onChange={onChange}
        />
        <DateInput
          name="birthday"
          label="Birthday"
          value={birthday}
          icon="cake"
          onShowModal={handleModalOpen}
          onChange={onChange}
        />
        <span />
      </div>
      <div className={styles.inputGroup}>
        <TextInput
          name="firstName"
          label="First Name"
          value={firstName}
          onChange={onChange}
        />
        <TextInput
          name="middleName"
          label="Middle Name"
          value={middleName}
          onChange={onChange}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          value={lastName}
          onChange={onChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <TextInput
          name="username"
          label="Username"
          value={username}
          onChange={onChange}
        />
        <TextInput
          name="company"
          label="Company"
          value={company}
          onChange={onChange}
        />
        <span />
      </div>
      <div className={styles.inputGroup}>
        <SecureInput name="ssn" label="SSN" value={ssn} onChange={onChange} />
        <SecureInput
          name="passportNumber"
          label="Passport Number"
          value={passportNumber}
          onChange={onChange}
        />
        <SecureInput
          name="licenseNumber"
          label="License Number"
          value={licenseNumber}
          onChange={onChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <TextInput
          name="email"
          label="Email"
          value={email}
          onChange={onChange}
        />
        <TextInput
          name="phoneNumber"
          label="Phone Number"
          value={phoneNumber}
          onChange={onChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <TextInput
          name="address1"
          label="Address 1"
          value={address1}
          onChange={onChange}
        />
        <TextInput
          name="address2"
          label="Address 2"
          value={address2}
          onChange={onChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <TextInput
          name="city"
          label="City / Town"
          value={city}
          onChange={onChange}
        />
        <TextInput
          name="state"
          label="State / Province"
          value={state}
          onChange={onChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <TextInput
          name="country"
          label="Country"
          value={country}
          onChange={onChange}
        />
        <TextInput
          name="zip"
          label="Zip / Postal Code"
          value={zip}
          onChange={onChange}
        />
      </div>
      <TextAreaInput
        name="notes"
        label="Notes"
        value={notes}
        height="170px"
        onChange={onChange}
      />
    </>
  );
};

export default IdentityForm;
