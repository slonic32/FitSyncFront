import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./ResetPage.module.css";
import Footer from "../../components/Footer/Footer";
import ResetForm from "../../components/ResetForm/ResetForm";

export default function SignUpPage() {
  return (
    <main className={css.container}>
      <div className={css.page}>
        <ResetForm />
        <div className={css.wrap}>
          <AdvantagesSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}
