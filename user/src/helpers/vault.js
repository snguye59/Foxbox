import { vaultIllustrationsData } from "src/data/vaultIllustrationsData";

export function getRandomVaultIllustration() {
  const illustrations =
    vaultIllustrationsData[
      Math.floor(Math.random() * vaultIllustrationsData.length)
    ];
  const illustration =
    illustrations.items[Math.floor(Math.random() * illustrations.items.length)];

  return illustration;
}

export function generateVaultItemInfo(data) {
  const {
    category,
    website,
    username,
    cardNumber,
    brand,
    email,
    phone,
    firstName,
    lastName,
    notes,
  } = data;

  switch (category) {
    case "login":
      return website || username || "";
    case "card":
      const lastFourDigits = cardNumber?.slice(-4);
      return brand && lastFourDigits
        ? `${brand} ending in ${lastFourDigits}`
        : "";
    case "identity":
      return (
        email ||
        phone ||
        (firstName && lastName ? `${firstName} ${lastName}` : "")
      );
    case "note":
      return notes || "";
    default:
      return "";
  }
}

export function reconstructAllVaults(vaults) {
  const { "all-vaults": _, ...individualVaults } = vaults;

  return {
    "all-vaults": {
      id: "all-vaults",
      name: "All Vaults (Read only)",
      illustration: {
        name: "Powder Blast",
        image: "/images/vault-illustrations/abstract-art/powder-blast.svg",
        background: "#AEC6CF",
      },
      description: "Browse all your items in one place, from every vault.",
      link: "/user/vaults/all-vaults/items",
      size: Object.values(individualVaults).reduce(
        (total, vault) => total + vault.size,
        0
      ),
    },
    ...individualVaults,
  };
}
