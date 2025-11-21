import css from './Footer.module.css';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className={css.sidebar}>
            <p className={css.label}>Follow us</p>

            <ul className={css.icons}>
                <li>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <FaInstagram className={css.icon} />
                    </a>
                </li>
                <li>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <FaFacebook className={css.icon} />
                    </a>
                </li>
                <li>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer">
                        <FaYoutube className={css.icon} />
                    </a>
                </li>
            </ul>
        </div>
    );
}
