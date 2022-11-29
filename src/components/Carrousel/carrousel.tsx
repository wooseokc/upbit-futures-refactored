import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface props {
  datas : coins,
  coinCount : number,
  clerk : number
}

interface coins {
  [index : string] : data
}

interface data {
  [index : string] : number | string
  tradePrice : number,
  change_price : number,
  change_rate : number,
  change : string
}

export default function Carrousel (props : props) {
  const [carrouselElements, setCarrouselElements] = useState<JSX.Element[]>()
  const [count, setCount] = useState(props.coinCount + 4)
  const [slideTransition, setSlideTransition] = useState(true)
  const [carrouselCount, setCarrouselCount] = useState(1)
  const [mouseDown, setMouseDown] = useState<boolean | undefined>()
  const [dragTrot, setDragTrot] = useState(true)
  const [dragStart, setDragStart] = useState(0)
  const [dragMoved, setDragMoved] = useState(0)
  
  
  useEffect(() => {
    const dataObj = props.datas

    const dataArr = Object.entries(dataObj)
    const coinArr = [...dataArr.slice(-2), ...dataArr, ...dataArr.slice(0,2)]
    

    const elements = coinArr.map((item) => {
      const name : string = item[0].split('-')[1]
      const price : number = item[1].tradePrice
      const changePrice : number = item[1].change_price
      const changeRate: number = item[1].change_rate
      const change: string = item[1].change

      const img_Url = `https://static.upbit.com/logos/${name}.png`

      return (
        <CoinBox count={count}>
          <ImgBox image={img_Url}/>
          <ImgText>{name}</ImgText>
          <ColorText>
            <Price fluc={change}>{(price).toLocaleString()}</Price>
            <PriceKRW fluc={change}>KRW</PriceKRW>
          </ColorText>
          <ColorText>전일대비
            <FromYesterday fluc={change}>{`${(changeRate * 100).toFixed(2)}%`}</FromYesterday>
            <ChangedPrice fluc={change}>{Math.floor(changePrice).toLocaleString()} </ChangedPrice>
          </ColorText>
        </CoinBox>
      )
    })

    setCarrouselElements(elements)
  }, [props.clerk, carrouselCount])

  const MouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragTrot) return
    setMouseDown(true)
    setDragStart(e.clientX)
    setSlideTransition(true)
  }

  const MouseUp = (e: React.MouseEvent<HTMLDivElement>) => {    
    if (!dragTrot) return
    setMouseDown(false)
    setDragMoved(e.clientX)
    setDragTrot(false)
    setTimeout(() => {
      setDragTrot(true)
    }, 400)
  }

  useEffect(() => {
    if (mouseDown === undefined) return
    if (dragStart === 0 || dragMoved === 0) return
    const start = dragStart
    const moved = dragMoved
    if (start === moved) return
    setCarrouselCount(start > moved ? c => c + 1 : c => c - 1)
    setDragStart(0)
    setDragMoved(0)
  }, [dragMoved])

  useEffect(() => {
    if (mouseDown === undefined) return
    if (carrouselCount > 0 && carrouselCount <= props.coinCount) return
    setTimeout(() => {
      if (carrouselCount === 0) {
        setSlideTransition(false)
        setCarrouselCount(props.coinCount)
      } else if (carrouselCount > props.coinCount) {
        setSlideTransition(false)
        setCarrouselCount(1)
      }
    }, 500);

  }, [carrouselCount])

  return (
    <CarouselBox>
      <LongSlide onMouseDown={MouseDown} onMouseUp={MouseUp} transition={slideTransition} count={count} carouselCount={carrouselCount}>
        {carrouselElements}
      </LongSlide>
    </CarouselBox>
  )
}

const CarouselBox = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
`

const LongSlide= styled.div<{transition : boolean, count : number, carouselCount : number}>`
  width: ${(props) => `${props.count/3 * 100}%`};
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  position: relative;
  ${props => props.transition && {transition : 'all 0.5s ease-out'}};

  right : ${(props) => `${33 * (props.carouselCount + 0)}%`};

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`

const CoinBox = styled.div<{count : number}>`
  display: block;
  width: ${(props) => `${30/ (props.count/3)}%`};
  height: 90%;
  border-radius: 20px;

  background-color: #736f6f;

  display : flex;
  flex-direction: column;
  align-items : center;
  justify-content : center;
`

const ImgBox = styled.div<{image : string}>`
  width: 50px;
  height: 50px;

  background-image: ${props => `url(${props.image})`};
  background-size: contain;
  background-repeat: no-repeat;
`

const ImgText = styled.div`
  font-size: 20px;
`

const ColorText = styled.div`
  font-size: 25px;
`

export const Price = styled.strong<{fluc : string}>`
  color : black;
  font-size: 50px;
  font-weight: 900;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}
`

export const PriceKRW = styled.span<{fluc : string}>`
  color : black;
  font-size: 30px;
  font-weight: 400;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}
`

export const FromYesterday = styled.span<{fluc : string}>`
  color : black;
  font-size: 30px;
  font-weight: 400;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}

  margin-left : 10px;

  ::before  {
    content : '${props => props.fluc === 'FALL' ? '-' : '+'}'
  }
`

export const ChangedPrice = styled.span<{fluc : string}>`
  color : black;
  font-size: 20px;
  font-weight: 400;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}

  margin-left : 5px;

::before  {
  content : '${props => props.fluc === 'FALL' ? '▼' : '▲'}'
}
`