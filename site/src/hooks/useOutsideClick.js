import { useEffect } from "react";

export function useOutsideClick(refs, handler, exceptions = []) {
  useEffect(() => {
    const listener = (event) => {
      const isException = exceptions.some(
        (exceptionRef) =>
          exceptionRef.current && exceptionRef.current === event.target
      );

      if (isException) return;

      const isOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target);
      });

      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [refs, handler]);
}
