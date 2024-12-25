import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBookingById from "@/features/bookings/useGetBookingById";
import { ConfirmDelete, Empty, Modal, Spinner } from "@/ui";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router";
import useCheckoutBooking from "@/features/bookings/useCheckoutBooking";
import useDeleteBooking from "@/features/bookings/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useGetBookingById(); // url_id
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckoutBooking();
  const { deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if(!booking)return <Empty resource={"booking"}/>
  const status = booking.status;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  function handleCheckout() {
    checkout({ id: booking.id });
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete booking">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete booking">
            <ConfirmDelete
              resourceName={`booking#${booking.id}`}
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(
                  { id: booking.id },
                  { onSettled: () => navigate(-1) }
                )
              }
            />
          </Modal.Window>
        </Modal>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${booking.id}`)}
          >
            Checkin
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOut}
            onClick={handleCheckout}
          >
            {isCheckingOut ? "checking out ..." : "Checkout"}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
