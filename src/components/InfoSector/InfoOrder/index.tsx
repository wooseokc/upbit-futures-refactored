import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import useInterval from "../../../hooks/useInterval";
import { OrderBox, TypeBox ,CategoryInfo, DefaultRadio, Range, EnterIndex ,RangeIndex, RangeTimes, InputBox, ShortButton, LongButton, InputButton } from "./style";

export default function Order () {
  const [condition, setCondition] = useState('ready');
  const [budget, setBudget] = useState(10000000);
  const [leverage, setLeverage] = useState(5);
  const [coinPrice, setCoinPrice] = useState<number | undefined>(undefined);
  const [inputValue, setInputValue] = useState('0');
  const [orderPrice, setOrderPrice] = useState(0);
  const [enterPrice, setEnterPrice] = useState<number | undefined>(undefined)
  const [fluctuation, setFluctuation] = useState(0);
  const [resultPrice, setResultPrice] = useState(0);
  const [lastResult, setLastResult] = useState<number | undefined>(undefined)

  const dispatch = useAppDispatch()
  const coin = useAppSelector((state) => state.coin.now);
  const price : any = useAppSelector((state) => state.coin.price)

  useEffect (()=> {
    setCoinPrice(price.trade_price)
  }, [price])

  // async function apicall() {
  //   await axios.get(`https://api.upbit.com/v1/ticker?markets=KRW-${coin}`).then(res => {
  //     setCoinPrice(res.data[0].trade_price)
  //     dispatch(changePrice(res.data[0]))
  //   })
  // } 
  // useInterval(apicall, 500)

  useEffect(()=> {
    if(enterPrice && coinPrice) {
      
      if (fluctuation*leverage <-90) {
        setCondition('ready');
        setLastResult(-orderPrice)
        setEnterPrice(undefined)
      }


      if (condition === 'Long') {
        setFluctuation(((coinPrice-enterPrice)/enterPrice*100))
      } else if (condition === 'Short') {
        setFluctuation(((enterPrice-coinPrice)/enterPrice*100))
      }
      setResultPrice(Math.floor(orderPrice + (orderPrice*fluctuation*leverage/100)))
    }
  }, [enterPrice, coinPrice, condition, orderPrice, fluctuation, leverage])

  const enterBet = (e: React.MouseEvent<HTMLButtonElement>) => {
    let enterNumber : number = +(inputValue.replaceAll(',',''));
    if (enterNumber > 0) {
      setBudget(money => money - enterNumber)
      setEnterPrice(coinPrice)
  
      if(e.currentTarget.innerHTML === 'Long / 상승') {
        setCondition('Long');
      } else {
        setCondition('Short');
      }

      setInputValue('0')
  
      let tmp = inputValue.replaceAll(',','');
      setOrderPrice(+tmp);
    } else {
      return
    }
  }

  const exitBet = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCondition('ready')
    setBudget(money => money+resultPrice)
    setEnterPrice(undefined)
    if (orderPrice) {
      setLastResult(resultPrice-orderPrice)
    }

  }

  const changeLever = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeverage(Number(e.target.value))
  }

  const changeLocaleScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tmp = Number(e.target.value.replaceAll(',',''));
    if (isNaN(tmp)) setInputValue('0')
    else if (tmp >budget)  setInputValue('한도 초과')
    else {
      setInputValue(tmp.toLocaleString());
    }
  }

  const bettingRatio = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerHTML === '10%') {
      setInputValue(Math.floor(budget/10).toLocaleString())
    } else if (e.currentTarget.innerHTML === '25%') {
      setInputValue(Math.floor(budget/4).toLocaleString())
    }
     else if (e.currentTarget.innerHTML === '50%') {
      setInputValue(Math.floor(budget/2).toLocaleString())
    }
     else if (e.currentTarget.innerHTML === '100%') {
      setInputValue(Math.floor(budget).toLocaleString())
    }
  }

  useEffect(()=>{
    setCondition('ready')
    setBudget(money => money+resultPrice)
    setEnterPrice(undefined)
    if (orderPrice) {
      setLastResult(resultPrice-orderPrice)
    }
  }, [coin])


  return (
    <OrderBox>
      <TypeBox>
        <CategoryInfo>주문구분</CategoryInfo>
        <DefaultRadio type='radio' name="a" disabled={true}/>지정가
        <DefaultRadio type='radio' name="a" defaultChecked={true}/>시장가
        <DefaultRadio type='radio' name="a" disabled={true} />예약-지정가
      </TypeBox>
      <TypeBox>
        <CategoryInfo>주문가능</CategoryInfo>
        <div style={{position : 'absolute', right : 10}}> {budget.toLocaleString()} KRW</div>
      </TypeBox>
      <TypeBox>
        <CategoryInfo>레버리지</CategoryInfo>
        <Range onChange={changeLever} type='range' min={5} max={500} step={5} disabled={condition === 'ready' ? false : true}></Range>
        <RangeIndex>{leverage}</RangeIndex>
        <RangeTimes>X</RangeTimes>
      </TypeBox>
      <TypeBox character='주문총액'>
        <CategoryInfo>주문총액</CategoryInfo>
        <InputBox type={"text"} value={inputValue} onChange={changeLocaleScale}></InputBox>
        <div>
          <InputButton onClick={bettingRatio}>10%</InputButton>
          <InputButton onClick={bettingRatio} style={{left : 160}}>25%</InputButton>
          <InputButton onClick={bettingRatio} style={{left : 230}}>50%</InputButton>
          <InputButton onClick={bettingRatio} style={{left : 300}}>100%</InputButton>
        </div>
      </TypeBox>
      <TypeBox character="버튼">
        {condition === 'ready' ? <ShortButton onClick={enterBet}>Short / 하락</ShortButton> : <ShortButton onClick={exitBet} style={{background : 'gray'}}>중지</ShortButton>}
        {condition === 'ready' ? <LongButton onClick={enterBet}>Long / 상승</LongButton> : <LongButton onClick={exitBet}  style={{background : 'gray'}}>중지</LongButton>}
        
      </TypeBox>
      <TypeBox>
        <CategoryInfo>주문금액</CategoryInfo>
        {enterPrice && <EnterIndex>{orderPrice.toLocaleString()}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>변동폭</CategoryInfo>
        {enterPrice && <EnterIndex fluc={fluctuation}>{
        coinPrice && `${(fluctuation).toFixed(2)}%`
        }</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>수익률</CategoryInfo>
        {enterPrice && <EnterIndex fluc={fluctuation}>{`${(fluctuation*leverage).toFixed(2)}%`}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>손익</CategoryInfo>
        {enterPrice && <EnterIndex fluc={fluctuation}>{(resultPrice-orderPrice).toLocaleString()}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>정산금액</CategoryInfo>
        {enterPrice && <EnterIndex fluc={fluctuation}>{resultPrice.toLocaleString()}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>직전결과</CategoryInfo>
        {lastResult && <EnterIndex fluc={lastResult}>{lastResult.toLocaleString()}</EnterIndex>}
      </TypeBox>
    </OrderBox>
  )
}