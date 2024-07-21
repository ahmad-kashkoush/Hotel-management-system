import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "@/services/apiCabins";
import CabinTable from "@/features/cabins/CabinTable";

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row>
      <Heading as="h1">All cabins</Heading>
      <CabinTable />
    </Row>
  );
}

export default Cabins;
