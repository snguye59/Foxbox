"use client";

import styles from "../ComponentsPage.module.css";
import { users } from "foxbox-example";
import {
  LogoButton,
  CloseButton,
  SubmitButton,
  CancelButton,
  TooltipButton,
  NewEntryButton,
  DropdownButton,
  VaultItemButton,
  VaultIllustrationButton,
  CalendarNavigationButton,
} from "src/components/buttons";

const ButtonsPage = () => {
  return (
    <div className={styles.wrapper}>
      <CloseButton size={16} onClick={() => {}} />
      <TooltipButton
        icon="squareInfo"
        size={16}
        theme="light"
        position="right"
      />
      <CalendarNavigationButton
        dateInterval="month"
        direction="backward"
        onClick={() => {}}
      />
      <VaultIllustrationButton
        data={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"].illustration}
        size="small"
        onClick={() => {}}
      />
      <CancelButton text="Back" onClick={() => {}} />
      <DropdownButton text="Date Created" isActive onClick={() => {}} />
      <LogoButton link="/user/sandbox/components/buttons" showText />
      <NewEntryButton text="New Vault" onClick={() => {}} />
      <SubmitButton
        text="Next"
        type="button"
        isLoading
        background="blue"
        onClick={() => {}}
      />
      <VaultItemButton
        data={
          users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"].items[
            "ryWaqI7frHHcVdYTmWLf"
          ]
        }
        onClick={() => {}}
      />
    </div>
  );
};

export default ButtonsPage;
