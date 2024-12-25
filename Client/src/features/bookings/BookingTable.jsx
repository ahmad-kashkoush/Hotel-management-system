import BookingRow from "./BookingRow";

import useGetBookings from "@/features/bookings/useGetBookings";
import { Menus, Pagination, Spinner, Table } from "@/ui";

function BookingTable() {
  const { bookings: allBookings, isLoading, count } = useGetBookings();
  if (isLoading) return <Spinner />;
  const bookings = allBookings;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
