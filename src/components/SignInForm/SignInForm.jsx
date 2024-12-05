import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import css from "./SignInForm.module.css";
import { clsx } from "clsx";
import * as Yup from "yup";
import {
  confirmGoogleOAuth,
  googleSignIn,
  signIn,
} from "../../redux/auth/operations";
import { selectAuthLoading } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";
import googleAuthLogo from "../../img/google-auth.png";
import { useTranslation } from "react-i18next";

// const UserValidationSchema = Yup.object().shape({
//   userEmail: Yup.string()
//     .email(t("signInForm.validation.email"))
//     .required(t("signInForm.validation.emailRequired")),
//   userPassword: Yup.string().required(
//     t("signInForm.validation.requiredPassword")
//   ),
// });

// const INITIAL_VALUES = { userEmail: "", userPassword: "" };

const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  
  const UserValidationSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email(t("signInForm.validation.email"))
      .required(t("signInForm.validation.emailRequired")),
    userPassword: Yup.string().required(
      t("signInForm.validation.requiredPassword")
    ),
  });

  const INITIAL_VALUES = { userEmail: "", userPassword: "" };

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
        toast.success(t("signInForm.toastSuccess"));
        actions.resetForm();
        actions.setSubmitting(false);
      })
      .catch((error) => {
        toast.error(`${t("signInForm.toastFailed")} ${error.message}`);
        actions.setSubmitting(false);
      });
  };

  const googleHandleSubmit = () => {
    dispatch(googleSignIn())
      .unwrap()
      .then((url) => (window.location.href = url))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params || params.toString() === "") {
      return;
    }
    const code = params.get("code");
    if (code) {
      dispatch(confirmGoogleOAuth(code))
        .unwrap()
        .then(() => {
          toast.success(t("signInForm.toastGoogleSuccess"));
        })
        .catch((error) => {
          toast.error(
            t("signInForm.toastGoogleFailed", { error: error.message })
          );
        });
    } else {
      console.error("Authorization code not found in URL");
    }
  }, [dispatch]);

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
            <h2 className={css.title}>{t("signInForm.signinTitle")}</h2>
            <label>
              <span className={css.inputLabel}>
                {t("signInForm.signinEmail")}
              </span>
              <Field
                className={clsx(css.field, {
                  [css.fieldError]: errors.userEmail && touched.userEmail,
                })}
                type="email"
                name="userEmail"
                placeholder={t("signInForm.signinEmailField")}
                aria-label="Email"
              />
              <ErrorMessage
                className={css.error}
                name="userEmail"
                component="span"
              />
            </label>
            <label>
              <span className={css.inputLabel}>
                {t("signInForm.signinPassword")}
              </span>
              <div className={css.passwordWrapper}>
                <Field
                  className={clsx(css.field, {
                    [css.fieldError]:
                      errors.userPassword && touched.userPassword,
                  })}
                  type={showPassword ? "text" : "password"}
                  name="userPassword"
                  placeholder={t("signInForm.signupPasswordField")}
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
            <div className={css.signInFormBtnWrap}>
              <button
                className={css.button}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                {loading.signIn
                  ? t("signInForm.signinBtnLoading")
                  : t("signInForm.signinBtnSignin")}
              </button>
              <button
                className={css.button}
                type="button"
                onClick={googleHandleSubmit}
              >
                <picture>
                  <img src={googleAuthLogo} alt="google logo" />
                </picture>
                {loading.googleSignIn ? t("signInForm.signinBtnLoading") : t("signInForm.signinWithGoogle")}
              </button>
            </div>
            <p className={css.signuptext}>
              {t("signInForm.signintext")}{" "}
              <Link to="/signup" className={css.signuplink}>
                {t("signInForm.signinLink")}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignInForm;
