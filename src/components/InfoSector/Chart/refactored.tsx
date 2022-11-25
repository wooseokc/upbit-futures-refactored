import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  data : ChartData[]
}

export default function Chart (props : importData) {
  const [range , setRange] = useState({max : 0, min : 0, vMax : 0})
  const [size, setSize] = useState({width : 914, chartH : 300, voluemH : 110})
  const [chartLength, setChartLength] = useState(1)
  const [candles, setCandles] = useState<any>()

  useEffect(() => {
    const data = props.data
    console.log(data)
    setChartLength(data.length)
    const max = d3.max(data.map(item => item.high))
    const min = d3.min(data.map(item => item.low)) 
    const vMax = d3.min(data.map(item => item.volume))

    if (!max || !min || !vMax) return
    setRange({max : max, min : min, vMax : vMax})
    
  }, [props.data[0]])

  useEffect(() => {
    const data = props.data

    function pixelInverter (value : number, height : number) {
      return Math.abs(
        ((value - range.min) / (range.max - range.min)) * height - height
      )
    }


    const candles = data.map((item, idx) => {
      const width = size.width / chartLength * 0.7;
      const up = item.trade > item.open ? true : false
      const height = Math.abs(pixelInverter(item.trade, size.chartH) - pixelInverter(item.open, size.chartH))
      const lineheight = Math.abs(pixelInverter(item.high, size.chartH) - pixelInverter(item.low, size.chartH))

      const y = item.trade > item.open ? pixelInverter(item.trade, size.chartH) : pixelInverter(item.open, size.chartH)
      const lineY = pixelInverter(item.high, size.chartH)
      const x = ((size.width / (chartLength + 1)) * (idx + 1))

      return (
        <>
          <Line key={item.time} width={width/10} height={lineheight} x={x} y={lineY + 10}/>
          <Candle key={item.high / item.time} width={width} height={height} y={y + 10} x={x - (width / 2)} color={up}/>
        </>
      )
    })
    
    setCandles(candles)
  }, [range.max, range.min])

  return (
    <ChartContainer>
      <CandleContainer>
        {candles}
      </CandleContainer>
      <VolumeContainer>


      </VolumeContainer>
    </ChartContainer>
  )
} 

export const ChartContainer = styled.div`
  width : 100%;
  height : 445px;

  display : flex;
  flex-wrap : wrap;
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
  top: -8px;
  border-bottom : 1px solid #d4d6dc;
  border-right : 1px solid #d4d6dc;
  padding-bottom : 5px;
  padding-top : 5px;
  padding-right : 5px;

  display : flex;
`

// export const CandleBox = styled.rect<{width : number}>`
//   width : ${props => `${props.width}px`};
//   height : 100%;
//   fill : white;
//   stroke : black;
// `

const Candle = styled.rect<any>`
  fill : ${props => props.color ? '#c84a31' : '#1261c4'};
  z-index: 99;
`
const Line = styled.rect<any>`
  fill : black;
  stroke: black;
  z-index: 9;
`