import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";
import { Heading, Row } from "@/ui";

function Bookings() {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </Row>
  );
}

export default Bookings;
