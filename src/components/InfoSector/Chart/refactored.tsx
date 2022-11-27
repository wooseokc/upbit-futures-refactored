import React, { useEffect, useState } from "react";
import styled, { StyledComponent } from "styled-components";

import * as d3 from "d3";

interface ChartData {
  time : number,
  open : number,
  trade : number,
  high : number,
  low : number,
  volume : number,
  candle_date_time_kst? : string,
}

interface importData {
  data : ChartData[],
  count : number,
  from : number,
  setCount : React.Dispatch<React.SetStateAction<number>>
  setFrom : React.Dispatch<React.SetStateAction<number>>
}

export default function Chart (props : importData) {
  const [range , setRange] = useState({max : 0, min : 0, vMax : 0})
  const [size, setSize] = useState({width : 914, chartH : 300, voluemH : 110})
  const [chartLength, setChartLength] = useState(1)
  const [candles, setCandles] = useState<any>()
  const [volumes, setVolumes] = useState<any>()
  const [mouseDown, setMouseDown] = useState(false)
  const [dragTrot, setDragTrot] = useState(true)
  const [dragStart, setDragStart] = useState(0)
  const [dragMoved, setDragMoved] = useState(0)

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
          <Line key={item.high / (time + 1)} width={width < 10000 ? width/15 : 0} height={lineheight ? lineheight : 0} x={Math.abs(x) < 5000 ? x : 0} y={lineY < 1000 ? lineY + 10 : 0}/>
          <Candle key={time} width={width < 10000 ? width : 0} height={height ? height : 0} y={y < 1000 ? y + 10 : 0} x={Math.abs(width) < 5000 ? x - (width / 2) : 0} color={up}/>
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
        <Volume key={item.volume / (item.time + 1)} width={Math.abs(width) < 5000 ? width : 0} height={height < 1000 ? height : 0 } y={height < 10000 ? size.voluemH - height : 0} x={Math.abs(width) < 50000 ? x - (width / 2) : 0} color={up}/>
      )
    })
    
    setCandles(candles)
    setVolumes(volumes)
  }, [range.max, range.min, chartLength, props.data])


  const sizeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerHTML === '-') {
      if (props.count > 190) return
      props.setCount(c => c + 10)
    } else {
      if (props.count < 20) return
      props.setCount(c => c - 10)
    }
  }

  const MouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true)
    setDragStart(e.clientX)
  }

  const MouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false)
  }

  const MouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown) return
    if (dragTrot) {
      setDragMoved(e.clientX)
      setDragTrot(false)
      setTimeout(() => {
        setDragTrot(true)
      }, 50)
    }
  }

  useEffect(() => {
    const containerWidth = size.width
    const start = dragStart
    const moved = dragMoved
    const rectWidth = containerWidth / chartLength

    const movingCount = (start - moved) > 0 ? (Math.ceil((start - moved) / rectWidth)) : (Math.floor((start - moved) / rectWidth))
    setDragStart(moved)
    if (props.from - movingCount < 0) return
    props.setFrom(c => c - movingCount)
  }, [dragMoved])

  return (
    <ChartContainer onMouseDown={MouseDown} onMouseLeave={MouseUp} onMouseUp={MouseUp} onMouseMove={MouseMove}>
      <SizeButtonContainer>
        <MinusButton onClick={sizeButton}>-</MinusButton>
        <PlusButton onClick={sizeButton}>+</PlusButton>
      </SizeButtonContainer>
      <CandleContainer>
        {candles}
      </CandleContainer>
      <CandlePrice>
        <div>{range.max.toLocaleString()}</div>
        <div>{(range.min + (range.max-range.min) * 0.75).toLocaleString()}</div>
        <div>{(range.min + (range.max-range.min) * 0.5).toLocaleString()}</div>
        <div>{(range.min + (range.max-range.min) * 0.25).toLocaleString()}</div>
        <div>{range.min.toLocaleString()}</div>
      </CandlePrice>
      <VolumeContainer>
        {volumes}
      </VolumeContainer>
      <VolumePrice>
              <div>{Math.floor(range.vMax)}</div>
              <div>{Math.floor(range.vMax*0.75)}</div>
              <div>{Math.floor(range.vMax*0.5)}</div>
              <div>{Math.floor(range.vMax*0.25)}</div>
              <div>{0}</div>
      </VolumePrice>
    </ChartContainer>
  )
} 

export const ChartContainer = styled.div`
  width : 100%;
  height : 445px;

  display : flex;
  flex-wrap : wrap;
  position: relative;

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
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

export const CandlePrice = styled.div`
  width : 76px;
  height : 320px;
  font-size : 10px;

  padding-top : 10px;
  padding-bottom : 10px;
  padding-left : 10px;

  display : flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`
export const VolumePrice = styled.div`
  width : 76px;
  height : 110px;
  font-size : 10px;

  position : relative;
  padding-top : 6px;
  padding-bottom : 6px;
  padding-left : 10px;
  
  display : flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`

