import LandingPage from '../../components/LandingPage/LandingPage';
import Footer from '../../components/Footer/Footer';
import css from './HomePage.module.css';

function HomePage() {
  return (
    <div className={css.container}>
      <LandingPage />
      <Footer />
    </div>
  );
}

export default HomePage;