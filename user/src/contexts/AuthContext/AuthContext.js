"use client";

import { auth } from "src/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      const noRedirectPaths = ["/register", "/sandbox"];
      if (
        !user &&
        !noRedirectPaths.some((prefix) => pathname.startsWith(prefix))
      ) {
        router.replace("/login");
        return;
      }
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
