import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./UserSettingsForm.module.css";

const validationParams = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!"),
  gender: Yup.string(),
  email: Yup.string().email("Enter a valid email!").required("Required"),
  photo: Yup.object().shape({
    name: Yup.string().required(),
  }),
  weight: Yup.number().positive("Enter a valid value"),
  hoursOfSport: Yup.number().positive("Enter a valid value"),
  dailyNorma: Yup.number().positive("Enter a valid value"),
});

const UserSettingsForm = () => {
  const initialValues = {
    name: "",
    gender: "",
    email: "",
    photo: "",
    weight: "",
    hoursOfSport: "",
    dailyNorma: "",
  };

  const handleSubmit = (values, actions) => {
    //dispatch(saveUserDetailes(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationParams}
    >
      <Form className={css.formWrapper}>
        <div>
          <img
            src="https://asset.cloudinary.com/ddnec043i/7dc05ee7548750df3fe52311a1247853"
            alt="avatar"
          />
          <label>
            <Field type="file" name="photo" placeholder="Upload a photo" />
            <span>Upload a photo</span>
          </label>
        </div>

        <div>
          <h3 className={css.inputLabel}>Your gender identity</h3>
          <label>
            <Field type="radio" name="gender" value="Woman" checked={true} />
            <span>Woman</span>
          </label>
          <label>
            <Field type="radio" name="gender" value="Man" />
            <span>Man</span>
          </label>
        </div>

        <div className={css.blockWrapper}>
          <label className={css.wrapper}>
            <span className={css.inputLabel}>Yout name</span>
            <Field type="text" name="name" placeholder="Your name" />
            <ErrorMessage name="name" component="span" />
          </label>
          <label className={css.wrapper}>
            <span className={css.inputLabel}>Email</span>
            <Field type="text" name="email" placeholder="example@ua.com" />
            <ErrorMessage name="email" component="span" />
          </label>
        </div>

        <div className={css.blockWrapper}>
          <h3 className={css.inputLabel}>My daily norma</h3>
          <ul>
            <li>
              For woman:{" "}
              <span className={css.highlightedText}>V=(M*0,03) + (T*0,4)</span>
            </li>
            <li>
              For man:{" "}
              <span className={css.highlightedText}>V=(M*0,04) + (T*0,6)</span>
            </li>
          </ul>
          <div className={css.frame}>
            <p>
              <span className={css.highlightedText}>*</span> V is the volume of
              the water norm in liters per day, M is your body weight, T is the
              time of active sports, or another type of activity commensurate in
              terms of loads (in the absence of these, you must set 0)
            </p>
          </div>
          <p>Active time in hours</p>
          <div>
            <label className={css.wrapper}>
              <span>Your weight in kilograms:</span>
              <Field type="text" name="weight" placeholder="0" />
              <ErrorMessage name="weight" component="span" />
            </label>
            <label className={css.wrapper}>
              <span>The time of active participation in sports:</span>
              <Field type="text" name="hoursOfSport" placeholder="0" />
              <ErrorMessage name="hoursOfSport" component="span" />
            </label>
          </div>
        </div>

        <div className={css.blockWrapper}>
          <p>
            The required amount of water in liters per day: <br />
            <span className={css.highlightedText}>1.8L</span>
          </p>
          <label className={css.wrapper}>
            <span className={css.inputLabel}>
              Write down how much water you will drink:
            </span>
            <Field type="text" name="dailyNorma" placeholder="1.8" />
            <ErrorMessage name="dailyNorma" component="span" />
          </label>
        </div>
        <button className={css.saveButton} type="submit">
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default UserSettingsForm;
