import { useGetCabins } from "@/features/cabins/useGetCabins";
import TodayActivity from "@/features/check-in-out/TodayActivity";
import DurationChart from "@/features/dashboard/DurationChart";
import SalesChart from "@/features/dashboard/SalesChart";
import Stats from "@/features/dashboard/Stats";
import useGetRecentBooking from "@/features/dashboard/useGetRecentBooking";
import useGetStays from "@/features/dashboard/useGetStays";
import { Spinner } from "@/ui";
import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    recentBookings,
    isLoading: isLoadingBookings,
    numDays,
  } = useGetRecentBooking();
  const { stays, confirmedStays, isLoading: isLoadingStays } = useGetStays();
  const { cabins, isLoading: isLoadingCabins } = useGetCabins();
  if (isLoadingCabins || isLoadingBookings || isLoadingStays)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
