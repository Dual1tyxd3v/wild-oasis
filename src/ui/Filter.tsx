import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { OptionsType } from '../types';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

type FilterButtonProps = {
  active?: string;
};

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
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

type FilterProps = {
  filterField: string;
  options: OptionsType[];
};

function Filter({ filterField, options }: FilterProps) {
  const [params, setParams] = useSearchParams();

  const filterValue = params.get(filterField) || 'all';

  function handleClick(value: string) {
    params.set(filterField, value);
    params.set('page', '1');
    setParams(params);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.label}
          active={filterValue === option.value.toString() ? 'true' : ''}
          disabled={filterValue === option.value.toString()}
          onClick={() => handleClick(option.value.toString())}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
