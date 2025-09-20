import { nanoid } from "nanoid";
import { createRoot, type Root } from "react-dom/client";

interface OverlayItem {
  id: string;
  root: Root;
  element: HTMLElement;
  onClose?: () => void;
  createdAt: number; // 생성 시간을 추가하여 순서 관리
}

class OverlayManager {
  private overlays: Record<string, OverlayItem> = {};
  private globalKeydownHandler: ((e: KeyboardEvent) => void) | null = null;

  private generateId(): string {
    return nanoid();
  }

  private createOverlayElement(): HTMLElement {
    const element = document.createElement("div");
    element.style.position = "fixed";
    element.style.top = "0";
    element.style.left = "0";
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.zIndex = "9999";
    element.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.body.appendChild(element);
    return element;
  }

  open(
    renderFunction: (params: { close: () => void }) => React.ReactElement
  ): string {
    const id = this.generateId();
    const element = this.createOverlayElement();
    const root = createRoot(element);

    const close = () => {
      this.close(id);
    };

    const overlay: OverlayItem = {
      id,
      root,
      element,
      onClose: close,
      createdAt: Date.now(), // 생성 시간 기록
    };

    this.overlays[id] = overlay;

    // React 컴포넌트 렌더링
    const component = renderFunction({ close });

    root.render(component);

    // 첫 번째 모달이면 글로벌 이벤트 리스너 등록
    this.ensureGlobalEventListeners();

    return id;
  }

  close(id: string): void {
    const overlay = this.overlays[id];
    if (!overlay) return;

    overlay.root.unmount();

    if (overlay.element.parentNode) {
      overlay.element.parentNode.removeChild(overlay.element);
    }

    // 객체에서 제거
    delete this.overlays[id];

    // 모든 모달이 닫혔으면 글로벌 이벤트 리스너 제거
    if (Object.keys(this.overlays).length === 0) {
      this.removeGlobalEventListeners();
    }
  }

  closeAll(): void {
    const ids = Object.keys(this.overlays);
    ids.forEach((id: string) => {
      this.close(id);
    });
  }

  private ensureGlobalEventListeners(): void {
    // 이미 등록되어 있으면 중복 등록하지 않음
    if (this.globalKeydownHandler) return;

    this.globalKeydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // 가장 최근에 열린 모달을 찾아서 닫기
        const topModal = this.getTopModal();
        if (topModal) {
          this.close(topModal.id);
        }
      }
    };

    document.addEventListener("keydown", this.globalKeydownHandler);
  }

  private removeGlobalEventListeners(): void {
    if (this.globalKeydownHandler) {
      document.removeEventListener("keydown", this.globalKeydownHandler);
      this.globalKeydownHandler = null;
    }
  }

  private getTopModal(): OverlayItem | null {
    const overlayIds = Object.keys(this.overlays);
    if (overlayIds.length === 0) return null;

    return overlayIds
      .map((id) => this.overlays[id])
      .reduce(
        (latest: OverlayItem | null, current: OverlayItem) =>
          !latest || current.createdAt > latest.createdAt ? current : latest,
        null
      );
  }
}

export const overlayManager = new OverlayManager();
