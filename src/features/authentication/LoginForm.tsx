import { ChangeEvent, useState, FormEvent } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState('dual1ty@example.com');
  const [password, setPassword] = useState('123321');
  const { auth, isLoading } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    auth(
      { email, password },
      {
        onError: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <Form type="regular" onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e: ChangeEvent) =>
            setPassword((e.target as HTMLInputElement).value)
          }
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLoading ? <SpinnerMini /> : 'Login'}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
