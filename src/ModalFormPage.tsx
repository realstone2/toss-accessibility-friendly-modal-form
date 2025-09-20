import { useState } from "react";
import { openFormModal } from "./open-form-modal";

type UserData = {
  name: string;
  email: string;
};

const ModalFormPage = () => {
  const [result, setResult] = useState<UserData | null>(null);
  const handleOpenFormModal = async () => {
    const result = await openFormModal<UserData>({
      formComponent: (
        <div className="bg-amber-200 flex flex-col gap-4">
          <input name="name" placeholder="이름" type="text" />
          <input name="email" placeholder="이메일" type="text" />
          <button type="submit">제출</button>
        </div>
      ),
      validate: (data: UserData) => {
        if (data.name === "" || data.email === "") {
          return false;
        }
        return true;
      },
    });

    setResult(result);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenFormModal}>
        폼 모달 열기
      </button>
      {result && (
        <div>
          <div>이름: {result.name}</div>
          <div>이메일: {result.email}</div>
        </div>
      )}
    </div>
  );
};

export default ModalFormPage;
