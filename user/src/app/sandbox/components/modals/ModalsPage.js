"use client";

import styles from "../ComponentsPage.module.css";
import { useForm } from "src/hooks/useForm";
import {
  IdleModal,
  WarningModal,
  DatePickerModal,
  MonthPickerModal,
  NotificationsModal,
  PasswordPromptModal,
  PasswordGeneratorModal,
} from "src/components/modals";

const ModalsPage = () => {
  const { data, handleInputChange, handleFormInitialize } = useForm();

  return (
    <div className={styles.wrapper}>
      <MonthPickerModal
        name="month"
        value={data?.month}
        onChange={handleInputChange}
        onCancel={() => {}}
      />
      <DatePickerModal
        name="date-input"
        value={data?.["date-input"]}
        onChange={handleInputChange}
        onCancel={() => {}}
      />
      <IdleModal text="59" onSubmit={() => {}} onCancel={() => {}} />
      <WarningModal
        title="Weak Master Password"
        description="The master password you have chosen is weak. Are you sure you want to use this password? "
        onSubmit={() => {}}
        onCancel={() => {}}
      />
      {/* <PasswordPromptModal onPasswordVerify={() => {}} onCancel={() => {}} /> */}
      {/* <PasswordGeneratorModal
        name="password"
        onChange={handleInputChange}
        onCancel={() => {}}
      /> */}
      {/* <NotificationsModal /> */}
    </div>
  );
};

export default ModalsPage;
