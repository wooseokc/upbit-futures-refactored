import React, { useEffect, useState } from "react";

import InfoSection from "./style";
import CoinSelector from "./CoinSelector";
import Order from "./InfoOrder";
import CoinInfo from "./InfoCoin";
import chartApiCall from "./Chart/apiCall";
import ChartSelector from "./ChartSelector/index";
import Chart from "./Chart/refactored";

interface Coindata {
  trade_price : number
  change_price : number,
  change_rate : number,
  change : string,
  high_price : number,
  highest_52_week_price : number,
  low_price : number,
  lowest_52_week_price : number
}

interface ChartData {
  time : number,
  open : number,
  trade : number,
  high : number,
  low : number,
  volume : number
}

export default function Main () {

  const [coin, setCoin] = useState('BTC')
  const [price, setPrice] = useState<Coindata>()
  const [chart, setChart] = useState({
    sort : 'minutes',
    dataArr : [{time : 0, open : 0, trade : 0, high: 0, low : 0, volume : 0}],
    count : 100,
    from : 0
  })
  const [propsData, setPropsData] = useState<ChartData[]>([])

  useEffect(() => {
    const webSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    webSocket.binaryType = 'arraybuffer';
    webSocket.onopen = () => {
      const str = [{"ticket":"test"},{"type":"ticker","codes":[`KRW-${coin}`]}]
      webSocket.send(JSON.stringify(str))
      console.log('connect')
    }

    webSocket.onmessage = (evt) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(evt.data);
      let data = JSON.parse(enc.decode(arr));
      setPrice({
        trade_price : data.trade_price,
        change_price : data.change_price,
        change_rate : data.change_rate,
        change : data.change,
        high_price : data.high_price,
        highest_52_week_price : data.highest_52_week_price,
        low_price : data.low_price,
        lowest_52_week_price : data.lowest_52_week_price
      })
    }

    return () => {
      console.log('socket close')
      webSocket.close()
    }
  }, [coin])

  useEffect(() => {
    const data = chartApiCall(chart.sort, coin)
    data.then(res => {
      setChart({...chart, dataArr : res})
    })
  }, [coin, chart.sort])

  useEffect(() => {
    const originalData = chart.dataArr
    const count = chart.count
    const from = chart.from
    const length = originalData.length
    const tmpData = originalData.slice(from, from + count).reverse()
    setPropsData(tmpData)
  }, [chart.count, chart.from, chart.dataArr])

  return (
    <>
      <InfoSection>
        <CoinSelector coin={coin} coinChanger={setCoin}></CoinSelector>
        {price && <CoinInfo
         tradePrice={price.trade_price}
         change={price.change}
         change_price={price.change_price}
         change_rate={price.change_rate}
         high_price={price.high_price}
         highest_52_week_price={price.highest_52_week_price}
         low_price={price.low_price}
         lowest_52_week_price={price.lowest_52_week_price}
         ></CoinInfo>}
        <ChartSelector chartChanger={setChart} chartInfo={chart}/>
        <Chart data={propsData}/>
      </InfoSection>
      <Order price={price?.trade_price} coin={coin}></Order>
    </>
  )
}