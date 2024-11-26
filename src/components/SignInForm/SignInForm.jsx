import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import css from "./SignInForm.module.css";
import * as Yup from "yup";
import { signIn } from "../../redux/auth/operations";

const UserValidationSchema = Yup.object().shape({
  userEmail: Yup.string().email("Must be a valid email!").required("Required"),
  userPassword: Yup.string().required("No password provided"),
});

const INITIAL_VALUES = { userEmail: "", userPassword: "" };

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        signIn({
          email: values.userEmail,
          password: values.userPassword,
        })
      ).unwrap();
      toast.success("Login successful!");
      actions.resetForm();
      navigate("/tracker");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={UserValidationSchema}
      >
        <Form className={css.form}>
          <h2 className={css.title}>Sign In</h2>
          <label>
            <span className={css.inputLabel}>Email</span>
            <Field
              className={css.field}
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
            <Field
              className={css.field}
              type="password"
              name="userPassword"
              placeholder="Enter your password"
              aria-label="Password"
            />
            <ErrorMessage
              className={css.error}
              name="userPassword"
              component="span"
            />
          </label>
          <button className={css.button} type="submit">
            Sign in
          </button>
          <p className={css.signuptext}>
            Don’t have an account?{" "}
            <span className={css.signuplink}>Sign Up</span>
          </p>
        </Form>
      </Formik>
    </div>
  );
};
export default SignInForm;
