import { useState } from "react";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";

export function useLoading(delay) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleErrorDisplay } = useErrorDisplay();

  async function handleAsyncOperation(action) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await action();
    } catch (error) {
      console.error(error);
      
      handleErrorDisplay(
        "Please try again. If the problem persists, contact support for assistance."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, handleAsyncOperation };
}
