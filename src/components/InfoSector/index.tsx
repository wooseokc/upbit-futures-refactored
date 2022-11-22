import React, { useEffect, useState } from "react";

import InfoSection from "./style";
import InfoHeader from "./InfoHeader";
import Order from "./InfoOrder";
import Chart from "./Chart";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changePrice } from "../../reducers/coinSlice";
// import InfoHeader from "./InfoHeader";

import CoinInfo from "./InfoCoin";


export default function InfoSector () {

  const dispatch = useAppDispatch()
  const coin = useAppSelector((state) => state.coin.now);

  useEffect(() => {
    const webSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    webSocket.binaryType = 'arraybuffer';
    webSocket.onopen = () => {
      const str = [{"ticket":"test"},{"type":"ticker","codes":[`KRW-${coin}`, `KRW-ETH`]}]
      webSocket.send(JSON.stringify(str))
      console.log('connect')
    }

    webSocket.onmessage = (evt) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(evt.data);
      let data = JSON.parse(enc.decode(arr));
      console.log(data)
      dispatch(changePrice(data))
    }

    return () => {
      webSocket.close()
    }
  }, [coin])

  return (
    <>
      <InfoSection>
        <InfoHeader></InfoHeader>
        <CoinInfo></CoinInfo>
        <Chart></Chart>
      </InfoSection>
      <Order></Order>
    </>

  )
}