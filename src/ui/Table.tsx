import { ReactNode, createContext } from 'react';
import styled from 'styled-components';
import { WithChildren } from '../types';
import { useTableContext } from '../hooks/useTableContext';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

type CommonRowProps = {
  columns: string;
};

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TableProps = {
  children: ReactNode;
  columns: string;
};

type TableContextType = {
  columns: string;
};

export const TableContext = createContext<TableContextType | null>(null);

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.Header = function Header({ children }: WithChildren) {
  const { columns } = useTableContext();

  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
};

Table.Row = function Row ({ children }: WithChildren) {
  const { columns } = useTableContext();

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};

Table.Body = function ({ children }: WithChildren) {};

Table.Footer = Footer;

export default Table;
