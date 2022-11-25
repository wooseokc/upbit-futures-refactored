/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { OrderBox, TypeBox ,CategoryInfo, DefaultRadio, Range, EnterIndex ,RangeIndex, RangeTimes, InputBox, ShortButton, LongButton, InputButton } from "./style";

interface currentPrice {
  price : number | undefined,
  coin : string | undefined
}

interface trade {
  coinPrice : number , // 실시간 코인가격
  orderPrice : number, // 주문 금액
  enterPrice : number, // 거래 진입시 코인가격
  resultPrice : number, // 거래 종료시 코인가격
  fluctuation : number, // 변화율
  lastResult : number // 직전 거래 결과
}

interface conditions {
  state : string,
  budget : number,
  leverage : number,
  inputValue : string
}

export default function Order (props : currentPrice) {
  const [conditions, setConditions] = useState<conditions>({ // 계좌에 관련된 state
    state : 'ready',
    budget : 10000000,
    leverage : 5,
    inputValue : '0'
  })
  const [trade, setTrade] = useState<trade>({ // 거래에 관련된 state
    coinPrice : 0,
    orderPrice : 0,
    enterPrice : 0,
    resultPrice : 0,
    fluctuation : 0,
    lastResult : 0
  })

  const coin = props.coin
  const price = props.price as number

  useEffect(()=> {
    const currentPrice = props.price as number
    const orderPrice = trade.orderPrice
    const enterPrice = trade.enterPrice
    const fluctuation = trade.fluctuation
    if (conditions.state === 'ready') {
      setTrade({
        ...trade,
        coinPrice : currentPrice
      })
    } else {
      //청산
      if (fluctuation*conditions.leverage <-90) {
        setConditions({
          ...conditions,
          state : 'ready'
        });
        setTrade({
          ...trade,
          lastResult : -orderPrice,
          enterPrice : 0
        })
      }
      // 롱 숏 구현
      if (conditions.state === 'Long') {
        const currentFluc = (currentPrice - enterPrice) / enterPrice*100
        setTrade({
          ...trade,
          coinPrice : currentPrice,
          fluctuation : (currentPrice - enterPrice) / enterPrice*100,
          resultPrice : (Math.floor(orderPrice + (orderPrice * currentFluc * conditions.leverage/100)))
        }) 
      } else if (conditions.state === 'Short') {
        const currentFluc = (enterPrice - currentPrice) / enterPrice*100
        setTrade({
          ...trade,
          coinPrice : currentPrice,
          fluctuation : (enterPrice - currentPrice) / enterPrice*100,
          resultPrice : (Math.floor(orderPrice + (orderPrice * currentFluc * conditions.leverage/100)))
        }) 
      }
    }
  }, [trade.enterPrice, trade.coinPrice, conditions.state, trade.orderPrice, trade.fluctuation, price])

  const enterBet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const enterNumber : number = +(conditions.inputValue.replaceAll(',',''));
    const budget = conditions.budget;
    let state = conditions.state
    if (enterNumber > 0) {
      setTrade({...trade, enterPrice : price as number, orderPrice : enterNumber})
  
      if(e.currentTarget.innerHTML === 'Long / 상승') {
        state = 'Long'
      } else {
        state = 'Short'
      }

      setConditions({
        ...conditions,
        budget : budget - enterNumber,
        inputValue : '0',
        state : state
      })
    } else return
  }

  const exitBet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = trade.resultPrice
    const budget = conditions.budget;
    setConditions({
      ...conditions,
      state : 'ready',
      budget : budget + result
    })
    setTrade({
      ...trade,
      enterPrice : 0,
      orderPrice : 0,
      fluctuation : 0,
      lastResult : trade.resultPrice - trade.orderPrice 
    })
  }

  const changeLever = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConditions({
      ...conditions,
      leverage : Number(e.target.value)
    })
  }

  const changeLocaleScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tmp = Number(e.target.value.replaceAll(',',''));
    const budget = conditions.budget
    if (isNaN(tmp)) setConditions({...conditions, inputValue : '0'})
    else if (tmp > budget)  setConditions({...conditions, inputValue : '한도초과'})
    else {
      setConditions({...conditions, inputValue : tmp.toLocaleString()})
    }
  }

  const bettingRatio = (e: React.MouseEvent<HTMLButtonElement>) => {
    const budget = conditions.budget
    if (e.currentTarget.innerHTML === '10%') {
      setConditions({...conditions, inputValue : Math.floor(budget/10).toLocaleString()})
    } else if (e.currentTarget.innerHTML === '25%') {
      setConditions({...conditions, inputValue : Math.floor(budget/4).toLocaleString()})
    }
     else if (e.currentTarget.innerHTML === '50%') {
      setConditions({...conditions, inputValue : Math.floor(budget/2).toLocaleString()})
    }
     else if (e.currentTarget.innerHTML === '100%') {
      setConditions({...conditions, inputValue : Math.floor(budget).toLocaleString()})
    }
  }

  useEffect(()=>{
    const result = trade.resultPrice
    const budget = conditions.budget
    if (conditions.state === 'ready') return
    setConditions({
      ...conditions,
      state : 'ready',
      budget : budget + result
    })
    setTrade({
      ...trade,
      enterPrice : 0,
      lastResult : trade.resultPrice - trade.orderPrice
    })
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
        <div style={{position : 'absolute', right : 10}}> {conditions.budget.toLocaleString()} KRW</div>
      </TypeBox>
      <TypeBox>
        <CategoryInfo>레버리지</CategoryInfo>
        <Range onChange={changeLever} type='range' min={5} max={500} step={5} disabled={conditions.state === 'ready' ? false : true}></Range>
        <RangeIndex>{conditions.leverage}</RangeIndex>
        <RangeTimes>X</RangeTimes>
      </TypeBox>
      <TypeBox character='주문총액'>
        <CategoryInfo>주문총액</CategoryInfo>
        <InputBox type={"text"} value={conditions.inputValue} onChange={changeLocaleScale}></InputBox>
        <div>
          <InputButton onClick={bettingRatio}>10%</InputButton>
          <InputButton onClick={bettingRatio} style={{left : 160}}>25%</InputButton>
          <InputButton onClick={bettingRatio} style={{left : 230}}>50%</InputButton>
          <InputButton onClick={bettingRatio} style={{left : 300}}>100%</InputButton>
        </div>
      </TypeBox>
      <TypeBox character="버튼">
        {conditions.state === 'ready' ? <ShortButton onClick={enterBet}>Short / 하락</ShortButton> : <ShortButton onClick={exitBet} style={{background : 'gray'}}>중지</ShortButton>}
        {conditions.state === 'ready' ? <LongButton onClick={enterBet}>Long / 상승</LongButton> : <LongButton onClick={exitBet}  style={{background : 'gray'}}>중지</LongButton>}
        
      </TypeBox>
      <TypeBox>
        <CategoryInfo>주문금액</CategoryInfo>
        {trade.orderPrice > 0 && <EnterIndex>{trade.orderPrice.toLocaleString()}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>변동폭</CategoryInfo>
        {trade.enterPrice > 0 && <EnterIndex fluc={trade.fluctuation}>{
        `${(trade.fluctuation).toFixed(2)}%`
        }</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>수익률</CategoryInfo>
        {trade.enterPrice > 0 && <EnterIndex fluc={trade.fluctuation}>{`${(trade.fluctuation*conditions.leverage).toFixed(2)}%`}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>손익</CategoryInfo>
        {trade.enterPrice > 0 && <EnterIndex fluc={trade.fluctuation}>{(trade.resultPrice-trade.orderPrice).toLocaleString()}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>정산금액</CategoryInfo>
        {trade.enterPrice > 0 && <EnterIndex fluc={trade.fluctuation}>{trade.resultPrice.toLocaleString()}</EnterIndex>}
      </TypeBox>
      <TypeBox>
        <CategoryInfo>직전결과</CategoryInfo>
        {trade.lastResult !== 0 && <EnterIndex fluc={trade.lastResult}>{trade.lastResult.toLocaleString()}</EnterIndex>}
      </TypeBox>
    </OrderBox>
  )
}