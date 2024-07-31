import BookingRow from "./BookingRow";

import useGetBookings from "@/features/bookings/useGetBookings";
import { Menus, Pagination, Spinner, Table } from "@/ui";
import { usePagination } from "@/ui/Pagination";

function BookingTable() {
  const { bookings: allBookings, isLoading } = useGetBookings();
  const { setLen, range } = usePagination();
  if (isLoading) return <Spinner />;
  setLen(allBookings.length);
  const bookings = allBookings.slice(range.start, range.end);
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
          <Pagination.Wrapper dataLength={allBookings.length}>
            <Pagination.Page />
            <Pagination.Buttons>
              <Pagination.Prev />
              <Pagination.Next />
            </Pagination.Buttons>
          </Pagination.Wrapper>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
