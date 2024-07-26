import EditCabin from "@/features/cabins/EditCabin";
import { useCreateCabin } from "@/features/cabins/useCreateCabin";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";
import { ConfirmDelete, Modal, Table } from "@/ui";
import { formatCurrency } from "@/utils/helpers";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";



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

  const { deleteRow, isDeleting } = useDeleteCabin();
  const { createCabin, isCreatingCabin } = useCreateCabin();
  function handleCreateCabin() {
    createCabin({
      name: `copy of ${name}`,
      maxcapacity,
      regularprice,
      discount,
      image,
    });
  }
  const isLoading = isCreatingCabin || isDeleting;
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits up to {maxcapacity} guests</div>
        <Price>{formatCurrency(regularprice)}</Price>
        <Discount>{discount}</Discount>
        <div>
          <Modal>
            <Modal.Open opens="delete-cabin">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName={name}
                disabled={isLoading}
                onConfirm={() => deleteRow(cabinId)}
              />
            </Modal.Window>
          </Modal>
          <EditCabin cabin={cabin} />
          <button disabled={isLoading} onClick={handleCreateCabin}>
            <HiSquare2Stack />
          </button>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
