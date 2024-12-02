import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./SignUpForm.module.css";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/auth/operations";
import sprite from "../../../public/sprite.svg";
import { selectAuthLoading } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import { getUserCurrent } from "../../redux/user/operations";

const validationParams = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email!")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be less than 50 characters")
    .matches(/^[A-Za-z\d]+$/, "Password can only contain letters and numbers")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  showPassword: false,
  showRepeatPassword: false,
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const handleSubmit = (values, actions) => {
    dispatch(
      signUp({
        email: values.email,
        password: values.password,
        repeatPassword: values.repeatPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("You have successfully registered!");
        dispatch(getUserCurrent());
        actions.resetForm();
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
        actions.setSubmitting(false);
      });
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationParams}
      >
        {({
          values,
          setFieldValue,
          isValid,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form className={css.form}>
            <h2 className={css.title}>Sign Up</h2>
<div className={css.logoWrapper}>
  <Logo/>
  </div>
        
            <label>
              <span className={css.inputLabel}>Email</span>
              <Field
                className={clsx(css.field, {
                  [css.fieldError]: errors.email && touched.email,
                })}
                type="email"
                name="email"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </label>

            <label>
              <span className={css.inputLabel}>Password</span>
              <div className={css.passwordWrapper}>
                <Field
                  className={clsx(css.field, {
                    [css.fieldError]: errors.password && touched.password,
                  })}
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={() =>
                    setFieldValue("showPassword", !values.showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  <svg className={css.icon}>
                    <use
                      href={`${sprite}#icon-${
                        values.showPassword ? "eye" : "eye-off"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </label>

            <label>
              <span className={css.inputLabel}>Repeat Password</span>
              <div className={css.passwordWrapper}>
                <Field
                  className={clsx(css.field, {
                    [css.fieldError]:
                      errors.repeatPassword && touched.repeatPassword,
                  })}
                  type={values.showRepeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  placeholder="Repeat your password"
                  aria-label="Repeat Password"
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={() =>
                    setFieldValue("showRepeatPassword", !values.showRepeatPassword)
                  }
                  aria-label="Toggle repeat password visibility"
                >
                  <svg className={css.icon}>
                    <use href={`${sprite}#icon-${values.showRepeatPassword ? "eye" : "eye-off"}`} />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                className={css.error}
                name="repeatPassword"
                component="span"
              />
            </label>

            <button
              className={css.button}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
            <p className={css.signuptext}>
              <span>Already have an account? </span>
              <Link to="/signin" className={css.signinlink}>
                Sign In
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;

