import styled from 'styled-components';
import { SortOption } from '../types';
import { ChangeEvent } from 'react';

type StyledSelectProps = {
  type?: string;
};

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type SelectProps = {
  options: SortOption[];
  value: string;
  type?: string;
  onChange: (e: ChangeEvent) => void;
};

function Select({ options, value, type, onChange }: SelectProps) {
  return (
    <StyledSelect defaultValue={value} type={type} onChange={onChange}>
      {options.map((option) => (
        <option key={`sort_${option.label}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
