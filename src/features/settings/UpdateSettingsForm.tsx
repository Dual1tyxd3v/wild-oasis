import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';

function UpdateSettingsForm() {
  const { isLoading, settings, error } = useSettings();
  
  if (isLoading) return <Spinner />;

  if (error || !settings) return <p>Something went wrong</p>;
  
  const {
    breakfast_price,
    max_booking_length,
    max_guests,
    min_booking_length,
  } = settings;

  return (
    <Form>
      <FormRow labelName="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
        />
      </FormRow>
      <FormRow labelName="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
        />
      </FormRow>
      <FormRow labelName="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={max_guests} />
      </FormRow>
      <FormRow labelName="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
