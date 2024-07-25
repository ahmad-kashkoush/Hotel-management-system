import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { Button, Modal } from "@/ui";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>create cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {

//   return (
//     <>
//       <Button onClick={() => setOpenModal(true)}>create cabin</Button>
//       {openModal && (
//         <>
//           <Modal>
//             <div>
//               <CreateCabinForm onCloseForm={() => setOpenModal(false)} />
//             </div>
//             <Modal.Close onClose={() => setOpenModal(false)} />
//           </Modal>
//         </>
//       )}
//     </>
//   );
// }
export default AddCabin;
