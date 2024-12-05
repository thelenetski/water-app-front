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

const UserSettingsForm = ({ setImg }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const [preview, setPreview] = useState(user?.data?.avatarUrl || null);
  const [recommendedDailyNorma, setRecommendedDailyNorma] = useState(null);

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
          <img className={css.avatarImg} src={preview} alt="User's avatar" />
        ) : (
          <img className={css.avatarImg} src={avatar} alt="User's avatar" />
        )}
        <label>
          <div className={css.iconWrapper}>
            <FiUpload className={css.icon} />
            <Field
              type="file"
              name="avatarUrl"
              placeholder="Upload a photo"
              hidden
              onChange={handleFileChange}
            />
            <span className={css.fileUpload}>Upload a photo</span>
          </div>
        </label>
      </div>

      <div className={css.mainWrapper}>
        <div className={css.blockWrapper}>
          <h3 className={css.inputLabel}>Your gender identity</h3>
          <div className={css.checkmarkWrapper}>
            <label className={css.radioWrapper}>
              <Field type="radio" name="gender" value="female" />
              <span className={css.checkmark}></span>
              <span>Woman</span>
            </label>
            <label className={css.radioWrapper}>
              <Field type="radio" name="gender" value="male" />
              <span className={css.checkmark}></span>
              <span>Man</span>
            </label>
          </div>
        </div>
        <div className={css.allInputsWrapper}>
          <div className={css.blockWrapper}>
            <label className={css.inputWrapper}>
              <span className={css.inputLabel}>Yout name</span>
              <Field type="text" name="name" placeholder="Your name" />
              <ErrorMessage
                className={css.errorMessage}
                name="name"
                component="span"
              />
            </label>
            <label className={css.inputWrapper}>
              <span className={css.inputLabel}>Email</span>
              <Field type="text" name="email" placeholder="example@ua.com" />
              <ErrorMessage
                className={css.errorMessage}
                name="email"
                component="span"
              />
            </label>
          </div>

          <div className={css.blockWrapper}>
            <h3 className={css.inputLabel}>My daily norma</h3>
            <ul className={css.listWrapper}>
              <li>
                For woman: <br />
                <span className={css.accentText}>V=(M*0,03) + (T*0,4)</span>
              </li>
              <li>
                For man: <br />
                <span className={css.accentText}>V=(M*0,04) + (T*0,6)</span>
              </li>
            </ul>
            <div className={css.frame}>
              <p>
                <span className={css.accentText}>*</span> V is the volume of the
                water norm in liters per day, M is your body weight, T is the
                time of active sports, or another type of activity commensurate
                in terms of loads (in the absence of these, you must set 0)
              </p>
            </div>
            <div className={css.iconWrapper}>
              <BsExclamationLg className={css.accentIcon} />
              <p>Active time in hours</p>
            </div>
          </div>
          <div className={css.blockWrapper}>
            <label className={css.inputWrapper}>
              <span>Your weight in kilograms:</span>
              <Field type="text" name="weight" placeholder="0" />
              <ErrorMessage
                className={css.errorMessage}
                name="weight"
                component="span"
              />
            </label>
            <label className={css.inputWrapper}>
              <span>The time of active participation in sports:</span>
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
              The required amount of water in liters per day: <br />
              <span className={css.accentText}>{recommendedDailyNorma}L</span>
            </p>
            <label className={css.inputWrapper}>
              <span className={css.inputLabel}>
                Write down how much water you will drink:
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
      <button type="submit" className={clsx("green", css.saveButton)}>
        {loading ? "Loading..." : "Save"}
      </button>
    </Form>
  );
};

export default UserSettingsForm;
