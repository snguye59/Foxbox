"use client";

import styles from "./ErrorDisplayContext.module.css";
import { useState, createContext } from "react";
import { ErrorToast } from "src/components/toast-notifications";

const ErrorDisplayContext = createContext();

const ErrorDisplayProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  function handleErrorDisplay(message) {
    const id = Date.now();

    setToasts((toasts) => [...toasts, { id, message }]);

    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    }, 5000);
  }

  return (
    <ErrorDisplayContext.Provider value={{ handleErrorDisplay }}>
      {toasts.length > 0 && (
        <div className={styles.toasts}>
          {toasts.map((toast) => {
            const { id, message } = toast;

            return <ErrorToast key={id} text={message} />;
          })}
        </div>
      )}
      {children}
    </ErrorDisplayContext.Provider>
  );
};

export default ErrorDisplayContext;
export { ErrorDisplayProvider };
