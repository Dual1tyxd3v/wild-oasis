import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function SignupForm() {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  function submitHandler(data: FieldValues) {
    console.log(data);
  }

  function errorHandler() {}

  return (
    <Form type="regular" onSubmit={handleSubmit(submitHandler, errorHandler)}>
      <FormRow
        labelName="Full name"
        errorMessage={errors?.fullName?.message as string}
      >
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        labelName="Email address"
        errorMessage={errors?.email?.message as string}
      >
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email',
            },
          })}
        />
      </FormRow>

      <FormRow
        labelName="Password (min 8 characters)"
        errorMessage={errors?.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        labelName="Repeat password"
        errorMessage={errors?.passwordConfirm?.message as string}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords are not the same',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
