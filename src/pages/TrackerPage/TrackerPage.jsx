import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import { getUserCurrent } from "../../redux/user/operations";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectUser } from "../../redux/user/selectors";

const TrackerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCurrent());
  }, [dispatch]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
