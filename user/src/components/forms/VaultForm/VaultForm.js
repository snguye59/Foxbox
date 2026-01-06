import styles from "./VaultForm.module.css";
import FirstForm from "./variants/FirstForm";
import SecondForm from "./variants/SecondForm";
import { useState, useRef } from "react";
import { CloseButton } from "src/components/buttons";
import { FormPageIndicator } from "src/components/utils";

const VaultForm = ({ data, isLoading, onChange, onSubmit, onClose }) => {
  const formRef = useRef(null);
  const [page, setPage] = useState("one");

  function handleValidationTrigger(e) {
    e.preventDefault();
    if (formRef.current.reportValidity()) {
      setPage("two");
    }
  }

  return (
    <form ref={formRef} className={styles.form}>
      <div className={styles.button}>
        <CloseButton size={16} onClick={onClose} />
      </div>
      <div className={styles.content}>
        {page === "one" ? (
          <FirstForm
            data={data}
            onChange={onChange}
            onPageForward={handleValidationTrigger}
          />
        ) : (
          <SecondForm
            data={data}
            isLoading={isLoading}
            onChange={onChange}
            onSubmit={onSubmit}
            onPageBackward={() => setPage("one")}
          />
        )}
        <FormPageIndicator page={page} />
      </div>
    </form>
  );
};

export default VaultForm;
