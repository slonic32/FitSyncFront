import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';

function HomePage() {
  return (
    <div className={css.container}>
      <div className={css.page}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </div>
  );
}

export default HomePage;