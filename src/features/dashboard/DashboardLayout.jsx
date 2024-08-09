import { useGetCabins } from "@/features/cabins/useGetCabins";
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
  console.log(recentBookings);
  return (
    <StyledDashboardLayout>
      <Stats
       bookings={recentBookings} 
       confirmedStays={confirmedStays}
       numDays={numDays}
       cabinsCount={cabins.length}
       
       />
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
