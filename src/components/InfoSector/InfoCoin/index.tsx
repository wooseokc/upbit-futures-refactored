import { InfoBox, CurrentBox, Price, PriceKRW, FromYesterday, ChangedPrice, TotalInfo, TotalItem } from "./style";

interface Information {
  tradePrice : number,
  change_price : number,
  change_rate : number,
  change : string,
  high_price : number,
  highest_52_week_price : number,
  low_price : number,
  lowest_52_week_price : number,
}

export default function CoinInfo (props : Information) {
  const priceObject = {
    tradePrice : props.tradePrice,
    change_price : props.change_price,
    change_rate : props.change_rate,
    change : props.change,
    high_price : props.high_price,
    highest_52_week_price : props.highest_52_week_price,
    low_price : props.low_price,
    lowest_52_week_price : props.lowest_52_week_price,
  }
  return (
    <>
      {priceObject !== undefined && 
      <InfoBox>
        <CurrentBox>
          <Price fluc={priceObject.change}>{(priceObject.tradePrice).toLocaleString()}</Price>
          <PriceKRW fluc={priceObject.change}>KRW</PriceKRW>
          <div style={{ fontSize: 13 }}>전일대비
            <FromYesterday fluc={priceObject.change}>{`${(priceObject.change_rate * 100).toFixed(2)}%`}</FromYesterday>
            <ChangedPrice fluc={priceObject.change}>{Math.floor(priceObject.change_price).toLocaleString()} </ChangedPrice>
          </div>
        </CurrentBox>
        <TotalInfo>
          <TotalItem style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#e9ecf1'}}>
            <div>고가</div>
            <div style={{color : '#c84a31', fontSize : 14, position : 'relative', top: -2.5, fontWeight:600}}>{priceObject.high_price.toLocaleString()}</div>
          </TotalItem>
          <TotalItem style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#e9ecf1'}}>
            <div>52주 최고가</div>
            <div style={{color : '#c84a31', fontSize : 14, position : 'relative', top: -2.5, fontWeight:600}}>{priceObject.highest_52_week_price.toLocaleString()}</div>
          </TotalItem>
          <TotalItem>
            <div>저가</div>
            <div style={{color : '#1261c4', fontSize : 14, position : 'relative', top: -2.5, fontWeight:600}}>{priceObject.low_price.toLocaleString()}</div>
          </TotalItem>
          <TotalItem>
            <div>52주 최저가</div>
            <div style={{color : '#1261c4', fontSize : 14, position : 'relative', top: -2.5, fontWeight:600}}>{priceObject.lowest_52_week_price.toLocaleString()}</div>
          </TotalItem>
        </TotalInfo>
      </InfoBox>}
    </>
  )
}