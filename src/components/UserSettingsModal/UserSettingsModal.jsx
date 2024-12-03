import React from "react";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import * as Yup from "yup";

import css from "./UserSettingsModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { patchUser } from "../../redux/user/operations";
import { Formik } from "formik";

const validationParams = Yup.object().shape({
  // avatarUrl: Yup.mixed().notRequired(),
  gender: Yup.string().oneOf(["woman", "man"]),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters!")
    .max(50, "Name must not exceed 50 characters!"),
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("Email is required!"),
  weight: Yup.number()
    .typeError("Weight must be a number!")
    .positive("Weight must be a positive number!")
    .max(500, "Please enter a valid weight!"),
  sportParticipation: Yup.number()
    .typeError("Active time must be a number!")
    .positive("Active time must be a positive number!")
    .max(24, "The maximum allowed time is 24 hours!"),
  dailyNorm: Yup.number()
    .typeError("Daily water intake must be a number!")
    .positive("Daily water intake must be a positive number!")
    .max(15, "Daily water intake cannot exceed 15 liters!"),
});

const UserSettingsModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const initialValues = {
    name: user.data.name || "",
    gender: user.data.gender || "woman",
    email: user.data.email || "",
    avatarUrl: user.data.avatarUrl || "",
    weight: user.data.weight || "",
    sportParticipation: user.data.sportParticipation || "",
    dailyNorm: user.data.dailyNorm / 1000 || "",
  };

  const handleSubmit = (values, actions) => {
    console.log({ ...user.data, ...values });
    dispatch(
      patchUser({ ...user.data, ...values })
        .unwrap()
        .then(() => {
          toast.success("Saved info successfully");
        })
        .catch((error) => {
          toast.error("Something went wrong: " + error.message);
        })
    );
  };

  return (
    <div className={css.container}>
      <SimpleBar style={{ maxHeight: "1000px" }}>
        <h3 className={css.title}>Settings</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationParams || null}
        >
          <UserSettingsForm />
        </Formik>
      </SimpleBar>
    </div>
  );
};

export default UserSettingsModal;
