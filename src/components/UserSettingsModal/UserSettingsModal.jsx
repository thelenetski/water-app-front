import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import SimpleBar from "simplebar-react";
import toast from "react-hot-toast";

import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import { getUserCurrent, patchUser } from "../../redux/user/operations";
import { selectUser } from "../../redux/user/selectors";

import "simplebar-react/dist/simplebar.min.css";
import css from "./UserSettingsModal.module.css";
import { data } from "react-router-dom";

const validationParams = Yup.object().shape({
  avatarUrl: Yup.mixed(),
  gender: Yup.string().oneOf(["female", "male"]),
  name: Yup.string()
    .nullable()
    .min(3, "Name must be at least 3 characters!")
    .max(50, "Name must not exceed 50 characters!"),
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("Email is required!"),
  weight: Yup.number()
    .typeError("Weight must be a number!")
    .min(0, "Weight must be a positive number!")
    .max(500, "Please enter a valid weight!"),
  sportParticipation: Yup.number()
    .typeError("Active time must be a number!")
    .min(0, "Active time must be a positive number!")
    .max(24, "The maximum allowed time is 24 hours!"),
  dailyNorm: Yup.number()
    .typeError("Daily water intake must be a number!")
    .positive("Daily water intake must be a positive number!")
    .max(15, "Daily water intake cannot exceed 15 liters!"),
});

const UserSettingsModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [img, setImg] = useState(null);

  console.log(user?.data?.avatarUrl);
  const initialValues = {
    name: user?.data?.name || "",
    gender: user?.data?.gender || "female",
    email: user?.data?.email || "",
    weight: user?.data?.weight || 0,
    sportParticipation: user?.data?.sportParticipation || 0,
    dailyNorm: user?.data?.dailyNorm / 1000 || "",
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    if (values.name) formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    img && formData.append("avatarUrl", img);
    formData.append("weight", Number(values.weight));
    formData.append("sportParticipation", Number(values.sportParticipation));
    formData.append("dailyNorm", Number(values.dailyNorm) * 1000);
    dispatch(patchUser(formData))
      .unwrap()
      .then(() => {
        toast.success("Saved info successfully");
        dispatch(getUserCurrent());
      })
      .catch((error) => {
        toast.error("Something went wrong: " + error.message);
      });
  };

  return (
    <div className={css.container}>
      <SimpleBar style={{ maxHeight: "500px" }}>
        <h3 className={css.title}>Settings</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationParams || null}
        >
          <UserSettingsForm setImg={setImg} />
        </Formik>
      </SimpleBar>
    </div>
  );
};

export default UserSettingsModal;
