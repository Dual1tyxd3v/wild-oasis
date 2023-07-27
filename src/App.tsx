import { styled } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 30px;
  text-transform: uppercase;
  padding: 50px;
  color: var(--color-brand-500);
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <H1>hello world</H1>
      <Button>Some</Button>
      <Input placeholder='Enter here' />
    </>
  );
}

export default App;
