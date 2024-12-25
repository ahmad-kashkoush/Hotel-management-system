import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { Modal } from "@/ui";

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
