import { Formik, Form, Field } from "formik";
import css from "./SignInForm.module.css";

const INITIAL_VALUES = { userEmail: "", userPassword: "" };

const SignInForm = () => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <div>
      <h2 className={css.title}>Sign In</h2>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <label>
            <span>Email</span>
            <Field
              className={css.field}
              type="email"
              name="userEmail"
              placeholder="Enter your email"
            />
          </label>
          <label>
            <span>Password</span>
            <Field
              className={css.field}
              type="password"
              name="userPassword"
              placeholder="Enter your password"
            />
          </label>
          <button className={css.button} type="submit">
            Sign in
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default SignInForm;
