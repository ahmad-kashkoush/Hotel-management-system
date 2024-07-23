import { useState } from "react";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import styled from "styled-components";
import { Button, Heading, Row } from "@/ui";

const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
`;
function Cabins() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Row>
      <Heading as="h1">All cabins</Heading>
      <CabinTable />
      <Button onClick={() => setOpenForm(true)}>create cabin</Button>
      {openForm && (
        <Overlay>
          <CreateCabinForm onCloseForm={() => setOpenForm(false)} />
        </Overlay>
      )}
    </Row>
  );
}

export default Cabins;
