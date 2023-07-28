import { ChangeEvent } from 'react';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
  const { isLoading, settings, error } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  if (error || !settings) return <p>Something went wrong</p>;

  const {
    breakfast_price,
    max_booking_length,
    max_guests,
    min_booking_length,
  } = settings;

  function onHandleBlur(e: ChangeEvent, fieldName: string) {
    const value = (e.target as HTMLInputElement).value;
    if (!value) return;

    updateSetting({ [fieldName]: (e.target as HTMLInputElement).value });
  }

  return (
    <Form>
      <FormRow labelName="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          onBlur={(e) => onHandleBlur(e, 'min_booking_length')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow labelName="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          onBlur={(e) => onHandleBlur(e, 'max_booking_length')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow labelName="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests}
          onBlur={(e) => onHandleBlur(e, 'max_guests')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow labelName="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          onBlur={(e) => onHandleBlur(e, 'breakfast_price')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
