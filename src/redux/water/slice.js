import { createSlice } from '@reduxjs/toolkit';
import {
    addWater,
    editWater,
    deleteWater,
    chooseDay,
    chooseMonth,
} from './operations';
import { DayToString, MonthToString } from '../../utils/dates';
import { logout } from '../auth/operations';

const now = new Date();

function handlePending(state) {
    state.loading = true;
}

function handleRejected(state, action) {
    state.loading = false;
    state.error = action.payload;
}

const waterSlice = createSlice({
    name: 'water',
    initialState: {
        dayWater: [],
        monthWater: [],
        day: DayToString(now),
        month: MonthToString(now),
        loading: false,
        error: null,
    },
    reducers: {
        logoutWater(state) {
            const date = new Date();
            state.day = DayToString(date);
            state.month = MonthToString(date);
            state.dayWater = [];
            state.monthWater = [];
        },
    },
    extraReducers: (builder) => {
        builder
            //add
            .addCase(addWater.pending, handlePending)
            .addCase(addWater.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.dayWater.push(action.payload);
            })
            .addCase(addWater.rejected, handleRejected)
            //edit
            .addCase(editWater.pending, handlePending)
            .addCase(editWater.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.dayWater = state.dayWater.map((el) =>
                    el._id === action.payload._id ? action.payload : el
                );
            })
            .addCase(editWater.rejected, handleRejected)
            //delete
            .addCase(deleteWater.pending, handlePending)
            .addCase(deleteWater.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.dayWater.findIndex(
                    (el) => el._id === action.payload.deletedData._id
                );

                if (index !== -1) {
                    state.dayWater.splice(index, 1);
                }
            })
            .addCase(deleteWater.rejected, handleRejected)
            //day
            .addCase(chooseDay.pending, handlePending)
            .addCase(chooseDay.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.dayWater = action.payload.dayWater;
                state.day = action.payload.day;
            })
            .addCase(chooseDay.rejected, handleRejected)
            //month
            .addCase(chooseMonth.pending, handlePending)
            .addCase(chooseMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // state.dayWater = [];
                // state.day = null;
                state.month = action.payload.month;
                state.monthWater = action.payload.monthWater;
            })
            .addCase(chooseMonth.rejected, handleRejected)
            // Handle logout
            .addCase(logout.fulfilled, (state) => {
                const date = new Date();
                state.day = DayToString(date);
                state.month = MonthToString(date);
                state.dayWater = [];
                state.monthWater = [];
                state.loading = false;
                state.error = null;
            });
    },
});

export const waterReducer = waterSlice.reducer;
export const { logoutWater } = waterSlice.actions;
