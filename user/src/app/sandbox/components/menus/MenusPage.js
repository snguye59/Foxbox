"use client";

import styles from "../ComponentsPage.module.css";
import { useForm } from "src/hooks/useForm";
import { users } from "foxbox-example";
import {
  UserInfoMenu,
  DropdownMenu,
  ItemSortMenu,
  CountriesMenu,
  VaultPickerMenu,
  VaultItemOptionsMenu,
  VaultIllustrationMenu,
  OrganizationAvatarMenu,
} from "src/components/menus";

const MenusPage = () => {
  const { data, handleInputChange, handleFormInitialize } = useForm();

  return (
    <div className={styles.wrapper}>
      <ItemSortMenu
        size="5"
        value={{
          sortedBy: "Date Created",
          sortedOrder: "Newest First",
        }}
        onValueSelect={() => {}}
      />
      {/* <OrganizationAvatarMenu /> */}
      <UserInfoMenu data={users["user1"].profile} />
      <VaultItemOptionsMenu onCategorySelect={() => {}} />
      <DropdownMenu
        title="Title"
        values={["Mr", "Mrs", "Ms", "Dr"]}
        onValueSelect={() => {}}
      />
      <VaultPickerMenu data={users["user1"].vaults} />
      <VaultIllustrationMenu
        name="illustration"
        onItemSelect={handleInputChange}
      />
      <CountriesMenu onCountrySelect={() => {}} />
    </div>
  );
};

export default MenusPage;
