"use client";

import styles from "./LoginPage.module.css";
import Image from "next/image";
import { useKey } from "src/hooks/useKey";
import { authService } from "src/services";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "src/hooks/useForm";
import { useUser } from "src/hooks/useUser";
import { useFiles } from "src/hooks/useFiles";
import { useVaults } from "src/hooks/useVaults";
import { useSearchParams } from "next/navigation";
import { useLoading } from "src/hooks/useLoading";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { LoginForm } from "src/components/forms";
import { LogoButton } from "src/components/buttons";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { handleKeysSet } = useKey();
  const { handleUserInfoSync } = useUser();
  const { handleFilesSync } = useFiles();
  const { handleVaultsRead } = useVaults();

  const [isError, setIsError] = useState(false);
  const { isLoading, handleAsyncOperation } = useLoading(3000);

  const { handleErrorDisplay } = useErrorDisplay();
  const { data, handleInputChange, handleFormInitialize } = useForm();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsError(false);

    await handleAsyncOperation(async () => {
      const { userInfo, error } = await authService.login(data);
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
      await handleFilesSync({
        path: `users/${uid}/files`,
        decryptionKey: secretKey,
      });

      router.replace("/user/dashboard");
    });
  }

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) handleFormInitialize({ email });

    const logoutCause = searchParams.get("logoutCause");
    if (logoutCause) console.log(logoutCause);
  }, []);

  return (
    <div className={styles.wrapper}>
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
            <LoginForm
              data={data}
              isError={isError}
              onChange={(e) => {
                handleInputChange(e);
                setIsError(false);
              }}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
