import styles from "./PasswordPromptModal.module.css";
import { useState } from "react";
import { authService } from "src/services";
import { useForm } from "src/hooks/useForm";
import { useUser } from "src/hooks/useUser";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { SecureInput } from "src/components/inputs";
import { ContextualBadge } from "src/components/badges";
import { CancelButton, SubmitButton } from "src/components/buttons";

const PasswordPromptModal = ({ onPasswordVerify, onCancel }) => {
  // const {
  //   profile: { email },
  // } = useUser();
  const { data, handleInputChange } = useForm();
  const [isError, setIsError] = useState(false);
  const { handleErrorDisplay } = useErrorDisplay();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsError(false);

    const credential = {
      email: "mehoy@gmail.com",
      password: data.password,
    };
    const { success, error } = await authService.reauthenticate(credential);

    if (error) {
      handleErrorDisplay(error);
      setIsError(true);
      return;
    }

    onPasswordVerify();
  }

  return (
    <form
      className={`
        ${styles.modal} 
        ${isError ? styles.showError : ""}
      `}
      onSubmit={handleSubmit}
    >
      <ContextualBadge type="info" icon="lock" size="big" />
      <div className={styles.texts}>
        <p>This content is password protected</p>
        <p>Please enter your password.</p>
      </div>
      <SecureInput
        name="password"
        value={data?.password}
        isRequired
        strength={isError ? "weak" : ""}
        onChange={(e) => {
          handleInputChange(e);
          setIsError(false);
        }}
      />
      <div className={styles.buttons}>
        <CancelButton text="Back" onClick={onCancel} />
        <SubmitButton text="Yes" type="submit" background="blue" />
      </div>
    </form>
  );
};

export default PasswordPromptModal;
