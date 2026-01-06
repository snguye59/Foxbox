"use client";

import styles from "./VaultPage.module.css";
import Image from "next/image";
import { useState } from "react";
import { useKey } from "src/hooks/useKey";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "src/hooks/useForm";
import { useUser } from "src/hooks/useUser";
import { useVaults } from "src/hooks/useVaults";
import { useLoading } from "src/hooks/useLoading";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { VaultForm } from "src/components/forms";
import { WarningModal } from "src/components/modals";
import { VaultActionsCard } from "src/components/cards";
import { OverlayBackground } from "src/components/backgrounds";

const VaultPage = () => {
  const router = useRouter();
  const { uid } = useUser();
  const { vaultId } = useParams();

  const { vaults, handleVaultUpdate, handleVaultDelete } = useVaults();
  const { secretKey } = useKey();
  const { isLoading, handleAsyncOperation } = useLoading(500);

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { handleErrorDisplay } = useErrorDisplay();
  const { data, handleInputChange, handleFormReset, handleFormInitialize } =
    useForm();

  function handleFormOpen() {
    handleFormInitialize(vaults[vaultId]);
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
    handleFormReset();
  }

  function handleModalOpen() {
    setShowModal(true);
  }

  function handleModalClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const pathData = {
      path: `users/${uid}/vaults/${vaultId}`,
      data,
      encryptionKey: secretKey,
    };
    await handleAsyncOperation(async () => {
      await handleVaultUpdate(vaultId, pathData);
    });
    handleFormClose();
  }

  async function handleVaultRemove() {
    const pathData = {
      path: `users/${uid}/vaults/${vaultId}`,
    };
    await handleAsyncOperation(async () => {
      const { success } = await handleVaultDelete(vaultId, pathData);
      if (success) router.push(`/user/dashboard`);
    });
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
      {showModal && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.modal} onClick={handleModalClose}>
            <WarningModal
              title="Confirm Vault Deletion"
              description="Please confirm if you wish to proceed with deleting this vault. This action is irreversible."
              isLoading={isLoading}
              onSubmit={handleVaultRemove}
              onCancel={handleModalClose}
            />
          </div>
        </>
      )}
      <div className={styles.illustration}>
        <Image
          src="/images/animated-illustrations/journey-sketch.svg"
          alt="journey sketch"
          width={906}
          height={906}
        />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <VaultActionsCard
            data={vaults[vaultId]}
            onVaultModify={handleFormOpen}
            onVaultInspect={() => {}}
            onVaultExport={() => {}}
            onVaultDelete={handleModalOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default VaultPage;
