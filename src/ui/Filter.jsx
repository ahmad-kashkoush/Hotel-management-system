import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Filter({ filterField, filterOptions }) {
  // const navigate = useNavigate();
  // function handleClick(e) {
  //   const filterValue = e.target.dataset.filter;
  //   navigate(`?filter=${filterValue}`);
  // }
  // Using SearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(e) {
    const filterValue = e.target.dataset.filter;
    searchParams.set(filterField, filterValue);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  const active = searchParams.get(filterField) || "all";
  return (
    <StyledFilter>
      {filterOptions.map((item) => (
        <FilterButton
          key={item.value}
          data-filter={item.value}
          onClick={handleClick}
          active={(active === item.value).toString()}
        >
          {item.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
