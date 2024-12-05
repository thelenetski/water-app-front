import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import { getUserCurrent } from "../../redux/user/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUserLoading } from "../../redux/user/selectors";

const TrackerPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(getUserCurrent());
  }, [dispatch]);

  return (
    <>
      {!loading && (
        <>
          <WaterMainInfo />
          <WaterDetailedInfo />
        </>
      )}
    </>
  );
};

export default TrackerPage;
