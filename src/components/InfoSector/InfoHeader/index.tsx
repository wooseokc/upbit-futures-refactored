import React, { useState } from "react";
// import { changeCoin } from "../../../reducers/coinSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { changeCoin } from "../../../reducers/coinSlice";

import { Container, Forms, Img, Korean, English, Arrow, CoinList } from "./style";

export default function InfoHeader () {
  const [visible, setVisible] = useState(false)
  const coin = useAppSelector((state) => state.coin.now)
  const dispatch = useAppDispatch()

  function listVisible () {
    if (visible === false) setVisible(true)
    else setVisible (false)
  }

  function dispatching () {
    let target = '';
    if (coin === 'BTC') target = 'ETH'
    else target = 'BTC'
    dispatch( changeCoin(target))

    setVisible (false)
  }

  return (
    <Container>
      <Forms onClick={listVisible}>
        <Img src={coin === 'BTC' ? 'https://static.upbit.com/logos/BTC.png' : 'https://static.upbit.com/logos/ETH.png' }></Img>
        <Korean>{coin === 'BTC' ? '비트코인' : '이더리움'} </Korean>
        <English>{coin === 'BTC' ? 'BTC/KRW' : 'ETH/KRW'}</English>
        <Arrow></Arrow>
      </Forms>
      <CoinList onClick={dispatching} style={visible ? {display : 'block'} : {display : "none"}  }>
        <Img src={coin === 'BTC' ? 'https://static.upbit.com/logos/ETH.png' : 'https://static.upbit.com/logos/BTC.png' }></Img>
        <Korean>{coin === 'BTC' ? '이더리움' : '비트코인'} </Korean>
        <English>{coin === 'BTC' ? 'ETH/KRW' : 'BTC/KRW'}</English>
      </CoinList>
    </Container>
  )
}