import Modal from "@/components/modal";
import { useState, PropsWithChildren } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ModalComponent = ({ children }: PropsWithChildren) => {
    return (
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    );
  };

  return {
    isOpen,
    setIsOpen,
    ModalComponent,
  };
};

export default useModal;
