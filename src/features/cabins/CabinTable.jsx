import CabinRow from "@/features/cabins/CabinRow";
import { useGetCabins } from "@/features/cabins/useGetCabins";
import { getCabins } from "@/services/apiCabins";
import { Spinner, Table } from "@/ui";
import Menus from "@/ui/Menus";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

function CabinTable() {
  const { cabins, isLoading } = useGetCabins();

  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Menus>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Menus>
    </Table>
  );
}
export default CabinTable;
