import React from "react";
import { overlayManager } from "./utils/overlay-manager";
import { Modal } from "./components/Modal";

export const openModal = ({
  content,
  onClose,
}: {
  content: React.ReactNode;
  onClose: () => void;
}): string => {
  return overlayManager.open(({ close }) => (
    <Modal
      onClose={() => {
        close();
        onClose();
      }}
    >
      {content}
    </Modal>
  ));
};
