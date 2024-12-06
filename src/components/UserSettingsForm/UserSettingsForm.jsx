import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { BsExclamationLg } from "react-icons/bs";

import clsx from "clsx";
import { Form, Field, ErrorMessage } from "formik";
import { useFormikContext } from "formik";

import { selectUser, selectUserLoading } from "../../redux/user/selectors";

import css from "./UserSettingsForm.module.css";
import avatar from "../../img/default-avatar.webp";
import { useTranslation } from "react-i18next";

const UserSettingsForm = ({ setImg }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const [preview, setPreview] = useState(user?.data?.avatarUrl || null);
  const [recommendedDailyNorma, setRecommendedDailyNorma] = useState(null);
  const { t } = useTranslation();

  const { values } = useFormikContext();

  useEffect(() => {
    if (values.weight) {
      const norma =
        values.gender === "female"
          ? values.weight * 0.03 + values.sportParticipation * 0.4
          : values.weight * 0.04 + values.sportParticipation * 0.6;
      setRecommendedDailyNorma(norma.toFixed(1));
    } else setRecommendedDailyNorma(1.8);
  }, [values.weight, values.sportParticipation, values.gender]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Створення URL для файлу
      setImg(file);
    }
  };

  return (
    <Form className={css.formWrapper}>
      <div className={css.fileWrapper}>
        {preview ? (
          <img
            className={css.avatarImg}
            src={preview}
            alt={t("userSettingsForm.avatarAlt")}
          />
        ) : (
          <img
            className={css.avatarImg}
            src={avatar}
            alt={t("userSettingsForm.avatarAlt")}
          />
        )}
        <label>
          <div className={css.iconWrapper}>
            <FiUpload className={css.icon} />
            <Field
              type="file"
              name="avatarUrl"
              placeholder={t("userSettingsForm.uploadPhoto")}
              hidden
              onChange={handleFileChange}
            />
            <span className={css.fileUpload}>
              {t("userSettingsForm.uploadPhoto")}
            </span>
          </div>
        </label>
      </div>

      <div className={css.mainWrapper}>
        <div className={css.blockWrapper}>
          <h3 className={css.inputLabel}>
            {t("userSettingsForm.genderIdentity")}
          </h3>
          <div className={css.checkmarkWrapper}>
            <label className={css.radioWrapper}>
              <Field type="radio" name="gender" value="female" />
              <span className={css.checkmark}></span>
              <span>{t("userSettingsForm.genderFemale")}</span>
            </label>
            <label className={css.radioWrapper}>
              <Field type="radio" name="gender" value="male" />
              <span className={css.checkmark}></span>
              <span>{t("userSettingsForm.genderMale")}</span>
            </label>
          </div>
        </div>
        <div className={css.allInputsWrapper}>
          <div className={css.blockWrapper}>
            <label className={css.inputWrapper}>
              <span className={css.inputLabel}>
                {t("userSettingsForm.nameLabel")}
              </span>
              <Field
                type="text"
                name="name"
                placeholder={t("userSettingsForm.namePlaceholder")}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="name"
                component="span"
              />
            </label>
            <label className={css.inputWrapper}>
              <span className={css.inputLabel}>
                {t("userSettingsForm.emailLabel")}
              </span>
              <Field
                type="text"
                name="email"
                placeholder={t("userSettingsForm.emailPlaceholder")}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="email"
                component="span"
              />
            </label>
          </div>

          <div className={css.blockWrapper}>
            <h3 className={css.inputLabel}>
              {t("userSettingsForm.dailyNormTitle")}
            </h3>
            <ul className={css.listWrapper}>
              <li>
                {t("userSettingsForm.dailyNormWoman")}: <br />
                <span className={css.accentText}>
                  {t("userSettingsForm.formulaWoman")}
                </span>
              </li>
              <li>
                {t("userSettingsForm.dailyNormMan")} <br />
                <span className={css.accentText}>
                  {t("userSettingsForm.formulaMan")}
                </span>
              </li>
            </ul>
            <div className={css.frame}>
              <p>
                <span className={css.accentText}>*</span>{" "}
                {t("userSettingsForm.formulaExplanation")}
              </p>
            </div>
            <div className={css.iconWrapper}>
              <BsExclamationLg className={css.accentIcon} />
              <p>{t("userSettingsForm.activeTimeLabel")}</p>
            </div>
          </div>
          <div className={css.blockWrapper}>
            <label className={css.inputWrapper}>
              <span>{t("userSettingsForm.weightLabel")}</span>
              <Field type="text" name="weight" placeholder="0" />
              <ErrorMessage
                className={css.errorMessage}
                name="weight"
                component="span"
              />
            </label>
            <label className={css.inputWrapper}>
              <span>{t("userSettingsForm.sportParticipationLabel")}</span>
              <Field type="text" name="sportParticipation" placeholder="0" />
              <ErrorMessage
                className={css.errorMessage}
                name="sportParticipation"
                component="span"
              />
            </label>
          </div>

          <div className={css.blockWrapper}>
            <p>
              {t("userSettingsForm.waterRequired")}: <br />
              <span className={css.accentText}>{recommendedDailyNorma}L</span>
            </p>
            <label className={css.inputWrapper}>
              <span className={css.inputLabel}>
                {t("userSettingsForm.waterInputLabel")}
              </span>
              <Field type="text" name="dailyNorm" placeholder="1.8" />
              <ErrorMessage
                className={css.errorMessage}
                name="dailyNorm"
                component="span"
              />
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={clsx("green", css.saveButton)}
        disabled={loading.main}
      >
        {loading.main
          ? t("userSettingsForm.loading")
          : t("userSettingsForm.saveButton")}
      </button>
    </Form>
  );
};

export default UserSettingsForm;
