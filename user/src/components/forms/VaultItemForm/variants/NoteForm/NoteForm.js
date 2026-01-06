import { TextAreaInput } from "src/components/inputs";

const NoteForm = ({ data, onChange }) => {
  const { notes } = data || {};

  return (
    <TextAreaInput
      name="notes"
      label="Notes"
      value={notes}
      height="208px"
      onChange={onChange}
    />
  );
};

export default NoteForm;
