import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { refresh } from "./redux/auth/operations.js";
import { store } from "./redux/store.js";
import { useAuth } from "./hooks/useAuth.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useAuth();

  useEffect(() => {
    store.dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Routes>
        <Route
          path="/signin"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <SignInPage />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <SignUpPage />
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <h1>Welcome to FitSync Dashboard!</h1>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}
