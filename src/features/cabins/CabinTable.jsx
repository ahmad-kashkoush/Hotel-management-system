import CabinRow from "@/features/cabins/CabinRow";
import { useGetCabins } from "@/features/cabins/useGetCabins";
import { Spinner, Table } from "@/ui";
import Menus from "@/ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins: allCabins, isLoading } = useGetCabins();
  const [searchParameters] = useSearchParams();
  const filterValue = searchParameters.get("discount");

  if (isLoading) return <Spinner />;
  const filterCondition = (item) => {
    if (filterValue === "with_discount") return item.discount > 0;
    if (filterValue === "without_discount")
      return item.discount < 1 || !item.discount;
    return true;
  };
  const cabins = allCabins.filter((item) => filterCondition(item));

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
