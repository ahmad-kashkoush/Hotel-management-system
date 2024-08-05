import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBookingById from "@/features/bookings/useGetBookingById";
import { Checkbox, Spinner } from "@/ui";
import { useEffect, useState } from "react";
import useCheckinBooking from "@/features/bookings/useCheckinBooking";
import useSettings from "@/features/settings/useSettings";
import { formatCurrency } from "@/utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking({ id }) {
  const { booking, isLoading } = useGetBookingById();
  const { checkinBooking, isCheckingBooking } = useCheckinBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  // local state
  const [confirmCheckin, setConfirmCheckin] = useState(false);
  const [hadBreakfast, setHadBreakfast] = useState(false);
  useEffect(() => {
    setConfirmCheckin(booking?.isPaid ?? false);
    setHadBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  // for any Loader
  const isAnyLoading = isLoading || isCheckingBooking || isLoadingSettings;
  if (isAnyLoading) return <Spinner />;
  const { guests, totalPrice, numGuests, hasBreakfast, numNights, status } =
    booking;

  const bookingId = !id ? booking.id : id;
  const breakfastPrice =
    (settings?.breakfastPrice || 0) * numGuests * numNights;

  function handleCheckin() {
    if (booking.isPaid) return;

    if (hadBreakfast) {
      checkinBooking({
        id: bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    
    } else {
      checkinBooking({
        id: bookingId,
        breakfastPrice:{}
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={hadBreakfast}
          onChange={() => {
            setHadBreakfast((cur) => !cur);
            setConfirmCheckin(false);
          }}
          id={"Confirm had breakfast"}
          disabled={isAnyLoading}
        >
          want to add breakfast for {breakfastPrice}
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmCheckin}
          onChange={() => setConfirmCheckin((cur) => !cur)}
          id={"confirm check-in"}
          disabled={isAnyLoading || confirmCheckin}
        >
          I confirm that {guests.fullName} has paid $
          {!hadBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(
                totalPrice
              )}+ ${formatCurrency(breakfastPrice)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
