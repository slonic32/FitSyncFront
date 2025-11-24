import Footer from "../../components/Footer/Footer";
import css from "./LandingPage.module.css";
import Landing from "../../components/Landing/Landing";

function LandingPage() {
  return (
    <div className={css.container}>
      <Landing />
      <Footer />
    </div>
  );
}

export default LandingPage;
