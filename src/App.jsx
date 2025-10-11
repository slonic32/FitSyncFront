import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { refresh } from "./redux/auth/operations.js";
import { store } from "./redux/store.js";
import { useAuth } from "./hooks/useAuth.js";
import { useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { selectError, selectLoading } from "./redux/selectors.js";
import Loader from "./components/Loader/Loader.jsx";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Error from "./components/Error/Error.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useAuth();

  useEffect(() => {
    store.dispatch(refresh());
  }, [dispatch]);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

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
