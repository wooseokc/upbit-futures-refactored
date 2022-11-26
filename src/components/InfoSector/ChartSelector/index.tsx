import React, { useState } from "react";
import styled from "styled-components";

interface chartChangerProps {
  chartInfo : chartInfo,
  chartChanger : React.Dispatch<React.SetStateAction<any>>
}

interface chartInfo {
  sort : string,
  dataArr : any,
}

export default function ChartSelector (props : chartChangerProps) {
  const chartInfo = props.chartInfo
  const chartChanger = props.chartChanger

  const enterBet = (e: React.MouseEvent<HTMLInputElement>) => {
    chartChanger({...chartInfo, sort : e.currentTarget.value})
  }

  return (
    <TopBar>
      <OptionContainer>
        <Selector onClick={enterBet} type={'radio'} name={'chart'} id={'hour'} value={'minutes'} defaultChecked></Selector>
        <label htmlFor="hour">hour</label>
        <Selector onClick={enterBet} type={'radio'} name={'chart'} id={'day'} value={'days'}></Selector>
        <label htmlFor="day">day</label>
        <Selector onClick={enterBet} type={'radio'} name={'chart'} id={'week'} value={'weeks'}></Selector>
        <label htmlFor="week">week</label>
      </OptionContainer>
    </TopBar>
  )
}

const TopBar = styled.div`
  width : 100%;
  height : 40px;
  background : #efefef;
  border-top : 1px solid #d4d6dc;
  border-bottom : 1px solid #d4d6dc;
`

const OptionContainer = styled.div`
  width : 300px;
  height: 100%;

  display : flex;
  align-items : center;
`

const Selector = styled.input`
  width : 15px;
  height : 15px;

  margin-left :20px;
  margin-right : 5px;
`