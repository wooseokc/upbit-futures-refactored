import React from "react";
import axios from "axios";

export default async function chartApiCall(sort : string, coin : string) {
  const chartSort = sort
  if (chartSort === 'minutes') {
    await axios.get(`https://api.upbit.com/v1/candles/${chartSort}/60?market=KRW-${coin}&count=200`).then(res => {
      console.log(res)
    });
  } else {
    await axios.get(`https://api.upbit.com/v1/candles/${chartSort}?market=KRW-${coin}&count=200`).then(res => {
      console.log(res)
    });
  }
} 
