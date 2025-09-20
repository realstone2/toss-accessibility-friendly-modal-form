import type { ReactNode } from "react";
import { Modal, overlayManager } from "./modal";

type FormModalProps<T> = {
  formComponent: ReactNode;
  validate: (data: T) => boolean;
};
export const openFormModal = async <T,>({
  validate,
  formComponent,
}: FormModalProps<T>): Promise<T | null> => {
  return new Promise<T | null>((resolve: (value: T | null) => void) => {
    let modalID: string | null = null;

    let result: T | null = null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, FormDataEntryValue> = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      const newData = {
        ...data,
      } as T;

      if (validate(newData)) {
        result = newData;
        resolve(result);
        if (modalID) {
          overlayManager.close(modalID);
        }
        return;
      }

      console.error("validate failed");
    };

    modalID = overlayManager.open(({ close }) => (
      <Modal onClose={close}>
        <form onSubmit={handleSubmit}>{formComponent}</form>
      </Modal>
    ));
  });
};
