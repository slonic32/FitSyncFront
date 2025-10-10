import { useDispatch } from "react-redux";
import { refresh } from "./redux/auth/operations.js";
import { store } from "./redux/store.js";
import { useAuth } from "./hooks/useAuth.js";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    store.dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <h1>Hello from FitSync App!</h1>
  );
}
