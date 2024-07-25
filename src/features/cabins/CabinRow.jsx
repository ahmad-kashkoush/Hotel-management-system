// import { formatCurrency } from "@/utils/helpers";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { useCreateCabin } from "@/features/cabins/useCreateCabin";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxcapacity,
    regularprice,
    discount,
    image,
  } = cabin;
  const [formOpen, setFormOpen] = useState(false);

  const { deleteRow, isDeleting } = useDeleteCabin();
  const { createCabin, isCreatingCabin } = useCreateCabin();
  function handleCreateCabin() {
    createCabin({
      name,
      maxcapacity,
      regularprice,
      discount,
      image,
    });
  }
  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxcapacity} guests</div>
        <Price>{formatCurrency(regularprice)}</Price>
        <Discount>{discount}</Discount>
        <div>
          <button disabled={isDeleting} onClick={() => deleteRow(cabinId)}>
            <HiTrash />
          </button>
          <button onClick={() => setFormOpen(true)}><HiPencil /></button>
          <button onClick={handleCreateCabin}><HiSquare2Stack /></button>
        </div>
      </TableRow>
      {formOpen && (
        <CreateCabinForm
          curCabin={cabin}
          onCloseForm={() => setFormOpen(false)}
        />
      )}
    </>
  );
}
export default CabinRow;
