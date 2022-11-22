import styled from "styled-components";

export const HeaderSection = styled.section`
  width : 100%;
  height : 60px;
  background : #093687;

  position : relative;
`

export const Logo = styled.a`
  width : 77px;
  height : 17px;
  background-image: url("data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 278.5 63.78'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fff;%7D.cls-2%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3Elogo%3C/title%3E%3Cpath class='cls-1' d='M187,19.13H165.45L171.67,0H152.53L131.81,63.78h39.83a21.26,21.26,0,0,0,20.22-14.69l5.21-16A10.64,10.64,0,0,0,187,19.13ZM178.1,32.54,173.79,45.8a10.63,10.63,0,0,1-10.11,7.35H154.4L162,29.76h14.08A2.12,2.12,0,0,1,178.1,32.54Z'/%3E%3Cpolygon class='cls-1' points='220.57 0 216.42 12.76 235.56 12.76 239.7 0 220.57 0'/%3E%3Cpolygon class='cls-1' points='199.84 63.78 218.98 63.78 233.48 19.13 214.35 19.13 199.84 63.78'/%3E%3Cpath class='cls-1' d='M262.18,29.76h12.87l3.45-10.63H265.63L271.85,0H252.71l-16.2,49.86a10.64,10.64,0,0,0,10.12,13.92h21.24l3.46-10.63H257.49a2.11,2.11,0,0,1-2-2.77Z'/%3E%3Cpath class='cls-2' d='M54.64,22.26,75.57,0H53.15L35.88,53.15H21.52a2.13,2.13,0,0,1-2-2.78L35.87,0H16.73L.53,49.88a10.62,10.62,0,0,0,10.1,13.9H51.56l14.5-44.65Z'/%3E%3Cpath class='cls-2' d='M125.44,0h-44L88,22.26l-9.39-3.12L64.05,63.78H83.19L90.1,42.52h20.69A21.26,21.26,0,0,0,131,27.83l4.53-13.93A10.63,10.63,0,0,0,125.44,0Zm-8.88,13.4-3.62,11.15a10.63,10.63,0,0,1-10.11,7.34H93.55l6.91-21.26h14.09A2.11,2.11,0,0,1,116.56,13.4Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;

  cursor: pointer;

  display : inline-block;
  position : relative;
  left : 18px;
  top : 20px;
  margin-left : 60px;
`
export const Nav = styled.nav`
  width: 587px;
  height: 22px;

  color: rgba(165,175,202,.6);

  display :flex;
  margin-left : 180px;
`

export const NavItem = styled.div<{hove : boolean, character? : string}>`
  font-size: 15px;
  font-weight: 400;
  
  cursor: pointer;

  margin-left : 35px;
  white-space : nowrap;

  ${(props) => (props.character === 'NFT' && {position : 'absolute' , left : 625, bottom: 19})}
  ${(props) => (props.character === '고객센터' && {position: 'relative', left : 58})}
  ${(props) => (props.character === '선물거래' && {color : '#fff', position: 'relative', left : 55})}
  &:hover {
    font-weight: ${(props) => (props.hove === true ? '400' : '700')}
  }
`