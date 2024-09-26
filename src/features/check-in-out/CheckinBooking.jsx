import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { isPending, checkin } = useCheckin();
  const { isLoading, booking, error } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid);
  }, [booking]);
  useEffect(() => {
    setAddBreakfast(booking?.hasBreakfast);
  }, [booking?.hasBreakfast]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  let {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const breakFastPrice = numGuests * settings.breakfastPrice * numNights;
  if (addBreakfast) totalPrice += breakFastPrice;

  function handleCheckin() {
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakFastPrice,
          totalPrice: totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          {
            <Checkbox
              id="breakfast"
              checked={addBreakfast}
              onChange={() => {
                setAddBreakfast((breakfast) => !breakfast);
                setConfirmPaid(false);
              }}
            >
              Want to add breakfast for {formatCurrency(breakFastPrice)}?
            </Checkbox>
          }
        </Box>
      )}

      <Box>
        {
          <Checkbox
            id="confirm"
            disabled={confirmPaid}
            checked={confirmPaid}
            onChange={() => {
              setConfirmPaid((confirmPaid) => {
                return !confirmPaid;
              });
            }}
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {addBreakfast
              ? `${formatCurrency(totalPrice)} (${formatCurrency(
                  totalPrice - breakFastPrice
                )} + ${formatCurrency(breakFastPrice)})`
              : `${formatCurrency(totalPrice)}`}
            .
          </Checkbox>
        }
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid} onClick={handleCheckin}>
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
