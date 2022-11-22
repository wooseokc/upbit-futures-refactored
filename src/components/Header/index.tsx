import React from "react";
import { HeaderSection, Logo, Nav, NavItem  } from "./style";

export default function Header () {
  const def : boolean = true;

  return (
    <HeaderSection>
      <Logo></Logo>
      <Nav>
        <NavItem hove={false}>거래소</NavItem>
        <NavItem hove={false}>입출금</NavItem>
        <NavItem hove={false}>투자내역</NavItem>
        <NavItem hove={false}>코인동향</NavItem>
        <NavItem hove={false}>스테이킹</NavItem>
        <NavItem hove={false} character='NFT'>NFT</NavItem>
        <NavItem hove={false} character='고객센터'>고객센터</NavItem>
        <NavItem hove={def}  character="선물거래">선물거래</NavItem>
      </Nav>
    </HeaderSection>
  )
}