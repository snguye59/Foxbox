"use client";

import styles from "../ComponentsPage.module.css";
import { useForm } from "src/hooks/useForm";
import { users } from "foxbox-example";
import {
  TextInput,
  DateInput,
  SecureInput,
  SearchInput,
  CountryInput,
  CheckboxInput,
  TextAreaInput,
  DropdownInput,
  FileUploadInput,
  OrganizationInput,
  ToggleSwitchInput,
  VaultIllustrationInput,
} from "src/components/inputs";

const InputsPage = () => {
  const { data, handleInputChange, handleFormInitialize } = useForm();

  return (
    <div className={styles.wrapper}>
      <CheckboxInput
        name="checkbox"
        label="Checkbox"
        value={data?.checkbox}
        isDisabled
        onChange={handleInputChange}
      />
      <ToggleSwitchInput
        name="toggle-switch"
        value={data?.["toggle-switch"]}
        size="big"
        onChange={handleInputChange}
      />
      <DateInput
        name="date-input"
        label="Date Input"
        value={data?.["date-input"]}
        icon="calendar"
        onShowModal={() => {}}
        onChange={handleInputChange}
      />
      <SearchInput
        name="search"
        value={data?.["search"]}
        placeholder="Search"
        isBottomSquare
        onChange={handleInputChange}
      />
      <FileUploadInput onChange={() => {}} />
      <TextAreaInput
        name="text-area"
        label="Text Area Input"
        value={data?.["text-area"]}
        placeholder="This is a text area"
        height="120px"
        onChange={handleInputChange}
      />
      <TextInput
        name="text-input"
        label="Text Input"
        type="text"
        info={{
          title: "This is a text input with info",
          description: "A text input with info is so cool",
        }}
        value={data?.["text-input"]}
        placeholder="This is a text input"
        forwardedRef={null}
        showBongo
        isRequired
        isError
        size="big"
        minLength={1}
        maxLength={100}
        onChange={handleInputChange}
      />
      <SecureInput
        name="secure-input"
        label="Secure Input"
        value={data?.["secure-input"]}
        isRequired
        size="big"
        strength="strong"
        minLength={8}
        maxLength={256}
        onBlur={() => {}}
        onFocus={() => {}}
        onChange={handleInputChange}
      />
      <OrganizationInput organization={data?.organization} />
      <DropdownInput
        name="dropdown"
        label="Drop down"
        value={data?.dropdown}
        icon="creditCard"
        placeholder="Select dropdown"
        menuValues={["Mr", "Mrs", "Ms", "Dr"]}
        onChange={handleInputChange}
      />
      <VaultIllustrationInput
        name="vault-illustration"
        value={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"].illustration}
        onChange={handleInputChange}
      />
      <CountryInput
        name="country"
        value={users["user1"].profile.country}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputsPage;
