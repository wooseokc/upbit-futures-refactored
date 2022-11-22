import React, { useEffect, useState } from "react";

import InfoSection from "./style";
import CoinSelector from "./CoinSelector";
import Order from "./InfoOrder";
import Chart from "./Chart";
import CoinInfo from "./InfoCoin";

export default function Main () {

  const [coin, setCoin] = useState('BTC')
  const [price, setPrice] = useState<number>()

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
      setPrice(data)
      console.log(data.trade_price)
    }

    return () => {
      webSocket.close()
    }
  }, [coin])


  return (
    <>
      <InfoSection>
        <CoinSelector coin={coin} coinChanger={setCoin}></CoinSelector>
        <CoinInfo></CoinInfo>
        <Chart></Chart>
      </InfoSection>
      <Order></Order>
    </>

  )
}