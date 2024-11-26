import { useDispatch } from "react-redux";
import { openAddWater, openEditWater } from "./redux/modal/slice";
import ModalWindow from "./components/Modal/Modal.jsx";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

const App = () => {
  const dispatch = useDispatch();

  const handleOpenAddWater = () => {
    dispatch(openAddWater({ amount: 0 })); 
  };

  const handleOpenEditWater = () => {
    dispatch(openEditWater({ id: 1, amount: 500 })); 
  };

  return (
    <div>
      <button onClick={handleOpenAddWater}></button>
      <button onClick={handleOpenEditWater}></button>
      <ModalWindow />

      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
