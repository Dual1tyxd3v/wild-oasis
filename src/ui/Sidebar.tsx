import { styled } from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';

const Aside = styled.aside`
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <Aside>
      <Logo />
      <MainNav />
      {/* Component for uploading new fake data */}
      {/* <Uploader /> */}
    </Aside>
  );
}

export default Sidebar;
