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
import { useTranslation } from "react-i18next";


const UserSettingsModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [img, setImg] = useState(null);
  const { t } = useTranslation();
  
  const validationParams = Yup.object().shape({
    avatarUrl: Yup.mixed(),
    gender: Yup.string().oneOf([t("userSettingModal.validation.genderFemale"), t("userSettingModal.validation.genderMale")]),
    name: Yup.string()
      .nullable()
      .min(3, t("userSettingModal.validation.nameMin"))
      .max(50, t("userSettingModal.validation.nameMax")),
    email: Yup.string()
      .email(t("userSettingModal.validation.email"))
      .required(t("userSettingModal.validation.emailRequired")),
    weight: Yup.number()
      .typeError(t("userSettingModal.validation.weight"))
      .min(0, t("userSettingModal.validation.weightMin"))
      .max(500, t("userSettingModal.validation.weightMax")),
    sportParticipation: Yup.number()
      .typeError(t("userSettingModal.validation.sportParticipation"))
      .min(0, t("userSettingModal.validation.sportParticipationMin"))
      .max(24, t("userSettingModal.validation.sportParticipationMax")),
    dailyNorm: Yup.number()
      .typeError(t("userSettingModal.validation.dailyNorm"))
      .positive(t("userSettingModal.validation.dailyNormMin"))
      .max(15, t("userSettingModal.validation.dailyNormMax")),
  });

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
        toast.success(t("userSettingModal.toastSuccess"));
        dispatch(getUserCurrent());
      })
      .catch((error) => {
        toast.error(`${t("userSettingModal.toastFailed")} ${error.message}`);
      });
  };

  return (
    <div className={css.container}>
      <SimpleBar style={{ maxHeight: "100%" }}>
        <h3 className={css.title}>{t("userSettingModal.settings")}</h3>
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
