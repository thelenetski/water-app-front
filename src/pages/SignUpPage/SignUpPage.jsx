import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from './SignUpPage.module.css';
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import Logo from '../../components/Logo/Logo';
const SignUpPage = ()=>{
return(
<>
<main className={css.signUpPage}>
    <section className={css.formWrapper}>

        <SignUpForm/>
        </section>
        <section className={css.advantagesWrapper}>
          <AdvantagesSection />
        </section>
    </main>
</>
)
};

export default SignUpPage;