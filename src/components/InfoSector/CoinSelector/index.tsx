import React, { useState } from "react";
import styled from "styled-components";

interface CoinName {
  coin : string,
  coinChanger : any
}

export default function CoinSelector (props : CoinName) {
  const [visible, setVisible] = useState(false)
  const coin = props.coin


  function listVisible () {
    if (visible === false) setVisible(true)
    else setVisible (false)
  }

  function dispatching () {
    let target = '';
    if (coin === 'BTC') target = 'ETH'
    else target = 'BTC'
    props.coinChanger(target)
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

const Container = styled.div`
  height : 44px;
  border-bottom : 1px solid rgba(165,175,202,.6);
`

const Forms = styled.a`
  width : 200px;
  height : 40px;
  cursor : pointer;

  position : relative;
  top:50%;
  transform: translateY(-50%);
  display : inline-block;
`

const Img = styled.img`
  width : 26px;
  height : 26px;

  position : relative;
  top:50%;
  transform: translateY(-50%);
  left: 10px;
`

const Korean = styled.span`
  font-weight: 700;
  font-size: 20px;

  position : relative;
  left : 17px;
  top : 1px;
  display : inline-block;
`

const English = styled.span`
  font-size: 10px;

  position : relative;
  left : 20px;
  top : 2px;
`

const Arrow = styled.div`
  width :20px;
  height : 20px;
  background: url('https://cdn.upbit.com/upbit-web/images/ico_select_1.34dc566.png');
  background-repeat: no-repeat;

  position : relative;
  left : 180px;
  top : -13px;
`

const CoinList = styled.a`
  width : 190px;
  height : 40px;
  background : #fff;
  z-index : 99;
  cursor : pointer;
  
  position : relative;
  top : 3px;
  border-bottom: 1px solid rgba(165,175,202,.6);
  border-right: 1px solid rgba(165,175,202,.6);
  display : block;
`