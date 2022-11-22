import styled from "styled-components";

export const TopBar = styled.div`
  width : 100%;
  height : 40px;
  background : #efefef;
  border-top : 1px solid #d4d6dc;
  border-bottom : 1px solid #d4d6dc;
`

export const OptionContainer = styled.div`
  width : 300px;
  height: 100%;

  display : flex;
  align-items : center;
`

export const MinuteSelect = styled.input`
  width : 15px;
  height : 15px;

  margin-left :20px;
  margin-right : 5px;
`

export const ChartContainer = styled.div`
  width : 100%;
  height : 445px;

  display : flex;
  flex-wrap : wrap;
`
export const CandleContainer = styled.div`
  width : 914px;
  height : 320px;
  border-bottom : 1px solid #d4d6dc;
  border-right : 1px solid #d4d6dc;

  padding-bottom : 5px;
  padding-top : 5px;
  padding-right : 5px;
  display : flex;
`

export const CandleBox = styled.div`
  width : 9px;
  height : 100%;
  background : white;

  position : relative;
`

export const Candle = styled.div<any>`
  width : 6px;
  height : ${props => (props.height === 0 ? 2 : props.height)}px;
  background : ${props => props.color > 0 ? '#1261c4' : '#c84a31'};
  z-index : 9;

  position : absolute;
  bottom : ${props => (props.position)}px;
  left : 50%;
  transform: translateX(-50%);
`

export const Line = styled.div<any>`
  width :1px;
  height :${props => props.height}px;
  background : black;

  position : absolute;
  bottom : ${props => (props.position)}px;
  left : 50%;
  transform: translateX(-50%);
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

export const VolumeContainer = styled.div`
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

export const VolumePrice = styled.div`
  width : 76px;
  height : 110px;
  font-size : 10px;

  position : relative;
  top: -8px;
  padding-top : 6px;
  padding-bottom : 6px;
  padding-left : 10px;
  
  display : flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`