import React, { useEffect, useState } from "react";

import InfoSection from "./style";
import CoinSelector from "./CoinSelector";
import Order from "./InfoOrder";
import CoinInfo from "./InfoCoin";
import chartApiCall from "./Chart/apiCall";
import ChartSelector from "./ChartSelector/index";
import Chart from "./Chart/refactored";
import { count } from "console";

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
  volume : number,
  candle_date_time_kst? : string
}

export default function Main () {

  const [coin, setCoin] = useState('BTC')
  const [price, setPrice] = useState<Coindata>()
  const [chart, setChart] = useState({
    sort : 'minutes',
    dataArr : [{time : 0, open : 0, trade : 0, high: 0, low : 0, volume : 0}],
  })
  const [chartCount, setChartCount] = useState(100);
  const [chartFrom, setChartFrom] = useState(0)
  const [propsData, setPropsData] = useState<ChartData[]>([])
  const [lastData, setLastData] = useState('')
  const [apiState, setApiState] = useState(true)

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
      setLastData(res[res.length - 1].candle_date_time_kst)
      setChart({...chart, dataArr : res})
    })
    setChartFrom(0)
  }, [coin, chart.sort])

  useEffect(() => {
    const originalData = chart.dataArr
    const count = chartCount
    const from = chartFrom
    const length = originalData.length

    if (chartFrom + chartCount * 1.5 > length) {
      if (lastData === '') return
      if (!apiState) return
      setApiState(false)
      let date = new Date(lastData)
      const srtDate = date.toISOString()
      const data = chartApiCall(chart.sort, coin, srtDate)
      data.then(res => {
        setLastData(res[res.length - 1].candle_date_time_kst)
        let arr = chart.dataArr
        arr.push(...res)
        setApiState(true)
      }).catch(err => {
        console.log('Error', `${err}더 이상은 크립토 데이터가 없어영`)
        setApiState(true)
      })
    }
    const tmpData = originalData.slice(from, from + count).reverse()
    setPropsData(tmpData)
  }, [chartCount, chartFrom, chart.dataArr])

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
        <Chart data={propsData} count={chartCount} from={chartFrom} setCount={setChartCount} setFrom={setChartFrom}/>
      </InfoSection>
      <Order price={price?.trade_price} coin={coin}></Order>
    </>
  )
}