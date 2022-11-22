/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, {useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import useInterval from "../../../hooks/useInterval";
import { Candle, CandleBox, CandleContainer, CandlePrice, ChartContainer, Line, MinuteSelect, OptionContainer, TopBar, VolumeContainer, VolumePrice } from "./style";

interface data {
  candle_acc_trade_price : number
  candle_acc_trade_volume : number
  candle_date_time_kst : string
  candle_date_time_utc : string
  high_price : number
  low_price : number
  opening_price : number
  timestamp : number
  trade_price : number
  unit : number
}

export default function Chart () {
  const [unit, setUnit] = useState('1');
  const [chartArr, setChartArr] = useState<data[] | undefined>();
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [total, setTotal] = useState<number | undefined>();
  const [volumeTop, setVolumeTop] = useState<number | undefined>();
  const [nowOpen, setNowOpen] = useState<number | undefined | null>();
  const [coinPrice, setCoinPrice] = useState<number | undefined | null>();

  const coin = useAppSelector(state => state.coin.now);
  const price : any = useAppSelector(state => state.coin.price)
  
  async function apicall() {
    return await axios.get(`https://api.upbit.com/v1/candles/minutes/${unit}?market=KRW-${coin}&count=100`).then(res => {
      setChartArr(res.data.reverse());
    });
  } 


  useEffect(() => {
    if (chartArr) {
      let t = 0;
      let b = Number.MAX_SAFE_INTEGER;
      let vT = 0;
      for (let i = 0; i < chartArr.length; i ++) {
        if (chartArr[i].low_price < b) {
          b = chartArr[i].low_price
        }
        if (chartArr[i].high_price > t) {
          t = chartArr[i].high_price
        }
        if (chartArr[i].candle_acc_trade_volume > vT) {
          vT = chartArr[i].candle_acc_trade_volume
        }
      }
      setBottom(b)
      setTop(t)
      setTotal(t-b)
      setVolumeTop(vT)
      setNowOpen(price.trade_price)
    }
  }, [chartArr])

  useEffect(()=> {
    apicall().then(()=> {
      setTotal(undefined)
      setVolumeTop(undefined)
    })
  }, [unit]);

  useEffect(()=> {
    setVolumeTop(undefined)
    apicall()
  }, [coin])

  useEffect(()=> {
    setCoinPrice(price.trade_price)
  }, [price]);

  const enterBet = (e: React.MouseEvent<HTMLInputElement>) => {
    setUnit(e.currentTarget.value)
  }

  useInterval(apicall, 20000)
  
  let candleItem : any;
  if (total && chartArr) {
    candleItem = chartArr.map((item) => {
         return (
          <CandleBox key={item.timestamp}>
            <Candle height={Math.floor(Math.abs(item.trade_price-item.opening_price)/total*310)} position={(item.trade_price > item.opening_price ? item.opening_price - bottom : item.trade_price -bottom)/total*310} color={item.opening_price - item.trade_price}></Candle>
            <Line  height={Math.abs(item.high_price-item.low_price)/total*310} position={(item.low_price -bottom)/total*310}></Line>
          </CandleBox>
      )
    })
  } 

  let volumeItem : any;
  if (volumeTop && chartArr) {
    volumeItem = chartArr.map((item, idx) => {
      return (
        <CandleBox key={item.timestamp}>
          <Candle height={(item.candle_acc_trade_volume/volumeTop)*100} position={0} color={idx-1 >=0 ? chartArr[idx-1].candle_acc_trade_volume - chartArr[idx].candle_acc_trade_volume: -1}></Candle>
        </CandleBox>
      )
    })
  }

  return (
    <> 
    { chartArr &&
      <>
        <TopBar>
          <OptionContainer>
            <MinuteSelect onClick={enterBet} type={'radio'} name={'minute'} id={'1'} value={1} defaultChecked></MinuteSelect>
            <label htmlFor="1">1분</label>
            <MinuteSelect onClick={enterBet} type={'radio'} name={'minute'} id={'3'} value={3}></MinuteSelect>
            <label htmlFor="3">3분</label>
            <MinuteSelect onClick={enterBet} type={'radio'} name={'minute'} id={'5'} value={5}></MinuteSelect>
            <label htmlFor="5">5분</label>
          </OptionContainer>
        </TopBar>
        <ChartContainer>
          <CandleContainer>
              {candleItem}
              {
                ((nowOpen && total) && coinPrice) &&
                <CandleBox>
                  {Math.abs(nowOpen-coinPrice) < total && <Candle height={Math.floor(Math.abs(nowOpen-coinPrice)/total*310)} position={(nowOpen > coinPrice ? coinPrice - bottom : nowOpen -bottom)/total*310} color={nowOpen - coinPrice} ></Candle>}
                  <Line></Line>
                </CandleBox>
              }
          </CandleContainer>
          <CandlePrice>
            <div>{top.toLocaleString()}</div>
            <div>{(bottom + (top-bottom) * 0.75).toLocaleString()}</div>
            <div>{(bottom + (top-bottom) * 0.5).toLocaleString()}</div>
            <div>{(bottom + (top-bottom) * 0.25).toLocaleString()}</div>
            <div>{bottom.toLocaleString()}</div>
          </CandlePrice>
          <VolumeContainer>
            
              {volumeItem}
            
          </VolumeContainer>
          {
            volumeTop && 
            <VolumePrice>
              <div>{Math.floor(volumeTop)}</div>
              <div>{Math.floor(volumeTop*0.75)}</div>
              <div>{Math.floor(volumeTop*0.5)}</div>
              <div>{Math.floor(volumeTop*0.25)}</div>
              <div>{0}</div>
            </VolumePrice>
          }
        </ChartContainer>
      </>
    }  
    </>
  )
  
}