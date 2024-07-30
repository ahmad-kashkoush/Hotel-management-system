import { Menus, Spinner, Table } from "@/ui";
import BookingRow from "./BookingRow";
import useGetBookings from "@/features/bookings/useGetBookings";
import useGetBookingById from "@/features/bookings/useGetBookingById";
import { useGetCabins } from "@/features/cabins/useGetCabins";
import { useSearchParams } from "react-router-dom";

const compare = (a, b, type = "any") => {
  if (type === "dateString") return new Date(a) - new Date(b);
  if (type === "string")
    return a.localeCompare(b, undefined, {
      sensitivity: "base",
    });
  if (type === "number") return a - b;
};

function BookingTable() {
  const { bookings: allBookings, isLoading: isLoadingBookings } =
    useGetBookings();
  const [searchParams] = useSearchParams();
  if (isLoadingBookings) return <Spinner />;
  const sortValue = searchParams.get("sort");
  const compareFn = (a, b) => {
    if (!sortValue) return 1;
    let [field, dir] = sortValue.split("-");
    const modifier = dir === "asc" ? 1 : -1;
    const type = field.includes("Date") ? "dateString" : typeof a[field];
    return compare(a[field], b[field], type) * modifier;
  };
  const filterValue = searchParams.get("status") || "all";
  const bookings = allBookings
    .sort(compareFn)
    .filter(
      (booking) => booking.status === filterValue || filterValue === "all"
    );

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
      </Table>
    </Menus>
  );
}

export default BookingTable;
