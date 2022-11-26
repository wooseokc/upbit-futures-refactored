import React, { useEffect, useState } from "react";
import styled, { StyledComponent } from "styled-components";

import * as d3 from "d3";

interface ChartData {
  time : number,
  open : number,
  trade : number,
  high : number,
  low : number,
  volume : number
}

interface importData {
  data : ChartData[],
  count : number,
  setCount : React.Dispatch<React.SetStateAction<number>>
}

export default function Chart (props : importData) {
  const [range , setRange] = useState({max : 0, min : 0, vMax : 0})
  const [size, setSize] = useState({width : 914, chartH : 300, voluemH : 110})
  const [chartLength, setChartLength] = useState(1)
  const [candles, setCandles] = useState<any>()
  const [volumes, setVolumes] = useState<any>()

  useEffect(() => {
    const data = props.data
    setChartLength(data.length)
    const max = d3.max(data.map(item => item.high))
    const min = d3.min(data.map(item => item.low)) 
    const vMax = d3.max(data.map(item => item.volume))
    if (!max || !min || !vMax) return
    setRange({max : max, min : min, vMax : vMax})
    
  }, [props.count, props.data])

  useEffect(() => {
    const data = props.data
    if (data.length < 10) return

    function pixelInverter (value : number, height : number) { // d3를 쓸거면 픽셀값을 변환해야함
      let max = height >= 300 ? range.max : range.vMax
      let min = height >= 300 ? range.min : 0

      const answer = height >= 300 ?
      Math.abs(
        ((value - min) / (max - min)) * height - height
      )
        :
      Math.abs(
        ((value - min) / (max - min)) * height
      )
      return answer
  }

    const candles = data.map((item, idx) => {
      const width = size.width / chartLength * 0.7;
      const up = item.trade > item.open ? 'up' : 'down'
      const height = Math.abs(pixelInverter(item.trade, size.chartH) - pixelInverter(item.open, size.chartH))
      const lineheight = Math.abs(pixelInverter(item.high, size.chartH) - pixelInverter(item.low, size.chartH))
      const time = item.time
      const y = item.trade > item.open ? pixelInverter(item.trade, size.chartH) : pixelInverter(item.open, size.chartH)
      const lineY = pixelInverter(item.high, size.chartH)
      const x = ((size.width / (chartLength + 1)) * (idx + 1))

      return (
        <>
          <Line key={item.high / (time + 1)} width={width/10} height={lineheight} x={x} y={lineY + 10}/>
          <Candle key={time} width={width} height={height} y={y + 10} x={x - (width / 2)} color={up}/>
        </>
      )
    })

    const volumes = data.map((item, idx) => {
      const width = size.width / chartLength * 0.7;
      let up = 'up'
      if (idx > 0) {
        if (item.volume > data[idx-1].volume) up = 'up'
        else up = 'down'
      }
      const height = Math.abs(pixelInverter(item.volume, size.voluemH))
      const x = ((size.width / (chartLength + 1)) * (idx + 1))
      const y = item.trade > item.open ? pixelInverter(item.trade, size.chartH) : pixelInverter(item.open, size.chartH)

      return (
        <Volume key={item.volume / (item.time + 1)} width={width} height={height} y={size.voluemH - height} x={x - (width / 2)} color={up}/>
      )
    })
    
    setCandles(candles)
    setVolumes(volumes)
  }, [range.max, range.min, chartLength])


  const sizeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerHTML === '-') {
      if (props.count > 190) return
      props.setCount(c => c + 10)
    } else {
      if (props.count < 20) return
      props.setCount(c => c - 10)
    }
  }


  return (
    <ChartContainer>
      <SizeButtonContainer>
        <MinusButton onClick={sizeButton}>-</MinusButton>
        <PlusButton onClick={sizeButton}>+</PlusButton>
      </SizeButtonContainer>
      <CandleContainer>
        {candles}
      </CandleContainer>
      <VolumeContainer>
        {volumes}
      </VolumeContainer>
    </ChartContainer>
  )
} 

export const ChartContainer = styled.div`
  width : 100%;
  height : 445px;

  display : flex;
  flex-wrap : wrap;
  position: relative;
`
const SizeButtonContainer = styled.div`
  width: 50px;
  height: 20px;


  position: absolute;

  top : 250px;
  left: 50%;
  transform: translateX(-50%);

  transition: all 0.5s ease;

  :hover {
    width: 100px;
    height: 40px;
  }
`

const MinusButton = styled.button`
  height: 100%;
  width: 50%;

  border: none;
  border-right: 1px solid;
  color: #605c5c;
  background-color : #dbdada;

  :hover {
    font-weight: 700;
  }
`
const PlusButton = styled.button`
  height: 100%;
  width: 50%;

  border: none;
  color: #605c5c;
  background-color :#dbdada;
`

export const CandleContainer = styled.svg`
  width : 914px;
  height : 320px;
  border-bottom : 1px solid #d4d6dc;
  border-right : 1px solid #d4d6dc;
  display : flex;
`

export const VolumeContainer = styled.svg`
  width : 914px;
  height : 110px;

  position : relative;
  border-bottom : 1px solid #d4d6dc;
  border-right : 1px solid #d4d6dc;
`
// {color : boolean, key : number, height : number, width : number, y: number, x : number }
const Candle : StyledComponent<'rect', {color : string, key : number, height : number, width : number, y: number, x : number }> = styled.rect`
  fill : ${props => props.color === 'up' ? '#c84a31' : '#1261c4'};
`
const Line : StyledComponent<'rect', {color : string, key : number, height : number, width : number, y: number, x : number }> = styled.rect`
  fill : black;
  stroke: black;
`

const Volume : StyledComponent<'rect', {color : string, key : number, height : number, width : number, y: number, x : number }> = styled.rect`
  fill : ${props => props.color === 'up' ? '#c84a31' : '#1261c4'};
`