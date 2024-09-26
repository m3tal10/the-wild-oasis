import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings = {}, error } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;
  const { isUpdating, updateSetting } = useUpdateSettings();

  function handleUpdate(e, key) {
    const { value } = e.target;
    updateSetting({ [key]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
          type="number"
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          type="number"
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
