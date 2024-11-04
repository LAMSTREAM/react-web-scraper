import { configureStore } from '@reduxjs/toolkit'
import websiteReducer from './slice'
import {enableMapSet} from "immer";

// Enable MapSet plugin
enableMapSet();

export default configureStore({
  reducer: {
    websites: websiteReducer
  }
})