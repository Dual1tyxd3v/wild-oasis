import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: FieldValues) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Password (min 8 characters)" errorMessage={errors?.password?.message as string}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Confirm password" errorMessage={errors?.passwordConfirm?.message as string}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={reset} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
