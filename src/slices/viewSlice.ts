import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../utils/store";


interface ViewState {
  value: string;
}

const initialState: ViewState = {
  value: 'month'
}

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },    
  }
})

export const { setView } = viewSlice.actions

export const selectView = (state: RootState) => state.view.value

export default viewSlice.reducer