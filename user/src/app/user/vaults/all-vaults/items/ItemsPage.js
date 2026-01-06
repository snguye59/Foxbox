"use client";

import styles from "./ItemsPage.module.css";
import { useKey } from "src/hooks/useKey";
import { useState, useEffect } from "react";
import { useUser } from "src/hooks/useUser";
import { useForm } from "src/hooks/useForm";
import { vaultItemService } from "src/services";
import { useVaults } from "src/hooks/useVaults";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { VaultItemForm } from "src/components/forms";
import { VaultItemsWidget } from "src/components/widgets";
import { OverlayBackground } from "src/components/backgrounds";

const ItemsPage = () => {
  const { uid } = useUser();

  const { secretKey } = useKey();
  const { vaults } = useVaults();
  const [items, setItems] = useState({});

  const [showForm, setShowForm] = useState(false);
  const { handleErrorDisplay } = useErrorDisplay();

  const { data, handleFormInitialize } = useForm();

  function handleFormOpen(data) {
    handleFormInitialize(data);
    setShowForm(true);
  }

  function handleFormClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowForm(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    setShowForm(false);
  }

  useEffect(() => {
    async function handleVaultsItemsRead() {
      const pathData = {
        path: `users/${uid}/vaults`,
        decryptionKey: secretKey,
      };
      const { items, error } = await vaultItemService.readItemsFromAllVaults(
        pathData
      );
      if (error) {
        handleErrorDisplay(error);
        return;
      }
      setItems(items);
    }
    handleVaultsItemsRead();
  }, []);

  return (
    <div className={styles.wrapper}>
      {showForm && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.form} onClick={handleFormClose}>
            <VaultItemForm
              data={data}
              isReadOnly
              onChange={() => {}}
              onSubmit={handleSubmit}
              onCancel={handleFormClose}
              onDelete={() => {}}
              onTagRemove={() => {}}
              onFavoriteStatusToggle={() => {}}
            />
          </div>
        </>
      )}
      <div className={styles.contentWrapper}>
        <VaultItemsWidget
          vault={vaults["all-vaults"]}
          items={items}
          onFormOpen={handleFormOpen}
        />
      </div>
    </div>
  );
};

export default ItemsPage;
