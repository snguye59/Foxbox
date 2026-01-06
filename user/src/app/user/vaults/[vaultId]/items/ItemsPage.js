"use client";

import styles from "./ItemsPage.module.css";
import { useKey } from "src/hooks/useKey";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "src/hooks/useForm";
import { useUser } from "src/hooks/useUser";
import { vaultItemService } from "src/services";
import { useVaults } from "src/hooks/useVaults";
import { useLoading } from "src/hooks/useLoading";
import { separateString } from "src/helpers/input";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { WarningModal } from "src/components/modals";
import { VaultItemForm } from "src/components/forms";
import { VaultItemsWidget } from "src/components/widgets";
import { OverlayBackground } from "src/components/backgrounds";

const ItemsPage = () => {
  const { uid } = useUser();
  const { vaultId } = useParams();

  const { vaults, handleVaultSizeIncrease, handleVaultSizeDecrease } =
    useVaults();
  const [items, setItems] = useState({});
  const { secretKey } = useKey();
  const { isLoading, handleAsyncOperation } = useLoading(200);

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { handleErrorDisplay } = useErrorDisplay();
  const {
    data,
    handleInputChange,
    handleFormReset,
    handleFormInitialize,
    handleArrayElementDelete,
  } = useForm();

  function handleFormOpen(data) {
    handleFormInitialize(data);
    setShowForm(true);
  }

  function handleFormClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowForm(false);
      handleFormReset();
    }
  }

  function handleModalOpen() {
    if (!data.id) {
      handleFormClose();
      return;
    }
    setShowModal(true);
  }

  function handleModalClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  function handleItemFavoriteStatusToggle() {
    handleInputChange({
      target: {
        name: "isFavorite",
        value: !data.isFavorite,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { id, newTag, tags = [], ...dataToSave } = data;
    const updatedTags = [...new Set([...tags, ...separateString(newTag)])];
    const updatedItem = {
      ...dataToSave,
      tags: updatedTags,
      isDeleted: false,
    };

    const pathData = {
      path: `users/${uid}/vaults/${vaultId}/items${id ? `/${id}` : ""}`,
      data: updatedItem,
      encryptionKey: secretKey,
    };

    await handleAsyncOperation(async () => {
      if (id) {
        const { success, error } = await vaultItemService.updateItem(pathData);

        if (error) {
          handleErrorDisplay(error);
          return;
        }
        const updatedItems = { ...items };
        updatedItems[id] = updatedItem;
        setItems(updatedItems);
      } else {
        const { itemId, error } = await vaultItemService.createItem(pathData);

        if (error) {
          handleErrorDisplay(error);
          return;
        } else {
          await handleVaultSizeIncrease(vaultId);

          const updatedItems = { ...items };
          updatedItems[itemId] = updatedItem;
          setItems(updatedItems);
        }
      }
    });
    handleFormClose();
  }

  async function handleItemRemove() {
    const updatedItems = { ...items };

    if (updatedItems[data.id].isDeleted) delete updatedItems[data.id];
    else updatedItems[data.id] = { ...updatedItems[data.id], isDeleted: true };

    const pathData = {
      path: `users/${uid}/vaults/${vaultId}/items/${data.id}`,
      data: updatedItems[data.id],
      encryptionKey: secretKey,
    };
    await handleAsyncOperation(async () => {
      if (updatedItems[data.id]) {
        const { success, error } = await vaultItemService.updateItem(pathData);

        if (error) {
          handleErrorDisplay(error);
          return;
        }
      } else {
        const { success, error } = await vaultItemService.deleteItem(pathData);

        if (error) {
          handleErrorDisplay(error);
          return;
        } else await handleVaultSizeDecrease(vaultId);
      }
      setItems(updatedItems);
    });
    handleModalClose();
    handleFormClose();
  }

  useEffect(() => {
    async function handleVaultItemsRead() {
      const pathData = {
        path: `users/${uid}/vaults/${vaultId}/items`,
        decryptionKey: secretKey,
      };
      const { items, error } = await vaultItemService.readItems(pathData);
      if (error) {
        handleErrorDisplay(error);
        return;
      }
      setItems(items);
    }
    handleVaultItemsRead();
  }, []);

  return (
    <div className={styles.wrapper}>
      {showForm && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.form} onClick={handleFormClose}>
            <VaultItemForm
              data={data}
              isLoading={isLoading}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={handleFormClose}
              onDelete={handleModalOpen}
              onTagRemove={handleArrayElementDelete}
              onFavoriteStatusToggle={handleItemFavoriteStatusToggle}
            />
          </div>
        </>
      )}
      {showModal && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.modal} onClick={handleModalClose}>
            <WarningModal
              title="Confirm Item Deletion"
              description={
                data.isDeleted
                  ? "Please confirm if you wish to proceed with deleting this item. This action is irreversible."
                  : "Are you sure you want to move this item to the trash? You can still restore it later."
              }
              isLoading={isLoading}
              onSubmit={handleItemRemove}
              onCancel={handleModalClose}
            />
          </div>
        </>
      )}
      <div className={styles.contentWrapper}>
        <VaultItemsWidget
          vault={vaults[vaultId]}
          items={items}
          onFormOpen={handleFormOpen}
        />
      </div>
    </div>
  );
};

export default ItemsPage;
