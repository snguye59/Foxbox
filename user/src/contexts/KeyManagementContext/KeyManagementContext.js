"use client";

import { useState, createContext } from "react";

const KeyManagementContext = createContext();

const KeyManagementProvider = ({ children }) => {
  const [secretKey, setSecretKey] = useState();
  const [publicKey, setPublicKey] = useState();
  const [privateKey, setPrivateKey] = useState();

  function handleKeysSet(keys) {
    const { secretKey, publicKey, privateKey } = keys;

    if (secretKey) setSecretKey(secretKey);
    if (publicKey) setPublicKey(publicKey);
    if (privateKey) setPrivateKey(privateKey);
  }

  return (
    <KeyManagementContext.Provider
      value={{
        secretKey,
        publicKey,
        privateKey,
        handleKeysSet,
      }}
    >
      {children}
    </KeyManagementContext.Provider>
  );
};

export default KeyManagementContext;
export { KeyManagementProvider };
