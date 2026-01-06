"use client";

import styles from "../ComponentsPage.module.css";
import { users } from "foxbox-example";
import { announcementsData } from "src/data/announcementsData";
import {
  VaultCard,
  NewUpdatesCard,
  VaultActionsCard,
  IllustrationCard,
  SecretSharingCard,
  FileDownloadCard,
  PasswordStrengthIllustrationCard,
} from "src/components/cards";

const CardsPage = () => {
  return (
    <div className={styles.wrapper}>
      <IllustrationCard
        data={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"].illustration}
      />
      <NewUpdatesCard data={announcementsData[0]} onClose={() => {}} />
      <VaultActionsCard
        data={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"]}
        onLike={() => {}}
        onVaultModify={() => {}}
        onVaultInspect={() => {}}
        onVaultExport={() => {}}
        onVaultDelete={() => {}}
      />
      {/* <PasswordStrengthIllustrationCard length="8" /> */}
      {/* <SecretSharingCard /> */}
      <FileDownloadCard
        data={users["user1"].files["file1"]}
        progress={38}
        onDownload={() => {}}
        onCancel={() => {}}
        onDelete={() => {}}
      />
      <VaultCard data={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"]} />
    </div>
  );
};

export default CardsPage;
