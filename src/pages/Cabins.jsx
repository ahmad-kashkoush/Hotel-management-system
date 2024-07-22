import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "@/services/apiCabins";
import CabinTable from "@/features/cabins/CabinTable";
import Button from "@/ui/Button";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
`;
function Cabins() {
  const [cabinFormOpen, setCabinFormOpen] = useState(false);
  return (
    <Row>
      <Heading as="h1">All cabins</Heading>
      <CabinTable />
      <Button onClick={() => setCabinFormOpen(true)}>create cabin</Button>
      {cabinFormOpen && (
        <Overlay>
          <CreateCabinForm onCancelClick={() => setCabinFormOpen(false)} />
        </Overlay>
      )}
    </Row>
  );
}

export default Cabins;
