import { configureStore } from "@reduxjs/toolkit";
import viewReducer from '../src/slices/viewSlice'
import dateReducer from '../src/slices/dateSlice'

export const store = configureStore({
  reducer: {
    view: viewReducer,
    date: dateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch