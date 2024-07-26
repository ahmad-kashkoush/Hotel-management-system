import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
const useMenus = () => useContext(MenusContext);
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const open = setOpenId;
  const close = () => setOpenId("");
  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ opens }) {
  const { open, close, openId, setPosition } = useMenus();
  function handleClick(e) {
    if (openId === opens) close();
    else {
      open(opens);
      const diamensions = e.target.closest("button").getBoundingClientRect();
      setPosition({ x: diamensions.x, y: diamensions.y });
    }
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}
function List({ id, children }) {
  const { openId, position } = useMenus();
  if (openId !== id || openId === "") return null;
  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
}
function Button({ children }) {
  const { close } = useMenus();
  return <li onClick={() => close()}>{children}</li>;
}

Menus.Button = Button;
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
export default Menus;
