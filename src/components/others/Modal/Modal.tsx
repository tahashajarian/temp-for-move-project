
import { Types} from "../../../types/types";
import CloseIcon from "../../svg/CloseIcon";
import { useEffect } from "react";
import useDisplayWithAnimation from "../DisplayWithAnimation/hooks/useDisplayWithAnimation";
import ArrowBack from "../../svg/ArrowBack";
import zIndexes from "../../../constance/zIndexes";

export type ModalProps = {
  children?: Types["children"];
  open: boolean;
  onClose: () => void;
  title: string;
  width?: string;
  height?: string;
  backAction?: () => void;
  keepOpenOnClickAway?: boolean;
};

function Modal({
  children,
  open,
  onClose,
  title,
  width,
  height,
  backAction,
  keepOpenOnClickAway,
}: ModalProps) {
  const { showWithAnimation, shouldBeRemoved } = useDisplayWithAnimation({
    show: open,
  });

  useEffect(() => {
    if (showWithAnimation) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showWithAnimation, shouldBeRemoved]);

  return shouldBeRemoved ? null : (
    <>
      <div
        onClick={keepOpenOnClickAway ? undefined : onClose}
        className={`fixed w-screen h-screen top-0 right-0 bg-black/50 duration-200 ${zIndexes.modalBackDrop}
        ${
          showWithAnimation
            ? "bg-customBlack-main bg-opacity-30"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={` hide-scroll fixed inset-0 m-auto bg-white duration-200 ${zIndexes.modal} p-5 flex flex-col
        ${showWithAnimation ? "" : "opacity-0 pointer-events-none scale-[0.98]"}
        ${width || "w-[430px]"} ${
          height || "h-min"
        } overflow-y-auto rounded-lg`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-xl text-black flex">
            {backAction && (
              <span onClick={backAction} className="cursor-pointer ml-2">
                <ArrowBack />
              </span>
            )}
            <span>{title}</span>
          </span>

          <button
            onClick={onClose}
            className="p-2 rounded-md duration-200 hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1">{children || ''}</div>
      </div>
    </>
  );
}

export default Modal;
