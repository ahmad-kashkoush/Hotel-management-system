import AddCabin from "@/features/cabins/AddCabin";
import CabinTable from "@/features/cabins/CabinTable";
import { Heading, Row } from "@/ui";

function Cabins() {
  return (
    <Row>
      <Heading as="h1">All cabins</Heading>
      <CabinTable />
      <AddCabin />
    </Row>
  );
}

export default Cabins;
