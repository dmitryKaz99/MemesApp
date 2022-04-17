import { FC, MouseEvent, useEffect } from "react";
import s from "./Modal.module.scss";

interface IModal {
  visible: boolean;
  setVisible: (flag: boolean) => void;
}

const Modal: FC<IModal> = ({ children, visible, setVisible }) => {
  const modalClasses = visible ? [s.modal, s.active_modal] : [s.modal],
    bodyEl = document.body;

  useEffect(() => {
    visible && bodyEl.classList.add("active_body");
    return () => bodyEl.classList.remove("active_body");
  }, [visible]);

  return (
    <div className={modalClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={s.content}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {children}

        <div
          onClick={() => setVisible(false)}
          className={s.close}
          title={"exit"}
        >
          &#10006;
        </div>
      </div>
    </div>
  );
};

export default Modal;
