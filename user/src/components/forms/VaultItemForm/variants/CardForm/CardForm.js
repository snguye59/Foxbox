import styles from "./CardForm.module.css";
import { useState } from "react";
import {
  TextInput,
  DateInput,
  SecureInput,
  TextAreaInput,
  DropdownInput,
} from "src/components/inputs";
import { MonthPickerModal } from "src/components/modals";
import { OverlayBackground } from "src/components/backgrounds";

const CardForm = ({ data, onChange, onFormScroll }) => {
  const { cardholder, brand, cardNumber, cvv, expirationDate, notes } =
    data || {};
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
            <MonthPickerModal
              name="expirationDate"
              value={expirationDate}
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
        <TextInput
          name="cardholder"
          label="Cardholder Name"
          value={cardholder}
          onChange={onChange}
        />
        <DropdownInput
          name="brand"
          label="Brand"
          value={brand}
          icon="creditCard"
          placeholder="Select brand"
          menuValues={[
            "Visa",
            "MasterCard",
            "American Express",
            "Discover",
            "UnionPay",
            "Other",
          ]}
          onChange={onChange}
        />
      </div>
      <SecureInput
        name="cardNumber"
        label="Card Number"
        value={cardNumber}
        onChange={onChange}
      />
      <div className={styles.inputGroup}>
        <SecureInput
          name="cvv"
          label="Security Code (CVV)"
          value={cvv}
          onChange={onChange}
        />
        <DateInput
          name="expirationDate"
          label="Expiration Date"
          value={expirationDate}
          icon="calendar"
          onShowModal={handleModalOpen}
          onChange={onChange}
        />
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

export default CardForm;
