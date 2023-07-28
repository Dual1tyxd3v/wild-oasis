import styled from 'styled-components';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { FieldValues, useForm } from 'react-hook-form';
import { CabinType, NewCabin } from '../../types';
import useCreateCabin from './useCreateCabin';
import useUpdateCabin from './useUpdateCabin';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type CreateCabinFormProps = {
  cabin?: CabinType;
};

function CreateCabinForm({ cabin }: CreateCabinFormProps) {
  const { register, handleSubmit, reset, getValues, formState } = useForm(
    cabin && {
      defaultValues: cabin,
    }
  );
  const { errors } = formState;

  const { createNewCabin, isCreating } = useCreateCabin();
  const { isEditing, editCabin } = useUpdateCabin();

  function onSubmitHandler(data: FieldValues) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (cabin) {
      editCabin(
        { newCabin: { ...data, image: image } as CabinType, id: data.id },
        {
          onSuccess: () => reset(),
        }
      );
    } else {
      createNewCabin({ ...data, image: image } as NewCabin, {
        onSuccess: () => reset(),
      });
    }
  }
  function onErrorSubmit() {}

  const isWorking = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler, onErrorSubmit)}>
      <FormRow
        labelName="Cabin name"
        errorMessage={(errors?.name?.message as string) || null}
      >
        <Input
          {...register('name', {
            required: 'This field is required',
          })}
          type="text"
          id="name"
        />
      </FormRow>

      <FormRow
        labelName="Maximum capacity"
        errorMessage={(errors?.['max_capacity']?.message as string) || null}
      >
        <Input
          {...register('max_capacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be great or equal 1' },
          })}
          type="number"
          id="max_capacity"
        />
      </FormRow>

      <FormRow
        labelName="Regular price"
        errorMessage={(errors?.['regular_price']?.message as string) || null}
      >
        <Input
          {...register('regular_price', {
            required: 'This field is required',
            min: { value: 50, message: 'Price should be great or equal 50' },
          })}
          type="number"
          id="regular_price"
        />
      </FormRow>

      <FormRow
        labelName="Discount"
        errorMessage={(errors?.discount?.message as string) || null}
      >
        <Input
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              +getValues()['regular_price'] > +value ||
              'Discount should be less or equal price',
          })}
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        labelName="Description for website"
        errorMessage={(errors?.description?.message as string) || null}
      >
        <Textarea
          {...register('description', {
            required: 'This field is required',
            minLength: {
              value: 5,
              message: 'Description should contains at least 5 symbols',
            },
          })}
          type="number"
          id="description"
          defaultValue=""
        />
      </FormRow>

      <FormRow
        labelName="Cabin photo"
        errorMessage={(errors?.image?.message as string) || null}
      >
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register('image', {
            required: cabin ? false : 'This field is required',
          })}
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {cabin ? 'Edit cabin' : 'Add new cabin'}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
