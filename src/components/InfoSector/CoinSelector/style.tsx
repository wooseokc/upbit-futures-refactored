import styled from "styled-components";

export const Container = styled.div`
  height : 44px;
  border-bottom : 1px solid rgba(165,175,202,.6);
`

export const Forms = styled.a`
  width : 200px;
  height : 40px;
  cursor : pointer;

  position : relative;
  top:50%;
  transform: translateY(-50%);
  display : inline-block;
`

export const Img = styled.img`
  width : 26px;
  height : 26px;

  position : relative;
  top:50%;
  transform: translateY(-50%);
  left: 10px;
`

export const Korean = styled.span`
  font-weight: 700;
  font-size: 20px;

  position : relative;
  left : 17px;
  top : 1px;
  display : inline-block;
`

export const English = styled.span`
  font-size: 10px;

  position : relative;
  left : 20px;
  top : 2px;
`

export const Arrow = styled.div`
  width :20px;
  height : 20px;
  background: url('https://cdn.upbit.com/upbit-web/images/ico_select_1.34dc566.png');
  background-repeat: no-repeat;

  position : relative;
  left : 180px;
  top : -13px;
`

export const CoinList = styled.a`
  width : 190px;
  height : 40px;
  background : #fff;
  z-index : 99;
  cursor : pointer;
  
  position : relative;
  top : 3px;
  border-bottom: 1px solid rgba(165,175,202,.6);
  border-right: 1px solid rgba(165,175,202,.6);
  display : block;
`