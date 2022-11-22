import styled from "styled-components";

export const InfoBox = styled.div`
  width: 100%;
  height : 90px;

  display : flex;
`

export const CurrentBox = styled.div`
  width : 300px;
  height : 70px;

  position : relative;
  top : 50%;
  transform: translateY(-50%);
  left : 20px

`

export const Price = styled.strong<any>`
  color : black;
  font-size: 32px;
  font-weight: 900;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}
`

export const PriceKRW = styled.span<any>`
  color : black;
  font-size: 15px;
  font-weight: 400;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}
`

export const FromYesterday = styled.span<any>`
  color : black;
  font-size: 15px;
  font-weight: 400;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}

  margin-left : 10px;

  ::before  {
    content : '${props => props.fluc === 'FALL' ? '-' : '+'}'
  }
`

export const ChangedPrice = styled.span<any>`
  color : black;
  font-size: 15px;
  font-weight: 400;
  ${(props) => props.fluc === 'RISE' && {color : '#c84a31'}}
  ${(props) => props.fluc === 'FALL' && {color : '#1261c4'}}

  margin-left : 5px;

::before  {
  content : '${props => props.fluc === 'FALL' ? '▼' : '▲'}'
}
`

export const TotalInfo = styled.div`
  width : 400px; 
  height : 80px;


  position : relative;
  top : 50%;
  transform: translateY(-45%);
  left : 280px;

  display : grid;
  grid-template-rows : 1fr 1fr;
  grid-template-columns : 1fr 1fr;
  place-items: center;
`

export const TotalItem = styled.div`
  width : 180px; 
  height : 35px;
  font-size : 12px;
  font-weight : 400;
  
  padding-top : 6px;
  
  display : flex;
  justify-content: space-between;
`


