import { selectAuthError, selectAuthLoading } from "./auth/selectors";
import { selectWaterLoading, selectWaterError } from "./water/selectors";

export function selectLoading(state) {
  return selectAuthLoading(state) || selectWaterLoading(state);
}

export function selectError(state) {
  return selectAuthError(state) || selectWaterError(state);
}
