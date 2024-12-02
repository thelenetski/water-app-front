import Loader from "../Loader/Loader";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ModalWindow from "../ModalWindow/ModalWindow";
import { modalTypes } from "../../redux/modal/slice";
import WaterModal from "../WaterModal/WaterModal";
import { useSelector } from "react-redux";
import { selectTypeModal } from "../../redux/modal/selectors";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import LogOutModal from "../LogOutModal/LogOutModal";
import DeleteModal from "../DeleteModal/DeleteModal";

const SharedLayout = ({ children }) => {
  const type = useSelector(selectTypeModal);

  return (
    <main>
      <div className="container">
        <div className="pageContentWrapper">
          <Toaster position="top-center" />
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <ModalWindow>
            {type === modalTypes.addWater && <WaterModal />}
            {type === modalTypes.editWater && <WaterModal />}
            {type === modalTypes.confirmDelete && <DeleteModal />}
            {type === modalTypes.editUser && <UserSettingsModal />}
            {type === modalTypes.confirmLogOutUser && <LogOutModal />}
          </ModalWindow>
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;
