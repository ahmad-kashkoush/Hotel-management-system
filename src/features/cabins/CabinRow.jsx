import EditCabin from "@/features/cabins/EditCabin";
import { useCreateCabin } from "@/features/cabins/useCreateCabin";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";
import { ConfirmDelete, Modal, Table } from "@/ui";
import Menus from "@/ui/Menus";
import { formatCurrency } from "@/utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
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
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName={name}
                disabled={isLoading}
                onConfirm={() => deleteRow(cabinId)}
              />
            </Modal.Window>
            <EditCabin cabin={cabin} />

            <Menus.Menu>
              <Menus.Toggle opens={cabinId} />
              <Menus.List id={cabinId}>
                <Modal.Open opens="delete-cabin">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
                <Menus.Button
                  disabled={isLoading}
                  onClick={handleCreateCabin}
                  icon={<HiSquare2Stack />}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit-cabin">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
