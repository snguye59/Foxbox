"use client";

import { useEffect } from "react";
import { authService } from "src/services";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";

const LogoutPage = () => {
  const { handleErrorDisplay } = useErrorDisplay();

  useEffect(() => {
    async function logout() {
      const { success, error } = await authService.logout();

      if (error) {
        handleErrorDisplay(error);
      }
    }
    logout();
  }, []);
};

export default LogoutPage;
