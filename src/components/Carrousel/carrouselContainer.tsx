import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Carrousel from "./carrousel"

interface coinPrices {
  [index : string] : data
}

interface data {
  [index : string] : number | string
  tradePrice : number,
  change_price : number,
  change_rate : number,
  change : string
}

export default function CarouselContainer () {
  const [coinPriceObj, setCoinPriceObj] = useState<coinPrices>({})
  const [coinCount, setCoinCount] = useState(6) // 편의상 코인 개수 정해놓음
  const [clerk, setClerk] = useState(0);

  useEffect(() => {
    const webSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    webSocket.binaryType = 'arraybuffer';
    webSocket.onopen = () => {
      const str = [{"ticket":"test"},{"type":"ticker","codes":[`KRW-BTC`, 'KRW-ETH', 'KRW-SOL', 'KRW-AVAX', 'KRW-STRK', 'KRW-EOS']}]
      webSocket.send(JSON.stringify(str))
    }

    webSocket.onmessage = (evt) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(evt.data);
      let data = JSON.parse(enc.decode(arr));
      const key : string = data.code
      const tmpObj : data = {
        tradePrice : data.trade_price,
        change_price : data.change_price,
        change_rate : data.change_rate,
        change : data.change
      }
      coinPriceObj[key] = tmpObj
      setClerk(c => c + 1)
    }

    return () => {
      webSocket.close()
    }
  }, [])

  useEffect(() => {


  }, [clerk])

  return (
    <Container>
      <Carrousel datas={coinPriceObj} coinCount={coinCount} clerk={clerk}/>

    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  height: 400px;


  display: flex;
  align-items: center;
`