import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import css from "./UserSettingsForm.module.css";
import RadioBtn from "./RadioInput/RadioInput";
import AvatarInput from "./AvatarInput/AvatarInput";
import { useDispatch } from "react-redux";
import { editUser } from "../../../redux/auth/operations";
import TimeField from "react-simple-timefield";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsSchema } from "./settingsSchema";

export default function UserSettingsForm({ closeModal, getSetting }) {
  const [selectedValueRadio, setSelectedValueRadio] = useState("");
  const [result, setResult] = useState(null);
  const [volume, setSelectedVolume] = useState("");
  const [M, setM] = useState(null);
  const [T, setT] = useState("7:00");
  const [myAvatar, setMyAvatar] = useState(false);
  const {
    avatarURL,
    dailyActivityTime,
    dailyWaterNorm,
    email,
    gender,
    name,
    weight,
  } = getSetting;

  const dispatch = useDispatch();

  const handleRadioChange = event => {
    setSelectedValueRadio(event.target.value);
  };

  const handleChange = (setSelected, event) => {
    setSelected(event.target.value);
  };

  const convertToMinutes = time => {
    const [hours, minutes] = time.split(":");
    const totalMinutes = parseInt(hours) + parseInt(minutes) / 60;
    return totalMinutes;
  };

  useEffect(() => {
    const time = convertToMinutes(T);
    if (selectedValueRadio === "woman") {
      const V = M * 0.03 + time * 0.4;
      setResult(V.toFixed(2));
    } else {
      const V = (M * 0.04 + time * 0.6).toFixed(2);
      setResult(V);
    }
  }, [selectedValueRadio, M, T]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      lastEmail: email,
    },
  });

  const onSubmit = data => {
    const { gender, lastEmail, lastKilo, lastName, lastTime, lastValume } =
      data;

    //closeModal();

    const formData = new FormData();

    formData.append("avatarURL", myAvatar);

    formData.append("gender", gender);
    formData.append("name", lastName);
    formData.append("email", lastEmail);
    formData.append("weight", lastKilo);
    formData.append("dailyActivityTime", lastTime);
    formData.append("dailyWaterNorm", lastValume);

    // const obj = Object.fromEntries(formData.entries());
    // console.log('formData', obj);

    dispatch(editUser(formData))
      .unwrap()
      .then(() => {
        toast.success("Successfully created!");
      })
      .catch(() => {
        toast.error("This is an error!");
      });
    closeModal();
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <AvatarInput
          control={control}
          register={register}
          setMyAvatar={setMyAvatar}
        />
        <div>
          <h3 className={css.titleHender}>Your gender identity</h3>
        </div>
        <RadioBtn
          onChangeRadio={handleRadioChange}
          selectedValue={gender}
          register={register}
        />
        <div className={css.sectionBox}>
          <section>
            <div className={css.box}>
              <label className={css.labelName}>Your name</label>
              <input {...register("lastName", { value: name })} />
              {errors.lastName && (
                <p className={css.error}>{errors.lastName.message}</p>
              )}
            </div>

            <div className={css.box}>
              <label className={css.labelName}>Email</label>
              <input
                {...register("lastEmail", { value: email }, { required: true })}
              />
              {errors.lastEmail && (
                <p className={css.error}>{errors.lastEmail.message} </p>
              )}
            </div>

            <h2 className={css.titleNormaFormula}>My daily norma</h2>
            <ul className={css.listFormula}>
              <li>
                <p>For woman:</p>
                <span>V=(M*0,03) + (T*0,4)</span>
              </li>
              <li>
                <p>For man:</p>
                <span>V=(M*0,04) + (T*0,6)</span>
              </li>
              <li>
                <div className={css.textBox}>
                  <p>
                    <span>*</span> V is the volume of the water norm in liters
                    per day, M is your body weight,T is the time of active
                    sports,or another type of activity commensurate in terms of
                    loads (in the absence of these, you must set 0)
                  </p>
                </div>
              </li>
              <li className={css.vectorItem}>
                <p>
                  <span className={css.vector}>!</span>Active time in hours
                </p>
              </li>
            </ul>
          </section>
          {/* =========================================== */}
          <section>
            <div className={css.formKilo}>
              <label>Your weight in kilograms:</label>
              <input
                {...register("lastKilo", { value: weight })}
                onChange={event => handleChange(setM, event)}
              />
              {errors.lastKilo && (
                <p className={css.error}>{errors.lastKilo.message} </p>
              )}
            </div>

            <div className={css.formKilo}>
              <label>The time of active participation in sports:</label>

              <TimeField
                value={dailyActivityTime}
                onChange={(event, value) => {
                  handleChange(setT, event);
                }}
                input={<input {...register("lastTime", { required: true })} />}
                colon=":"
              />
            </div>

            <p className={css.amountWater}>
              The required amount of water in liters per day:
              <span className={css.amount}>{result} L</span>
            </p>

            <div className={css.youWater}>
              <label>Write down how much water you will drink:</label>
              <input
                {...register("lastValume", { value: dailyWaterNorm })}
                onChange={event => handleChange(setSelectedVolume, event)}
              />
              {errors.lastValume && (
                <p className={css.error}>{errors.lastValume.message} </p>
              )}
            </div>
          </section>
        </div>
        <div className={css.spBtn}>
          <button className={css.btnSave} type="submit">
            <span>Save</span>
          </button>
        </div>
      </form>
    </>
  );
}
