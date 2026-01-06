"use client";

import styles from "./DashboardPage.module.css";
import Link from "next/link";
import { useState } from "react";
import { useKey } from "src/hooks/useKey";
import { useForm } from "src/hooks/useForm";
import { useUser } from "src/hooks/useUser";
import { useVaults } from "src/hooks/useVaults";
import { useLoading } from "src/hooks/useLoading";
import { VaultForm } from "src/components/forms";
import { VaultCard } from "src/components/cards";
import { NewEntryButton } from "src/components/buttons";
import { OverlayBackground } from "src/components/backgrounds";

const DashboardPage = () => {
  const { uid, profile } = useUser();
  const { name } = profile || {};

  const { vaults, handleVaultCreate } = useVaults();
  const { secretKey } = useKey();
  const { isLoading, handleAsyncOperation } = useLoading(500);

  const [showForm, setShowForm] = useState(false);
  const { data, handleInputChange, handleFormReset } = useForm();

  function handleFormOpen() {
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
    handleFormReset();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const pathData = {
      path: `users/${uid}/vaults`,
      data,
      encryptionKey: secretKey,
    };
    await handleAsyncOperation(async () => {
      await handleVaultCreate(pathData);
    });
    handleFormClose();
  }

  return (
    <div className={styles.wrapper}>
      {showForm && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.form}>
            <VaultForm
              data={data}
              isLoading={isLoading}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onClose={handleFormClose}
            />
          </div>
        </>
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.texts}>
          <h5>🦊 Welcome to Foxbox, {name}</h5>
          <p>
            Discover more features. Check out our{" "}
            <Link href={{ pathname: "/user/dashboard" }}>user guide</Link> to get
            started📝
          </p>
      </div>
        <div className={styles.vaults}>
          <NewEntryButton text="New vault" onClick={handleFormOpen} />
          <div className={styles.cards}>
            {Object.keys(vaults).map((key) => (
              <VaultCard key={key} data={vaults[key]} />
            ))}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
