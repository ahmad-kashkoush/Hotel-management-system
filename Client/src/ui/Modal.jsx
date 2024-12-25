import { useEscKeyDown } from "@/hooks/useEscKeyDown";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
export const useModal = () => useContext(ModalContext);

function Window({ children, name }) {
  const { openName, close } = useModal();

  const { ref: clickRef } = useOutsideClick(close);
  const { ref: escRef } = useEscKeyDown(close);

  if (openName !== name) return null;
  return createPortal(
    <Overlay>
      <StyledModal
        ref={(el) => {
          clickRef.current = el;
          escRef.current = el;
        }}
      >
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseForm: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useModal();
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

Modal.Window = Window;
Modal.Open = Open;
export default Modal;

/* 

*/
