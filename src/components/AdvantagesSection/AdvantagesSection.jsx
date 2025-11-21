import { useState } from 'react';
import css from './AdvantagesSection.module.css';
import fitnessDesktop from '../../assets/desktop/fitness.jpg';

// import your real images
import boy from '../../assets/desktop/boy.png';
import girlOne from '../../assets/desktop/girlOne.png';
import girlTwo from '../../assets/desktop/girlTwo.png';


export { boy, girlOne, girlTwo };


const REVIEWS = [
    {
        id: 1,
        img: boy,
        name: 'Alex',
        text: '“I’ve already lost 6kg by tracking every workout.”',
    },
    {
        id: 2,
        img: girlOne,
        name: 'Sophia',
        text: '“The daily progress view keeps me motivated.”',
    },
    {
        id: 3,
        img: girlTwo,
        name: 'Liam',
        text: '“Perfect for staying active during exam season.”',
    },
];

export default function AdvantagesSection() {
    const [activeReview, setActiveReview] = useState(null);

    const handleEnter = (review) => setActiveReview(review);
    const handleLeave = () => setActiveReview(null);

    const handleClick = (review) => {
        setActiveReview((prev) =>
            prev && prev.id === review.id ? null : review
        );
    };

    return (
        <div
            className={css.section}
            style={{
                backgroundImage: `url(${fitnessDesktop})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <div className={css.customersBox}>
                {activeReview && (
                    <div className={css.reviewPopup}>
                        <p className={css.reviewName}>{activeReview.name}</p>
                        <p className={css.reviewText}>{activeReview.text}</p>
                    </div>
                )}

                <ul className={css.customerImg}>
                    {REVIEWS.map((review, index) => (
                        <li
                            key={review.id}
                            className={`${css.item} ${css[`item${index + 1}`]}`}
                            onMouseEnter={() => handleEnter(review)}
                            onMouseLeave={handleLeave}
                            onClick={() => handleClick(review)}
                        >
                            <img
                                src={review.img}
                                alt={review.name}
                                className={css.avatarImg}
                            />
                        </li>
                    ))}
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
