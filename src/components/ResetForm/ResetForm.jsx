import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import css from "./ResetForm.module.css";
import Logo from "../Logo/Logo";

import toast from "react-hot-toast";
import { BACKEND_HOST } from "../../config/backend";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const schema = Yup.object({
  password: Yup.string()
    .min(7, "Password must be at least 7 characters long")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function ResetForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    try {
      await axios.post(`${BACKEND_HOST}/api/users/reset/${resetToken}`, {
        password: data.password,
      });
      setStatus("success");
      toast.success("Password updated. Redirecting to sign in.");
      reset();
      setTimeout(() => navigate("/signin"), 1800);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Reset failed. Please request a new link.";
      setStatus("error");
      toast.error(msg);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.section}>
        <Logo />
        <h1 className={css.title}>Reset Password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.field}>
            <label className={css.password}>New Password</label>
            <div className={css.toggle}>
              <input
                className={errors.password ? css.errorIn : css.secondInput}
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("password")}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className={css.iconOne}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>
          <div className={css.field}>
            <label className={css.repeat}>Repeat New Password</label>
            <div className={css.toggle}>
              <input
                className={errors.repeatPassword ? css.errorIn : css.thirdInput}
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repeat new password"
                {...register("repeatPassword")}
              />
              <div
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className={css.iconTwo}
              >
                {showRepeatPassword ? (
                  <FiEye size={20} />
                ) : (
                  <FiEyeOff size={20} />
                )}
              </div>
            </div>
            {errors.repeatPassword && (
              <p className={css.error}>{errors.repeatPassword.message}</p>
            )}
          </div>
          <button type="submit" className={css.button}>
            Sign Up
          </button>
          <p className={css.text}>
            Remember your password?
            <Link to="/signin" className={css.link}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
