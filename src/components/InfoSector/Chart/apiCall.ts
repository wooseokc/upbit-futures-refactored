import React from "react";
import axios from "axios";

interface upbitData {
  candle_acc_trade_price : number,
  candle_acc_trade_volume : number,
  candle_date_time_kst : string,
  candle_date_time_utc : string,
  high_price : number,
  low_price : number,
  market : string,
  opening_price : number,
  timestamp : number,
  trade_price : number,
  unit? : number
}

interface exportData {
  time : number,
  open : number,
  trade : number,
  high : number,
  low : number,
  volume : number
}

export default async function chartApiCall(sort : string, coin : string, to? : number) {
  let chartSort = sort

  if (chartSort === 'minutes') {
    chartSort = 'minutes/60'
  }

  const exportData : exportData[] = []
  await axios.get(`https://api.upbit.com/v1/candles/${chartSort}?market=KRW-${coin}&count=200`).then(res => {
    const data : upbitData[] = res.data 
    data.map((item, idx) => {
      const tmpObj = {
        time : idx,
        open : item.opening_price,
        trade : item.trade_price,
        high : item.high_price,
        low : item.low_price,
        volume : item.candle_acc_trade_volume
      } 
      exportData.push(tmpObj)
    })
  });
  
  return exportData
} 
