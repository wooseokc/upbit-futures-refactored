import {configureStore} from '@reduxjs/toolkit'
import coinSlice from '../reducers/coinSlice'

const store = configureStore({
  reducer : {
    coin : coinSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
