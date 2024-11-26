import "./App.css";
import { useDispatch } from "react-redux";
import { openAddWater, closeModal } from "./redux/modal/slice";
import ModalWindow from "./components/Modal/Modal.jsx";

const App = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openAddWater()); 
  };

  const handleSuccess = () => {
    alert("Confirmed!");
    dispatch(closeModal()); 
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <ModalWindow onSuccess={handleSuccess}>
        <p>This is the content of the modal.</p>
      </ModalWindow>
    </div>
  );
};

export default App;
