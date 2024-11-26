import { Field, Form, Formik, ErrorMessage } from 'formik';
import css from './SignUpForm.module.css';
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signUp } from '../../redux/auth/operations';
const validationParams = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email!")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be less than 50 characters")
    .matches(
      /^[A-Za-z\d]+$/,
      "Password can only contain letters and numbers"
    )
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
}

const SignUpForm = () => {
  const dispatch = useDispatch();

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
        toast.success('You have successfully registered!');
        actions.resetForm();
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
      });
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationParams}>
        <Form className={css.form}>
          <h2 className={css.title}>Sign Up</h2>

          <label>
            <span>Email</span>
            <Field
              className={css.field}
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
            <span>Password</span>
            <Field
              className={css.field}
              type="password"
              name="password"
              placeholder="Enter your password"
              aria-label="Password"
            />
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </label>
          <label>
            <span>Repeat Password</span>
            <Field
              className={css.field}
              type="password"
              name="repeatPassword"
              placeholder="Repeat your password"
              aria-label="Repeat Password"
            />
            <ErrorMessage
              className={css.error}
              name="repeatPassword"
              component="span"
            />
          </label>

          <button
            className={css.button}
            type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
      <div className={css.signInLink}>
        <span>Already have an account? </span>
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default SignUpForm;
