import css from './AdvantagesSection.module.css';
import fitnessDesktop from '../../assets/desktop/fitness.jpg';

export default function AdvantagesSection() {
    return (
        <div
            className={css.section}
            style={{
                backgroundImage: `url(${fitnessDesktop})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
        >
            <div className={css.customersBox}>
                <ul className={css.customerImg}>
                    <li className={css.item}>
                        <div className={css.imgPlaceholder}>👨‍💼</div>
                    </li>

                    <li className={css.item}>
                        <div className={css.imgPlaceholder}>👩‍💻</div>
                    </li>

                    <li className={css.item}>
                        <div className={css.imgPlaceholder}>👨‍🎓</div>
                    </li>
                </ul>

                <p className={css.customerText}>
                    Our <span>happy</span> users
                </p>
            </div>

            <div className={css.benefitsWrapper}>
                <ul className={css.benefitsList}>
                    <li className={css.benefitsItem}>
                        <div className={css.ellipse}></div>
                        <p className={css.text}>Fitness tracking</p>
                    </li>
                    <li className={css.benefitsItem}>
                        <p className={css.textBlack}>Water monitoring</p>
                    </li>
                    <li className={css.benefitsItem}>
                        <p className={css.textBlack}>Progress analytics</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
