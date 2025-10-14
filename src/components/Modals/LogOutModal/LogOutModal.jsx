import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/operations";
import { showNotification } from "../../../utils/notification";
import css from "./LogOutModal.module.css";

const title = "Log out";

export default function LogOutModal({ closeModal }) {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await dispatch(logout()).unwrap();

      showNotification("You have been logged out successfully!", "success");
      closeModal();
    } catch (error) {
      showNotification("Failed to log out. Please try again.", "error");
      console.error("Logout operation failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <div className={css.modalBox}>
        <h2 className={css.title}>{title}</h2>
        <p>Do you really want to leave?</p>
        <div className={css.btnBox}>
          <button
            className={css.btn}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
          <button
            className={css.btnCancel}
            onClick={handleCancel}
            disabled={isLoggingOut}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
