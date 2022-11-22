import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../stores/coinStore';
import axios from 'axios';

interface coinState {
  now : string
  price : object
}

let nowCoin = 'BTC'

const coinApiCall = createAsyncThunk(
  'coinName/apiCall',
  async () => {
    const res = await axios.get(`https://api.upbit.com/v1/ticker?markets=KRW-${nowCoin}`)
    console.log(res.data[0])
    return res.data[0]
  }
)

const initialState : coinState = { now : 'BTC', price : { } }

const coinSlice = createSlice({
  name : 'coinName',
  initialState : initialState,
  reducers: {
    changeCoin : (state, action: PayloadAction<string>) => {
      state.now = action.payload;
      nowCoin = action.payload;
    },
    changePrice : (state, action: PayloadAction<object>) => {
      state.price = action.payload;
    }
  },
  // extraReducers : (builder) => {
  //   builder.addCase(coinApiCall.fulfilled, (state, action : PayloadAction<object>) => {
  //     state.price = action.payload;
  //   })
  // }
})

export const {changeCoin, changePrice} = coinSlice.actions
export const selectCount = (state: RootState) => state.coin.now
export {coinApiCall}
export default coinSlice.reducer