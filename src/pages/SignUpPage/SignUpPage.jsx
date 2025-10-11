import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import css from './SignUpPage.module.css';

export default function SignUpPage() {
    return (
        <main className={css.container}>
            <div className={css.page}>
                <SignUpForm />
                <div className={css.wrap}>
                    <AdvantagesSection />
                </div>
            </div>
        </main>
    );
}
