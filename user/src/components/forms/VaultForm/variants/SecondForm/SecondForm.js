import styles from "./SecondForm.module.css";
import { TextAreaInput } from "src/components/inputs";
import { IllustrationCard } from "src/components/cards";
import { CancelButton, SubmitButton } from "src/components/buttons";

const SecondForm = ({
  data,
  isLoading,
  onChange,
  onPageBackward,
  onSubmit,
}) => {
  const { description, illustration } = data || {};

  return (
    <div className={styles.sections}>
      <h5>{data.name}</h5>
      <div className={styles.card}>
        <IllustrationCard data={illustration} size="small" />
      </div>
      <TextAreaInput
        name="description"
        label="Description (optional)"
        value={description}
        placeholder="What should this vault be used for?"
        height="93px"
        onChange={onChange}
      />
      <div className={styles.buttons}>
        <CancelButton text="Back" onClick={onPageBackward} />
        <SubmitButton
          text="Done"
          type="submit"
          isLoading={isLoading}
          background="blue"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default SecondForm;
