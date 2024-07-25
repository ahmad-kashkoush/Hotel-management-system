import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { Modal } from "@/ui";
import { HiPencil } from "react-icons/hi2";

function EditCabin({ cabin }) {
  return (
    <Modal>
      <Modal.Open opens={"edit-cabin-form"}>
        <button>
          <HiPencil />
        </button>
      </Modal.Open>
      <Modal.Window name="edit-cabin-form">
        <CreateCabinForm curCabin={cabin} />
      </Modal.Window>
    </Modal>
  );
}
export default EditCabin;
