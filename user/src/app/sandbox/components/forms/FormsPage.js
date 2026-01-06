"use client";

import styles from "../ComponentsPage.module.css";
import { useEffect } from "react";
import { useForm } from "src/hooks/useForm";
import { users } from "foxbox-example";
import {
  LoginForm,
  VaultForm,
  ProfileForm,
  RegisterForm,
  VaultItemForm,
  OrganizationForm,
  FilesAttachmentForm,
} from "src/components/forms";

const FormsPage = () => {
  const { data, handleInputChange, handleFormInitialize } = useForm();

  useEffect(() => {
    handleFormInitialize({
      category: "identity",
      createdBy: "jyf2F3p46vQuftw30MLIBb57GCR2",
    });
  }, []);

  if (!data.category) return <div>loading</div>;
  return (
    <div className={styles.wrapper}>
      <FilesAttachmentForm
        uploads={[]}
        onChange={() => {}}
        onCancel={() => {}}
        onClose={() => {}}
      />
      <ProfileForm
        data={users["user1"].profile}
        isLoading
        onChange={() => {}}
        onSubmit={() => {}}
        onClose={() => {}}
      />
      <VaultForm
        data={data}
        isLoading
        onChange={handleInputChange}
        onSubmit={() => {}}
        onClose={() => {}}
      />
      <LoginForm
        data={data}
        isError
        onChange={handleInputChange}
        onSubmit={() => {}}
      />
      <RegisterForm
        data={data}
        strength="weak"
        suggesstion="Your password is not strong enough. To secure your account, avoid common words, names, dates, and repeating characters."
        isError
        showSignIcon
        onChange={handleInputChange}
        onPasswordBlur={() => {}}
        onPasswordFocus={() => {}}
        onPasswordChange={() => {}}
        onSubmit={() => {}}
      />
      <VaultItemForm
        data={data}
        isLoading
        isReadOnly
        onLike={() => {}}
        onChange={handleInputChange}
        onSubmit={() => {}}
        onCancel={() => {}}
        onDelete={() => {}}
        onTagRemove={() => {}}
        onFavoriteStatusToggle={() => {}}
      />
    </div>
  );
};

export default FormsPage;
