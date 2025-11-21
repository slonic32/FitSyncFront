import SignInForm from '../../components/SignInForm/SignInForm';
import Footer from '../../components/Footer/Footer';
import css from './SignInPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';

export default function SignInPage() {
    return (
        <main className={css.container}>
            <div className={css.page}>
                <SignInForm />
                <div className={css.wrap}>
                    <AdvantagesSection />
                    
                </div>
                 
            </div>
            <Footer />
        </main>
    );
}
