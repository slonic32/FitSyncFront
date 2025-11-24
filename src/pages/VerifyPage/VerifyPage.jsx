import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import css from "./VerifyPage.module.css";
import Logo from "../../components/Logo/Logo";
import { BACKEND_HOST } from "../../config/backend";

export default function VerifyPage() {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        await axios.get(`${BACKEND_HOST}/api/users/verify/${verificationToken}`);
        if (cancelled) return;
        setStatus("success");
        setMessage("Email verified! Redirecting to sign in...");
        setTimeout(() => navigate("/signin"), 1800);
      } catch (error) {
        if (cancelled) return;
        const msg =
          error.response?.data?.message ||
          "Verification failed. Please request a new link.";
        setStatus("error");
        setMessage(msg);
        setTimeout(() => navigate("/signin"), 2500);
      }
    };

    if (verificationToken) {
      verify();
    } else {
      setStatus("error");
      setMessage("Missing verification token");
    }

    return () => {
      cancelled = true;
    };
  }, [navigate, verificationToken]);

  return (
    <main className={css.container}>
      <div className={css.card}>
        <Logo />
        <h1 className={css.title}>Verify Email</h1>
        <p className={`${css.message} ${css[status]}`}>{message}</p>
        {status === "error" && (
          <Link to="/signin" className={css.link}>
            Go to Sign In
          </Link>
        )}
      </div>
    </main>
  );
}
