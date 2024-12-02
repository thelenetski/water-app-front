import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SignInForm.module.css";
import { clsx } from "clsx";
import * as Yup from "yup";
import { signIn } from "../../redux/auth/operations";
import { selectAuthLoading } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import { getUserCurrent } from "../../redux/user/operations";
import { getWaterDaily } from "../../redux/waters/operations";
import { selectActiveDay } from "../../redux/waters/selectors";

const UserValidationSchema = Yup.object().shape({
  userEmail: Yup.string().email("Must be a valid email!").required("Required"),
  userPassword: Yup.string().required("No password provided"),
});

const INITIAL_VALUES = { userEmail: "", userPassword: "" };

const SignInForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const activeDay = useSelector(selectActiveDay);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(
      signIn({
        email: values.userEmail,
        password: values.userPassword,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getUserCurrent())
          .unwrap()
          .then(() => {
            dispatch(
              getWaterDaily({
                day: activeDay.day,
                month: activeDay.month,
                year: activeDay.year,
              })
            );
          });
        toast.success("Login successful!");
        actions.resetForm();
        actions.setSubmitting(false);
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
        actions.setSubmitting(false);
      });
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={UserValidationSchema}
      >
        {({ isValid, isSubmitting, errors, touched }) => (
          <Form className={css.form}>
            <div className={css.logoWrapper}>
              <Logo />
            </div>
            <h2 className={css.title}>Sign In</h2>
            <label>
              <span className={css.inputLabel}>Email</span>
              <Field
                className={clsx(css.field, {
                  [css.fieldError]: errors.userEmail && touched.userEmail,
                })}
                type="email"
                name="userEmail"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <ErrorMessage
                className={css.error}
                name="userEmail"
                component="span"
              />
            </label>
            <label>
              <span className={css.inputLabel}>Password</span>
              <div className={css.passwordWrapper}>
                <Field
                  className={clsx(css.field, {
                    [css.fieldError]:
                      errors.userPassword && touched.userPassword,
                  })}
                  type={showPassword ? "text" : "password"}
                  name="userPassword"
                  placeholder="Enter your password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      xlinkHref={`/sprite.svg#icon-${
                        showPassword ? "eye" : "eye-off"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                className={css.error}
                name="userPassword"
                component="span"
              />
            </label>
            <button
              className={css.button}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
            <p className={css.signuptext}>
              Don’t have an account?{" "}
              <Link to="/signup" className={css.signuplink}>
                Sign Up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignInForm;
