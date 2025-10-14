import css from "./TrackerPage.module.css";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";

export default function TrackerPage() {
  return (
    <>
      <main>
        <div className={css.wrapper}>
          <h1>Tracker page</h1>
          <WaterDetailedInfo />
        </div>
      </main>
    </>
  );
}
