import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWaterDaily } from "../../redux/waters/operations";

const TrackerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWaterDaily());
  }, [dispatch]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
