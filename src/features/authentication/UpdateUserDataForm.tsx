import { ChangeEvent, FormEvent, useEffect, useState, MouseEvent } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState<null | File>(null);
  const { isUpdating, updateUser } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata.fullName);
    }
  }, [user]);

  if (!user) return null;
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel(e: MouseEvent) {
    e.preventDefault();
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form type="regular" onSubmit={handleSubmit}>
      <FormRow labelName="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow labelName="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e: ChangeEvent) => setFullName((e.target as HTMLInputElement).value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow labelName="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e: ChangeEvent) => {
            const inputFiles = (e.target as HTMLInputElement).files;
            setAvatar(inputFiles ? inputFiles[0] : null);
          }}
        />
      </FormRow>
      <FormRow>
        <>
          <Button type="reset" variation="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
