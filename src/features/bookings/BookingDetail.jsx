import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteCabin from "../cabins/useDeleteCabin";
import useDeleteBooking from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking, error } = useBooking();
  const { isPending, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const status = "checked-in";
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

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
        {booking.status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${booking.id}`)}
            icon={<HiArrowDownOnSquare />}
          >
            Check in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button
            onClick={() => checkout(booking.id)}
            icon={<HiArrowUpOnSquare />}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="deletePrompt">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="deletePrompt">
            <ConfirmDelete
              resourceName={`Booking ${booking.id}`}
              onConfirm={() =>
                deleteBooking(booking.id, {
                  onSuccess: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
