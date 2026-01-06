"use client";

import { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [uid, setUid] = useState();
  const [profile, setProfile] = useState();
  const [settings, setSettings] = useState();

  function handleUserInfoSync(info) {
    const { uid, profile, settings } = info;

    if (uid) setUid(uid);
    if (profile) setProfile(profile);
    if (settings) setSettings(settings);
  }

  return (
    <UserContext.Provider
      value={{
        uid,
        profile,
        settings,
        handleUserInfoSync,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
