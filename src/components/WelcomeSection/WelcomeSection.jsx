import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import css from './WelcomeSection.module.css';

export default function WelcomeSection() {
    return (
        <>
            <Logo />
            <div className={css.welcomeWrapper}>
                <div className={css.welcomContent}>
                    <p className={css.text}>Track your fitness journey and achieve</p>
                    <h1 className={css.mainTitle}>Fitness goals tracker</h1>
                    <div className={css.linkWrapper}>
                        <NavLink to="/signup" className={css.linkTracker}>
                            Try tracker
                        </NavLink>
                        <NavLink to="/signin" className={css.linkSignIn}>
                            Sign In
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}
