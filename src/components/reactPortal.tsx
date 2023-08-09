import { PropsWithChildren, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PropsI {
  wrapperId?: string;
}

const createWrapper = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);

  document.body.appendChild(wrapperElement);

  return wrapperElement;
};

function ReactPortal({
  children,
  wrapperId = "react-portal",
}: PropsWithChildren<PropsI>) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let sysCreated = false;

    if (!element) {
      sysCreated = true;
      element = createWrapper(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (sysCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;
  return createPortal(children, wrapperElement);
}

export default ReactPortal;
