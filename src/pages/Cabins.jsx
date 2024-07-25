import { useState } from "react";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import styled from "styled-components";
import { Button, Heading, Row } from "@/ui";
import AddCabin from "@/pages/AddCabin";

const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
`;
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
