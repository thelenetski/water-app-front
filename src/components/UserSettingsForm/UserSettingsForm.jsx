import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { BsExclamationLg } from "react-icons/bs";
import toast from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { selectUser } from "../../redux/user/selectors";
import { patchUser } from "../../redux/user/operations";

import css from "./UserSettingsForm.module.css";
import avatar from "../../img/default-avatar.webp";

const validationParams = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!"),
  gender: Yup.string().oneOf(["woman", "man"]),
  email: Yup.string().email("Enter a valid email!").required("Required"),
  photo: Yup.object().shape({
    name: Yup.string().required(),
  }),
  weight: Yup.number()
    .max(500, "Enter a valid value")
    .positive("Enter a valid value"),
  hoursOfSport: Yup.number()
    .max(24, "Enter a valid value")
    .positive("Enter a valid value"),
  dailyNorma: Yup.number()
    .max(15, "Enter a valid value")
    .positive("Enter a valid value"),
});

const UserSettingsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [preview, setPreview] = useState(user.avatarUrl || null);
  const [gender, setGender] = useState("moman");
  const [weight, setWeight] = useState(0);
  const [hoursOfSport, setHoursOfSport] = useState(0);
  const [recommendedDailyNorma, setRecommendedDailyNorma] = useState(null);
  // const { values, setFieldValue } = useFormikContext();

  const initialValues = {
    name: user.name || "",
    gender: user.gender || "woman",
    email: user.email || "",
    photo: user.avatarUrl || "",
    weight: user.weight || "",
    hoursOfSport: user.sportParticipation || "",
    dailyNorma: user.dailyNorm / 1000 || "",
  };

  // useEffect(() => {
  //   //dispatch(getUserCurrent());
  // }, []);

  useEffect(() => {
    let norma = 1.8;
    if (weight) {
      if (gender === "woman") {
        norma = weight * 0.03 + hoursOfSport * 0.4;
      } else {
        norma = weight * 0.04 + hoursOfSport * 0.6;
      }
    }
    setRecommendedDailyNorma(norma.toFixed(1));
  }, [weight, hoursOfSport, gender]);

  // useEffect(() => {
  //   if (values.weight) {
  //     norma =
  //       values.gender === "woman"
  //         ? values.weight * 0.03 + values.hoursOfSport * 0.4
  //         : values.weight * 0.04 + values.hoursOfSport * 0.6;
  //   } else {
  //     norma = "1.8";
  //   }
  //   setFieldValue("dailyNorma", norma.toFixed(1));
  // }, [values.weight, values.hoursOfSport, values.gender]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Створення URL для файлу
    }
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      patchUser({
        ...user,
        values,
      })
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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationParams}
    >
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
                name="photo"
                placeholder="Upload a photo"
                hidden
                onChange={handleFileChange}
              />
              <span>Upload a photo</span>
            </div>
          </label>
        </div>

        <div className={css.mainWrapper}>
          <div className={css.blockWrapper}>
            <h3 className={css.inputLabel}>Your gender identity</h3>
            <div className={css.checkmarkWrapper}>
              <label className={css.radioWrapper}>
                <Field
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={gender === "woman"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <span className={css.checkmark}></span>
                <span>Woman</span>
              </label>
              <label className={css.radioWrapper}>
                <Field
                  type="radio"
                  name="gender"
                  value="man"
                  checked={gender === "man"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
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
                  <span className={css.accentText}>*</span> V is the volume of
                  the water norm in liters per day, M is your body weight, T is
                  the time of active sports, or another type of activity
                  commensurate in terms of loads (in the absence of these, you
                  must set 0)
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
                <Field
                  type="text"
                  name="weight"
                  placeholder="0"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="weight"
                  component="span"
                />
              </label>
              <label className={css.inputWrapper}>
                <span>The time of active participation in sports:</span>
                <Field
                  type="text"
                  name="hoursOfSport"
                  placeholder="0"
                  value={hoursOfSport}
                  onChange={(e) => {
                    setHoursOfSport(e.target.value);
                  }}
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="hoursOfSport"
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
                <Field type="text" name="dailyNorma" placeholder="1.8" />
                <ErrorMessage
                  className={css.errorMessage}
                  name="dailyNorma"
                  component="span"
                />
              </label>
            </div>
          </div>
        </div>
        <button className={css.saveButton} type="submit">
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default UserSettingsForm;
