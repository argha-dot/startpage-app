import { PropsWithChildren, useRef } from "react";

import ReactPortal from "./reactPortal";
import useClickOutside from "@/hooks/useClickOutside";

import styles from "@/styles/modal.module.scss";

interface ModalPropsI {
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({
  children,
  isOpen,
  handleClose,
}: PropsWithChildren<ModalPropsI>) => {
  const ref = useRef(null);

  const handleClickOutside = () => {
    if (isOpen) {
      handleClose();
    }
  };

  useClickOutside(ref, handleClickOutside);

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <div className={styles.modal}>
        <div ref={ref} className={styles.modal_content}>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;
