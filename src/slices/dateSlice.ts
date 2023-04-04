import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/store";
import { getCurrentMonth, getCurrentYear } from "../../utils/data";

interface DateState {
  year: number;
  month: number;
}

const initialState: DateState = {
  year: getCurrentYear(),
  month: getCurrentMonth(),
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
    }
  }
})

export const { setMonth, setYear } = dateSlice.actions

export const selectMonth = (state: RootState) => state.date.month
export const selectYear = (state: RootState) => state.date.year

export default dateSlice.reducer