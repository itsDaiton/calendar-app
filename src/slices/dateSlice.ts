import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/store";
import { getCurrentMonth, getCurrentWeek, getCurrentYear } from "../../utils/data";

interface DateState {
  year: number;
  month: number;
  week: number;
}

const initialState: DateState = {
  year: getCurrentYear(),
  month: getCurrentMonth(),
  week: getCurrentWeek(),
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload
    },
    setYear: (state, action) => {
      state.year = action.payload
    },
    setWeek: (state, action) => {
      state.week = action.payload
    }
  }
})

export const { setMonth, setYear, setWeek } = dateSlice.actions

export const selectMonth = (state: RootState) => state.date.month
export const selectYear = (state: RootState) => state.date.year
export const selectWeek = (state: RootState) => state.date.week

export default dateSlice.reducer