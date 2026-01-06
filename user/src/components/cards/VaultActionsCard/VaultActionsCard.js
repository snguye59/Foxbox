import styles from "./VaultActionsCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { SvgIcon } from "src/components/icons";
import { SubmitButton } from "src/components/buttons";

const VaultActionsCard = ({
  data,
  onVaultModify,
  onVaultInspect,
  onVaultExport,
  onVaultDelete,
}) => {
  const { name, link, activityTrack, description, illustration } = data;

  return (
    <div className={styles.card}>
      <div
        className={styles.background}
        style={{ background: illustration.background }}
      >
        <Image
          src={illustration.image}
          alt={illustration.name}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.actionButtons}>
        <button type="button" onClick={onVaultModify}>
          <SvgIcon icon="gear" />
        </button>
        {activityTrack && (
          <button type="button" onClick={onVaultInspect}>
            <SvgIcon icon="network" />
          </button>
        )}
        <button type="button" onClick={onVaultExport}>
          <SvgIcon icon="fileExport" />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.texts}>
          <p>{name}</p>
          <p>{description}</p>
        </div>
        <div className={styles.submitButtons}>
          <SubmitButton
            text="Delete vault"
            type="button"
            background="error"
            onClick={onVaultDelete}
          />
          <Link href={`${link}/items`}>
            <SubmitButton text="View items" type="button" background="blue" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VaultActionsCard;
