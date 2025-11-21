import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';
import Footer from '../../components/Footer/Footer';

function HomePage() {
  return (
    <div className={css.container}>
      <div className={css.page}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;