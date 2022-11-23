import styled from "styled-components";

export const OrderBox = styled.div`
  width :400px;
  height : 620px;

  background : #fff;
  position : absolute;
  top : 75px;
  left : 1080px;
`
export const TypeBox = styled.div<{character? : string}>`
  width :350px;
  height : 30px;  
  font-size : 14px;
  font-weight : 400;

  position : relative;
  top : 20px;
  left : 20px;
  margin-bottom : 20px;

  display : flex;
  align-items: center;

  ${(props) => (props.character === '주문총액' && {height :80})}
  ${(props) => (props.character === '버튼' && {height : 40})}
`
export const CategoryInfo = styled.div`
  width : 60px;
  font-size : 13px;
  font-weight : 600;

  margin-right : 20px;
  margin-left : 10px;
`
export const DefaultRadio = styled.input`
  height : 12px;

  display : block;

  margin-left : 12px;
  margin-right : 5px;
`

export const Range =styled.input`
  width :200px;
`

export const RangeIndex = styled.div`
  position : absolute;
  left : 305px;
`
export const RangeTimes = styled.div`
  width : 20px;
  position : relative;
  left : 43px;
`

export const InputBox = styled.input`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
  }

  width :260px;
  height : 28px;

  text-align:right;
  padding-right :10px;
`

export const ShortButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 150px;
  height : 40px;
  background : red;
  border-radius : 5px;
  font-size : 20px;
  font-weight : 700;
  color : #F5F5F5;

  position : relative;
  left : 20px;
`
export const InputButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 50px;
  height : 20px;
  border : 1px solid;
  border-radius : 3px;
  font-size : 10px;
  font-weight : 500;

  position : absolute;
  top : 60px;
  left : 90px;
`
export const LongButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 150px;
  height : 40px;
  border-radius : 5px;
  background : green;
  font-size : 20px;
  font-weight : 600;
  color : #F5F5F5;

  position : relative;
  left : 30px;
`

export const EnterIndex = styled.div<{fluc? : any}>`
  color : black;
  position : absolute;
  right : 10px;

  ${props => props.fluc > 0 && {color : '#c84a31'}}
  ${props => props.fluc < 0 && {color : '#1261c4'}}
`
