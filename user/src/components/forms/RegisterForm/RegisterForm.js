import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SvgIcon } from "src/components/icons";
import { SubmitButton } from "src/components/buttons";
import { PasswordStrengthMeter } from "src/components/utils";
import { TextInput, SecureInput } from "src/components/inputs";

const RegisterForm = ({
  data,
  strength,
  suggestion,
  isError,
  showSignIcon,
  onChange,
  onPasswordBlur,
  onPasswordFocus,
  onPasswordChange,
  onSubmit,
}) => {
  const emailRef = useRef();
  const { email, password, name, reminder } = data || {};

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
      <form className={styles.formSection} onSubmit={onSubmit}>
        <h5>Create your Foxbox account</h5>
        <TextInput
          name="email"
          label="Email"
          type="email"
          value={email}
          forwardedRef={emailRef}
          isRequired
          isError={isError}
          maxLength={320}
          onChange={onChange}
        />
        <TextInput
          name="name"
          label="Full name"
          value={name}
          maxLength={100}
          onChange={onChange}
        />
        <div className={styles.password}>
          <SecureInput
            name="password"
            label="Password"
            value={password}
            isRequired
            strength={strength}
            minLength={8}
            maxLength={256}
            onBlur={onPasswordBlur}
            onFocus={onPasswordFocus}
            onChange={onPasswordChange}
          />
          {suggestion && (
            <>
              <PasswordStrengthMeter strength={strength} />
              <div
                className={`
                  ${styles.suggestion} 
                  ${styles[strength]}
                  ${showSignIcon ? styles.separateColumn : ""}
                `}
              >
                {showSignIcon && (
                  <SvgIcon
                    icon={
                      strength === "weak" || strength === "fair"
                        ? "circleExclamation"
                        : strength === "good"
                        ? "circleThumb"
                        : "circleCheck"
                    }
                    size={18}
                  />
                )}
                {suggestion}
              </div>
            </>
          )}
        </div>
        <TextInput
          name="reminder"
          label="Reminder (Optional)"
          value={reminder}
          info={{
            title: "What is Reminder?",
            description:
              "If you forgot your master password but created a reminder, Foxbox will attempt to send you this reminder to your email.",
          }}
          maxLength={1000}
          onChange={onChange}
        />
        <div className={styles.button}>
          <SubmitButton text="Create account" type="submit" background="blue" />
        </div>
        <div className={styles.texts}>
          Already have an account?{" "}
          <Link href={{ pathname: "/login", query: { email } }}>Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
