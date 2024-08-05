import { Button, Form, FormRow, Input, Spinner } from "@/ui";
import { useEffect, useState } from "react";
import useSettings from "@/features/settings/useSettings";
import useUpdateSettings from "@/features/settings/useUpdateSettings";

function UpdateSettingsForm() {
  const [minNights, setMinNights] = useState(0);
  const [maxNights, setMaxNights] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [breakfastPrice, setBreakfastPrice] = useState(0);

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { updateSettings, isLoading: isUpdating } = useUpdateSettings();

  useEffect(() => {
    setMinNights(settings?.minBookingLength);
    setMaxNights(settings?.maxBookingLength);
    setMaxGuests(settings?.maxGuestsPerBooking);
    setBreakfastPrice(settings?.breakfastPrice);
  }, [settings]);
  if (isLoadingSettings) return <Spinner />;

  function handleClick(e) {
    e.preventDefault();
    updateSettings({
      id: settings.id,
      minBookingLength: parseInt(minNights),
      maxBookingLength: parseInt(maxNights),
      maxGuestsPerBooking: parseInt(maxGuests),
      breakfastPrice: parseFloat(breakfastPrice),
    });
  }
  return (
    <Form onSubmit={handleClick}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minNights}
          onChange={(e) => setMinNights(e.target.value)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxNights}
          onChange={(e) => setMaxNights(e.target.value)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onChange={(e) => setBreakfastPrice(e.target.value)}
        />
      </FormRow>
      <Button disabled={isUpdating}>
        {isUpdating ? "updating..." : "update"}
      </Button>
    </Form>
  );
}

export default UpdateSettingsForm;
