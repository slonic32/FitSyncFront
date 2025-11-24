import { useDispatch } from "react-redux";
import { refresh } from "./redux/auth/operations.js";
import { store } from "./redux/store.js";
import { useAuth } from "./hooks/useAuth.js";
import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import { selectError, selectLoading } from "./redux/selectors.js";
import Loader from "./components/Loader/Loader.jsx";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Error from "./components/Error/Error.jsx";

import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage.jsx"));
const VerifyPage = lazy(() => import("./pages/VerifyPage/VerifyPage.jsx"));
const ResetPage = lazy(() => import("./pages/ResetPage/ResetPage.jsx"));
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    store.dispatch(refresh());
  }, [dispatch]);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute redirectTo="/tracker" component={<HomePage />} />
            }
          />

          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignUpPage />}
              />
            }
          />

          <Route
            path="/signin"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignInPage />}
              />
            }
          />

          <Route path="/verify/:verificationToken" element={<VerifyPage />} />
          <Route path="/reset/:resetToken" element={<ResetPage />} />
          <Route path="/landing" element={<LandingPage />} />

          <Route
            path="/tracker"
            element={
              <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <Toaster />
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
}
