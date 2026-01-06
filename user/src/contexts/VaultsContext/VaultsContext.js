"use client";

import { useKey } from "src/hooks/useKey";
import { useRouter } from "next/navigation";
import { vaultService } from "src/services";
import { useUser } from "src/hooks/useUser";
import { useState, createContext } from "react";
import { reconstructAllVaults } from "src/helpers/vault";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";

const VaultsContext = createContext();

const VaultsProvider = ({ children }) => {
  const router = useRouter();
  const { uid, profile } = useUser();
  const { secretKey } = useKey();
  const [vaults, setVaults] = useState({});

  const { handleErrorDisplay } = useErrorDisplay();

  async function handleVaultCreate(pathData) {
    const { vaultId, error } = await vaultService.createVault(pathData);

    if (error) {
      handleErrorDisplay(error);
      return;
    }

    const updatedVault = {
      id: vaultId,
      ...pathData.data,
      createdBy: uid,
      createdByAvatar: profile.avatar,
      size: 0,
      link: `/user/vaults/${vaultId}`,
    };
    const updatedPathData = {
      ...pathData,
      path: `users/${uid}/vaults/${vaultId}`,
      data: updatedVault,
    };

    const { success } = await handleVaultUpdate(vaultId, updatedPathData);

    if (success) {
      const updatedVaults = {
        ...vaults,
        [vaultId]: updatedVault,
      };
      setVaults(reconstructAllVaults(updatedVaults));

      router.push(`/user/vaults/${vaultId}`);
    }
  }

  async function handleVaultsRead(pathData) {
    const { vaults, error } = await vaultService.readVaults(pathData);

    if (error) {
      handleErrorDisplay(error);
      return;
    }
    setVaults(reconstructAllVaults(vaults));
  }

  async function handleVaultUpdate(vaultId, pathData) {
    const { success, error } = await vaultService.updateVault(pathData);

    if (error) {
      handleErrorDisplay(error);
      return;
    }
    const updatedVaults = {
      ...vaults,
      [vaultId]: pathData.data,
    };
    setVaults(reconstructAllVaults(updatedVaults));

    return { success };
  }

  async function handleVaultSizeIncrease(vaultId) {
    const updatedVault = {
      ...vaults[vaultId],
      size: vaults[vaultId].size + 1,
    };
    const pathData = {
      path: `users/${uid}/vaults/${vaultId}`,
      data: updatedVault,
      encryptionKey: secretKey,
    };
    await handleVaultUpdate(vaultId, pathData);
  }

  async function handleVaultSizeDecrease(vaultId) {
    const updatedVault = {
      ...vaults[vaultId],
      size: vaults[vaultId].size - 1,
    };
    const pathData = {
      path: `users/${uid}/vaults/${vaultId}`,
      data: updatedVault,
      encryptionKey: secretKey,
    };
    await handleVaultUpdate(vaultId, pathData);
  }

  async function handleVaultDelete(vaultId, pathData) {
    const { success, error } = await vaultService.deleteVault(pathData);

    if (error) {
      handleErrorDisplay(error);
      return;
    }
    const updatedVaults = { ...vaults };
    delete updatedVaults[vaultId];

    setVaults(reconstructAllVaults(updatedVaults));

    return { success };
  }

  return (
    <VaultsContext.Provider
      value={{
        vaults,
        handleVaultCreate,
        handleVaultsRead,
        handleVaultUpdate,
        handleVaultDelete,
        handleVaultSizeIncrease,
        handleVaultSizeDecrease
      }}
    >
      {children}
    </VaultsContext.Provider>
  );
};

export default VaultsContext;
export { VaultsProvider };
