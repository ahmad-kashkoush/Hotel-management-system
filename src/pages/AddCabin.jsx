import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { Button } from "@/ui";
import Modal from "@/ui/Modal";
import { useState } from "react";

function AddCabin() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>create cabin</Button>
      {openModal && (
        <>
          <Modal onClose={() => setOpenModal(false)}>
            <CreateCabinForm onCloseForm={() => setOpenModal(false)} />
          </Modal>
        </>
      )}
    </>
  );
}
export default AddCabin;
