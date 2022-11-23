import React, { useEffect, useState } from "react";

import InfoSection from "./style";
import CoinSelector from "./CoinSelector";
import Order from "./InfoOrder";
// import Chart from "./Chart";
import CoinInfo from "./InfoCoin";

interface data {
  trade_price : number
  change_price : number,
  change_rate : number,
  change : string,
  high_price : number,
  highest_52_week_price : number,
  low_price : number,
  lowest_52_week_price : number
}


export default function Main () {

  const [coin, setCoin] = useState('BTC')
  const [price, setPrice] = useState<data>()

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
        {/* <Chart></Chart> */}
      </InfoSection>
      <Order price={price?.trade_price} coin={coin}></Order>
    </>

  )
}