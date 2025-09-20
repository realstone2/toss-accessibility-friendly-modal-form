import { openModal } from "./modal";

const ModalFormPage = () => {
  const handleOpenModal = () => {
    openModal(
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          첫 번째 모달
        </h2>
        <p className="text-gray-600 mb-4">
          이것은 개선된 이벤트 위임 방식의 모달입니다.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              openModal(
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">두 번째 모달</h3>
                  <p className="mb-4">중첩된 모달입니다. ESC를 눌러보세요!</p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    onClick={() => {
                      openModal(
                        <div className="p-6">
                          <h4 className="text-lg font-semibold mb-2">
                            세 번째 모달
                          </h4>
                          <p>가장 위에 있는 모달입니다!</p>
                        </div>
                      );
                    }}
                  >
                    세 번째 모달 열기
                  </button>
                </div>
              );
            }}
          >
            두 번째 모달 열기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <button
          type="button"
          onClick={handleOpenModal}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          모달 열기
        </button>
      </div>
    </div>
  );
};

export default ModalFormPage;
