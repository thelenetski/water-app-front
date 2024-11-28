import SignInForm from "../../components/SignInForm/SignInForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <>
      <main className={css.signInPage}>
        <section className={css.formWrapper}>
          <SignInForm />
        </section>
        <section className={css.advantagesWrapper}>
          <AdvantagesSection />
        </section>
      </main>
    </>
  );
};

export default SignInPage;
