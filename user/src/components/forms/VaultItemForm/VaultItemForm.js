import styles from "./VaultItemForm.module.css";
import Image from "next/image";
import CardForm from "./variants/CardForm";
import NoteForm from "./variants/NoteForm";
import AccountForm from "./variants/AccountForm";
import IdentityForm from "./variants/IdentityForm";
import { useState, useEffect, useRef } from "react";
import { itemCategories } from "src/data/vaultItemCategoriesData";
import { SvgIcon } from "src/components/icons";
import { TextInput } from "src/components/inputs";
import { InputBadge } from "src/components/badges";
import { SubmitButton, CancelButton } from "src/components/buttons";

const VaultItemForm = ({
  data,
  isLoading,
  isReadOnly,
  onChange,
  onSubmit,
  onCancel,
  onDelete,
  onTagRemove,
  onFavoriteStatusToggle,
}) => {
  const {
    id,
    name,
    category,
    newTag,
    tags,
    isFavorite,
    isDeleted,
    timestamps,
  } = data || {};
  const { text, icon } = itemCategories.find(({ type }) => type === category);

  const formRef = useRef();
  const nameRef = useRef();
  const [initialName] = useState(data.name);

  const [showInput, setShowInput] = useState(false);

  function handleFormScroll(position) {
    formRef.current.scrollTop = position;
  }

  useEffect(() => {
    if (!id) nameRef.current.focus();
  }, []);

  useEffect(() => {
    if (showInput) {
      handleFormScroll(formRef.current.scrollHeight);
    }
  }, [showInput]);

  return (
    <form
      ref={formRef}
      className={`
        ${styles.form} 
        ${styles[category]} 
      `}
      onSubmit={onSubmit}
    >
      <div className={styles.sections}>
        <h5>{id ? initialName : `Add new ${category}`}</h5>
        <div className={styles.name}>
          <Image src={icon.image} alt={icon.name} width={86} height={86} />
          <TextInput
            name="name"
            label={`${text} name`}
            value={name}
            forwardedRef={nameRef}
            isRequired
            maxLength={1000}
            onChange={onChange}
          />
        </div>
        {
          {
            login: (
              <AccountForm
                data={data}
                onChange={onChange}
                onFormScroll={handleFormScroll}
              />
            ),
            card: (
              <CardForm
                data={data}
                onChange={onChange}
                onFormScroll={handleFormScroll}
              />
            ),
            identity: (
              <IdentityForm
                data={data}
                onChange={onChange}
                onFormScroll={handleFormScroll}
              />
            ),
            note: <NoteForm data={data} onChange={onChange} />,
          }[category]
        }
        <div className={styles.tagsManager}>
          <label htmlFor="newTag">Tags</label>
          {tags ? (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <InputBadge
                  key={tag}
                  value={tag}
                  onDelete={() => {
                    onTagRemove("tags", tag);
                  }}
                />
              ))}
            </div>
          ) : (
            <p>This item has no tags.</p>
          )}
          {!isReadOnly && (
            <button
              type="button"
              className={`
                  ${styles.newTagButton} 
                  ${showInput ? styles.tagVisible : ""}
                `}
              onClick={() => setShowInput(!showInput)}
            >
              <div className={styles.iconBackground}>
                <SvgIcon icon={showInput ? "minus" : "plus"} size={12} />
              </div>
              {showInput ? "Hide Tag Editor" : "Add New Tag"}
            </button>
          )}
          {showInput && (
            <TextInput name="newTag" value={newTag} onChange={onChange} />
          )}
        </div>
        {timestamps && (
          <div className={styles.timestamps}>
            <p>modified: {timestamps.updatedAt}</p>
            <p>created: {timestamps.createdAt}</p>
          </div>
        )}
      </div>
      <div className={styles.actionButtons}>
        <div>
          <button
            type="button"
            className={styles.likeButton}
            onClick={() => onFavoriteStatusToggle()}
          >
            <SvgIcon icon={isFavorite ? "starFill" : "star"} />
          </button>
          <button
            type="button"
            className={styles.trashButton}
            onClick={onDelete}
          >
            <SvgIcon icon="trash" />
          </button>
        </div>
        <div>
          <CancelButton text="Cancel" onClick={onCancel} />
          <SubmitButton
            text={
              isReadOnly
                ? "Done"
                : isDeleted
                ? "Restore item"
                : id
                ? "Save item"
                : "Create item"
            }
            type="submit"
            isLoading={isLoading}
            background="blue"
          />
        </div>
      </div>
    </form>
  );
};

export default VaultItemForm;
