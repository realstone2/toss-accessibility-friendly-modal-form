import React from "react";
import { overlayManager } from "./utils/overlay-manager";
import { Modal } from "./components/Modal";

export const openModal = (content: React.ReactNode): string => {
  return overlayManager.open(({ close }) => (
    <Modal onClose={close}>{content}</Modal>
  ));
};
