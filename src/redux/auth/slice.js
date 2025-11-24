import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refresh,
  editUser,
  resendVerification,
  requestPasswordReset,
} from "./operations";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

function handlePending(state) {
  state.loading = true;
  state.error = null;
}

function handleRejected(state, action) {
  state.loading = false;
  state.error = action.payload;
  state.verificationEmailSent = false;
  state.resetEmailSent = false;
}

const emptyUser = {
  name: null,
  email: null,
  avatarURL: null,
  gender: null,
  weight: null,
  dailyActivityTime: null,
  dailyWaterNorm: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { ...emptyUser },
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    loading: false,
    error: null,
    verificationEmailSent: false,
    resetEmailSent: false,
  },
  reducers: {
    updateToken(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    updateTokenError(state) {
      state.user = { ...emptyUser };
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        const user = action.payload.user || {};
        state.user.name = user.name ?? null;
        state.user.email = user.email ?? null;
        state.user.gender = user.gender ?? null;
        state.user.weight = user.weight ?? null;
        state.user.avatarURL = user.avatarURL ?? null;
        state.user.dailyActivityTime = user.dailyActivityTime ?? null;
        state.user.dailyWaterNorm = user.dailyWaterNorm ?? null;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = false;
        state.verificationEmailSent = true;
      })
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.gender = action.payload.user.gender;
        state.user.weight = action.payload.user.weight;
        state.user.avatarURL = action.payload.user.avatarURL;
        state.user.dailyActivityTime = action.payload.user.dailyActivityTime;
        state.user.dailyWaterNorm = action.payload.user.dailyWaterNorm;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
        state.verificationEmailSent = false;
        state.resetEmailSent = false;
      })
      .addCase(login.pending, handlePending)
      .addCase(login.rejected, handleRejected)
      .addCase(resendVerification.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.verificationEmailSent = true;
      })
      .addCase(resendVerification.pending, handlePending)
      .addCase(resendVerification.rejected, handleRejected)
      .addCase(requestPasswordReset.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.resetEmailSent = true;
      })
      .addCase(requestPasswordReset.pending, handlePending)
      .addCase(requestPasswordReset.rejected, handleRejected)
      .addCase(logout.fulfilled, state => {
        state.user = { ...emptyUser };
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = false;
        state.verificationEmailSent = false;
        state.resetEmailSent = false;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.rejected, handleRejected)
      .addCase(refresh.pending, state => {
        state.isRefreshing = true;
        state.loading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.gender = action.payload.user.gender;
        state.user.weight = action.payload.user.weight;
        state.user.avatarURL = action.payload.user.avatarURL;
        state.user.dailyActivityTime = action.payload.user.dailyActivityTime;
        state.user.dailyWaterNorm = action.payload.user.dailyWaterNorm;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(refresh.rejected, state => {
        state.user = { ...emptyUser };
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = false;
        state.isRefreshing = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.gender = action.payload.user.gender;
        state.user.weight = action.payload.user.weight;
        state.user.avatarURL = action.payload.user.avatarURL;
        state.user.dailyActivityTime = action.payload.user.dailyActivityTime;
        state.user.dailyWaterNorm = action.payload.user.dailyWaterNorm;
        state.error = null;
        state.loading = false;
      })
      .addCase(editUser.pending, handlePending)
      .addCase(editUser.rejected, handleRejected);
  },
});

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "refreshToken"],
};

const persistedReducer = persistReducer(authPersistConfig, authSlice.reducer);
export const authReducer = persistedReducer;

export const { updateToken, updateTokenError } = authSlice.actions;
