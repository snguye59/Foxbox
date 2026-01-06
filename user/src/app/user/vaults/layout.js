"use client";

import { useParams } from "next/navigation";
import { useVaults } from "src/hooks/useVaults";
import { useScrollVisibility } from "src/hooks/useScrollVisibility";
import { VaultsNavigation } from "src/components/navigations";

const VaultsLayout = ({ children }) => {
  const { vaultId = "all-vaults" } = useParams();
  const { vaults } = useVaults();
  const showNavigation = useScrollVisibility("top");

  if (!vaults[vaultId]) return <></>;
  return (
    <main>
      {showNavigation && (
        <VaultsNavigation currentVault={vaults[vaultId]} vaults={vaults} />
      )}
      {children}
    </main>
  );
};

export default VaultsLayout;
