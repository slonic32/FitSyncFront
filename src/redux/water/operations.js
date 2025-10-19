import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dayToQuary, monthToQuary } from '../../utils/dates';
import { BACKEND_HOST } from '../../config/backend';

axios.defaults.baseURL = BACKEND_HOST + '/api/';

export const addWater = createAsyncThunk(
    'water/addWater',
    async ({ value, date, time }, thunkAPI) => {
        try {
            const response = await axios.post('/water', { value, date, time });

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const editWater = createAsyncThunk(
    'water/editWater',
    async ({ id, value, date, time }, thunkAPI) => {
        try {
            const response = await axios.put(`/water/${id}`, {
                value,
                date,
                time,
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteWater = createAsyncThunk(
    'water/deleteWater',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`/water/${id}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

//day = "dd.mm.yyyy"
export const chooseDay = createAsyncThunk(
    'water/chooseDay',
    async (day, thunkAPI) => {
        try {
            const response = await axios.get('/water/day' + dayToQuary(day));

            return { day: day, dayWater: response.data };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

//month = "mm.yyyy"
export const chooseMonth = createAsyncThunk(
    'water/chooseMonth',
    async (month, thunkAPI) => {
        try {
            const response = await axios.get('/water/month' + monthToQuary(month));

            return { month: month, monthWater: response.data };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
