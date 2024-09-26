import { useEffect, useRef } from "react";

function useOutsideClick(close, listeningCapture = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClick, listeningCapture);
    return () =>
      document.removeEventListener("click", handleClick, listeningCapture);
  }, [close]);
  return ref;
}

export default useOutsideClick;
