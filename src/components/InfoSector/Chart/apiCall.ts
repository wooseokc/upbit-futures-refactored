import axios from "axios";
import { url } from "inspector";

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
  volume : number,
  candle_date_time_kst : string,
}

export default async function chartApiCall(sort : string, coin : string, to? : string) {
  let chartSort = sort

  if (chartSort === 'minutes') {
    chartSort = 'minutes/60'
  }

  let URL = `https://api.upbit.com/v1/candles/${chartSort}?market=KRW-${coin}&count=200`
  if (to) URL += `&to=${to}`
  const exportData : exportData[] = []
  await axios.get(URL).then(res => {
    const data : upbitData[] = res.data 
    data.map((item, idx) => {
      const tmpObj = {
        time : idx,
        open : item.opening_price,
        trade : item.trade_price,
        high : item.high_price,
        low : item.low_price,
        volume : item.candle_acc_trade_volume,
        candle_date_time_kst : item.candle_date_time_kst,
      } 
      exportData.push(tmpObj)
    })
  }).catch(err => {
    console.log('Error', `${err}더 이상은 크립토 데이터가 없어영`)
  });
  
  return exportData
} 
