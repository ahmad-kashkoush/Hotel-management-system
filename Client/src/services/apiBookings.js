import { getEndOfPage, getStartOfPage, getToday } from "@/utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "@/constants/constants";
const map = {
  startDate: "startDate",
  totalPrice: "totalPrice"
}
const url = import.meta.env.VITE_ENDPOINT_URL;

// done
export async function getBookings({ filter, sortBy, page }) {

  let endpoint = `${url}/bookings?fields=bookings.*,cabins.name,guests.fullname,guests.email&limit=${PAGE_SIZE}`;
  if (filter) {
    endpoint += `&${filter.field}=${filter.value}`;
  }
  if (sortBy) {
    endpoint += `&sort=${sortBy.dir === "asc" ? "" : "-"}${sortBy.field}`;
  }
  if (page) {
    endpoint += `&page=${page}`;
  }
  const response = await fetch(endpoint);
  const obj = await response.json();
  const { data: bookings, count, error } = obj;
  if (error) {
    throw new Error("getBookings: Bookings not found");
  }

  return { bookings, count };
}
// done
export async function getBooking(id) {
  // api/v1/bookings/:id
  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select("*, cabins(*), guests(*)")
  //   .eq("id", id)
  //   .single();
  let endpoint = `${url}/bookings/${id}?fields=bookings.*,guests.*,cabins.*`;
  const response = await fetch(endpoint);
  const { data, error } = await response.json();
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// done
export async function getBookingsAfterDate(date) {
  // api/v1/bookings/?gte

  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select("created_at, totalPrice, extrasPrice")
  //   .gte("created_at", date)
  //   .lte("created_at", getToday({ end: true }));
  const response = await fetch(`${url}/bookings/after-date?date=${date}`);
  const { data, error } = await response.json();
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
// done
export async function getStaysAfterDate(date) {
  // const { data, error } = await supabase
  //   .from("bookings")
  //   // .select('*')
  //   .select("*, guests(fullName)")
  //   .gte("startDate", date)
  //   .lte("startDate", getToday());

  const response = await fetch(`${url}/bookings/stays-after-date?date=${date}`);
  const { data, error } = await response.json();
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
// done
export async function getStaysTodayActivity() {

  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select("*, guests(fullName, nationality, countryFlag)")
  //   .or(
  //     `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
  //   )
  //   .order("created_at");

  const response = await fetch(`${url}/bookings/today-activity`);
  const { data, error } = await response.json();

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// done
export async function updateBooking(id, obj) {
  // const { data, error } = await supabase
  //   .from("bookings")
  //   .update(obj)
  //   .eq("id", id)
  //   .select()
  //   .single();

  const response = await fetch(`${url}/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...obj }),
  });
  const { data, error } = await response.json();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

// done
export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES

  // const { error } = await supabase
  //   .from('bookings')
  //   .delete()
  //   .eq('id', id);
  const response = await fetch(`${url}/bookings/${id}`, {
    method: "DELETE"
  });
  const { error } = await response.json();

  if (error) {
    console.error("delete booking: can't be deleted");
    throw error;
  }
  return id;
}
