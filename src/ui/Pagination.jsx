import { createContext, useContext, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const PAGE_SIZE = 5;
const paginationContext = createContext();
export const usePagination = () => useContext(paginationContext);
function Pagination({ children }) {
  // constants
  const lenPerPage = PAGE_SIZE;
  // state
  const [len, setLen] = useState(0);
  const [curPage, setCurPage] = useState(0);
  // Helper Methods
  const getStartOfPage = () => lenPerPage * curPage;
  const getEndOfPage = () => getStartOfPage() + lenPerPage - 1;

  const numPages = Math.ceil(len / lenPerPage);
  const handleNextClick = () =>
    setCurPage((cur) => (cur >= numPages - 1 ? cur : cur + 1));
  const handlePrevClick = () => setCurPage((cur) => (cur < 1 ? cur : cur - 1));
  return (
    <paginationContext.Provider
      value={{
        setLen,
        handleNextClick,
        handlePrevClick,
        numPages,
        curPage,
        range: { start: getStartOfPage(), end: getEndOfPage() },
        disableNext: curPage >= numPages - 1,
        disablePrev: curPage < 1,
      }}
    >
      {children}
    </paginationContext.Provider>
  );
}
function Wrapper({ children, dataLength }) {
  const { setLen, numPages } = usePagination();
  setLen(dataLength || 0);
  if (numPages < 2) return null;
  return <StyledPagination>{children}</StyledPagination>;
}
function Page() {
  const {
    range: { start, end },
  } = usePagination();
  return (
    <P>
      showing {start} to {end} of results
    </P>
  );
}
function Next() {
  const { handleNextClick, disableNext } = usePagination();
  return (
    <PaginationButton onClick={handleNextClick} disabled={disableNext}>
      <HiArrowRight />
    </PaginationButton>
  );
}

function Prev() {
  const { handlePrevClick, disablePrev } = usePagination();
  return (
    <PaginationButton onClick={handlePrevClick} disabled={disablePrev}>
      <HiArrowLeft />
    </PaginationButton>
  );
}
function Buttons({ children }) {
  return <StyledButtons>{children}</StyledButtons>;
}

Pagination.Next = Next;
Pagination.Prev = Prev;
Pagination.Page = Page;
Pagination.Wrapper = Wrapper;
Pagination.Buttons = Buttons;
export default Pagination;
