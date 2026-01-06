"use client";

import styles from "./RegisterPage.module.css";
import Image from "next/image";
import { useKey } from "src/hooks/useKey";
import { authService } from "src/services";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "src/hooks/useForm";
import { useUser } from "src/hooks/useUser";
import { useVaults } from "src/hooks/useVaults";
import { useLoading } from "src/hooks/useLoading";
import { useSearchParams } from "next/navigation";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { calculatePasswordStrength } from "src/helpers/password";
import { RegisterForm } from "src/components/forms";
import { LogoButton } from "src/components/buttons";
import { WarningModal } from "src/components/modals";
import { OverlayBackground } from "src/components/backgrounds";

const RegisterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [strength, setStrength] = useState();
  const [suggestion, setSuggestion] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [showSignIcon, setShowSignIcon] = useState(false);

  const { handleKeysSet } = useKey();
  const { handleUserInfoSync } = useUser();
  const { handleVaultsRead } = useVaults();

  const [isError, setIsError] = useState(false);
  const { isLoading, handleAsyncOperation } = useLoading(3000);

  const { handleErrorDisplay } = useErrorDisplay();
  const { data, handleInputChange, handleFormInitialize } = useForm();

  function handleModalClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowWarning(false);
    }
  }

  async function handleStrengthTest(e) {
    e.preventDefault();

    if (strength === "weak" || strength === "fair") {
      setShowWarning(true);
      return;
    }
    await handleSubmit();
  }

  function handlePasswordChange(e) {
    handleInputChange(e);

    if (e.target.value.length >= 8) {
      const { label, message } = calculatePasswordStrength(e.target.value);
      setStrength(label);
      setSuggestion(message);
      setShowSignIcon(true);
      return;
    }
    setStrength();
    setShowSignIcon(false);
    setSuggestion(
      "Your password needs to be at least 8 characters. Include multiple words and phrases to make it more secure."
    );
  }

  function handlePasswordFocus(e) {
    if (e.target.value.length < 8) {
      setStrength();
      setShowSignIcon(false);
      setSuggestion(
        "Your password needs to be at least 8 characters. Include multiple words and phrases to make it more secure."
      );
    }
  }

  function handlePasswordBlur(e) {
    if (e.target.value.length === 0) {
      setSuggestion();
      return;
    }
    if (e.target.value.length < 8) {
      setStrength("weak");
      setShowSignIcon(true);
      setSuggestion(
        "Your password is not strong enough. Your password must be at least 8 characters."
      );
    }
  }

  async function handleSubmit() {
    setShowWarning(false);

    setIsError(false);

    await handleAsyncOperation(async () => {
      const { userInfo, error } = await authService.register(data);
      if (error) {
        setIsError(true);
        handleErrorDisplay(error);
        return;
      }
      const { uid, keys } = userInfo;
      const { secretKey } = keys;

      handleUserInfoSync(userInfo);
      handleKeysSet(keys);
      await handleVaultsRead({
        path: `users/${uid}/vaults`,
        decryptionKey: secretKey,
      });

      router.replace("/user/dashboard");
    });
  }

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) handleFormInitialize({ email });
  }, []);

  return (
    <div className={styles.wrapper}>
      {showWarning && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.modal} onClick={handleModalClose}>
            <WarningModal
              title="Weak Master Password"
              description="The master password you have chosen is weak. Are you sure you want to use this password?"
              onSubmit={handleSubmit}
              onCancel={handleModalClose}
            />
          </div>
        </>
      )}
      <div className={styles.contentWrapper}>
        {isLoading ? (
          <Image
            src="/images/animated-illustrations/fox-in-box.svg"
            alt="fox in box"
            width={280}
            height={328}
            priority
          />
        ) : (
          <>
            <div className={styles.button}>
              <LogoButton link="https://foxbox.sh" showText />
            </div>
            <RegisterForm
              data={data}
              isError={isError}
              strength={strength}
              suggestion={suggestion}
              showSignIcon={showSignIcon}
              onChange={(e) => {
                handleInputChange(e);
                setIsError(false);
              }}
              onPasswordBlur={handlePasswordBlur}
              onPasswordFocus={handlePasswordFocus}
              onPasswordChange={handlePasswordChange}
              onSubmit={handleStrengthTest}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
