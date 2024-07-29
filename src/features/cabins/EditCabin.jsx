import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { Modal } from "@/ui";
import Menus from "@/ui/Menus";
import { HiPencil } from "react-icons/hi2";

function EditCabin({ cabin }) {
  return (
    <>
      <Modal.Window name="edit-cabin">
        <CreateCabinForm curCabin={cabin} />
      </Modal.Window>
    </>
  );
}
export default EditCabin;
