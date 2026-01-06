import styles from "./LoginForm.module.css";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SubmitButton } from "src/components/buttons";
import { TextInput, SecureInput, CheckboxInput } from "src/components/inputs";

const LoginForm = ({ data, isError, onChange, onSubmit }) => {
  const emailRef = useRef();
  const { email, password, publicComputer } = data || {};

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div
      className={`
        ${styles.form} 
        ${isError ? styles.showError : ""}
      `}
    >
      <form className={styles.sections} onSubmit={onSubmit}>
        <h5>Sign in to your account</h5>
        <TextInput
          name="email"
          label="Email"
          type="email"
          value={email}
          forwardedRef={emailRef}
          showBongo
          isRequired
          isError={isError}
          size="big"
          onChange={onChange}
        />
        <div className={styles.password}>
          <Link href={{ pathname: "/login" }} className={styles.link} tabIndex="-1">
            Forgot Password?
          </Link>
          <SecureInput
            name="password"
            label="Password"
            value={password}
            isRequired
            size="big"
            onChange={onChange}
          />
        </div>
        <div className={styles.checkbox}>
          <CheckboxInput
            name="publicComputer"
            value={publicComputer}
            onChange={onChange}
          />
          <label htmlFor="publicComputer">
            This is a public or shared computer
          </label>
        </div>
        <SubmitButton text="Continue" type="submit" background="blue" />
        <div className={styles.texts}>
          Don’t have an account?{" "}
          <Link href={{ pathname: "/register", query: { email } }}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
